import React, { FC, Fragment, useState, useEffect, useContext, useMemo } from 'react'
import './index.less'
import { LoadingOutlined, CheckCircleOutlined, CloseCircleOutlined, LineOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../msal/authConfig'
import {
  callMsGraph2OneDrive,
  callMsGraph2OneDriveByItemId,
  callMsGraph2OneDriveImgContentByItemId,
  OneDriveItemInterface,
  callMsGraph2OneDriveResumeJsonContentByItemId,
} from '../../msal/graph'
import { UserContext } from '../../hooks/UserContext'
import { MsalResultContext, MsalResult } from '../../hooks/MsalResultContext'
import User from '../../model/User'
import { USER_TYPE } from '../../model/User'

import { Avatar, List } from 'antd'

interface Props {
  // 0: top画面, 1: timelin画面 2: 通常
  // type: string
  // title?: string
  // actionFuncs: Function[]
  // defaultValue?: string
}

enum STATUS_CODE {
  READY,
  LOADING,
  COMPLETE,
  ERROR,
}

type STATUS = {
  title: string
  description: string
  statusCode: STATUS_CODE
}

const statusListInit: STATUS[] = [
  {
    title: 'resumeフォルダの確認',
    description: 'OneDriveのルートディレクトリ内にresumeフォルダがあるかの確認',
    statusCode: STATUS_CODE.READY,
  },
  {
    title: 'resume.jsonファイルの確認',
    description: 'resumeフォルダ内のresume.jsonファイル内容の確認',
    statusCode: STATUS_CODE.READY,
  },
  { title: 'プロジェクト画像情の確認', description: 'プロジェクト画像情の確認と紐付け', statusCode: STATUS_CODE.READY },
  { title: '初期化設定', description: '初期化設定を行ってログインユーザ情報を格納する', statusCode: STATUS_CODE.READY },
]

const LoadOneDriveView: FC<Props> = (props) => {
  console.log('show OneDriveReadStatusView')
  const { instance, accounts } = useMsal()
  // 因为已经在router里边进行了初始化，所以这里得到的userContext的值就是useUserContext，里边包含一个user，还有一个设置user的方法。
  const userContext = useContext(UserContext)
  const msalResultContext = useContext(MsalResultContext)
  const [statusList, setStatus] = useState(statusListInit)

  const changeStatus = useMemo(
    () => (index: number, toStatusCode: STATUS_CODE) => {
      statusList[index].statusCode = toStatusCode
      setStatus(statusList.concat())
    },
    []
  )

  useEffect(() => {
    async function fetchData() {
      if (userContext.user.basic.name) return
      // step1 OneDrive情報読み込み中.(resumeフォルダ)
      changeStatus(0, STATUS_CODE.LOADING)
      const authentication = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      const oneDriveRootFolder = (await callMsGraph2OneDrive(authentication.accessToken)) as OneDriveItemInterface
      const resume = oneDriveRootFolder.value.filter((x) => {
        return x.name === 'resume'
      })[0]
      if (!resume) {
        changeStatus(0, STATUS_CODE.ERROR)
        return
      }
      changeStatus(0, STATUS_CODE.COMPLETE)
      //step2 resume.jsonファイル情報読み込み中
      changeStatus(1, STATUS_CODE.LOADING)
      const resumeFolder = (await callMsGraph2OneDriveByItemId(
        authentication.accessToken,
        resume.id
      )) as OneDriveItemInterface
      // resume jsonファイルのアイテム
      const resumeItem = resumeFolder.value.filter((item) => {
        return item.name === 'resume.json'
      })[0]
      if (!resumeItem) {
        changeStatus(1, STATUS_CODE.ERROR)
        return
      }
      // step3 self画像ファイルのアイテム
      const selfImgItem = resumeFolder.value.filter((x) => {
        return x.name === 'self.png' || x.name === 'self.jpg'
      })[0]
      if (!selfImgItem) {
        changeStatus(1, STATUS_CODE.ERROR)
        return
      }
      // step4 -(resume.jsonファイル内容取得中
      const resumeJsonFile = (await callMsGraph2OneDriveResumeJsonContentByItemId(
        authentication.accessToken,
        resumeItem.id
      )) as User
      if (!resumeJsonFile) {
        changeStatus(1, STATUS_CODE.ERROR)
        return
      }
      resumeJsonFile.type = USER_TYPE.NETWORK
      // OneDrive情報読み込み中.(self.png|jpg画像設定)'
      const selfImgFile = await callMsGraph2OneDriveImgContentByItemId(authentication.accessToken, selfImgItem.id)
      resumeJsonFile.basic.photo = selfImgFile
      changeStatus(1, STATUS_CODE.COMPLETE)
      //--------------------------------------
      console.log('■ OneDrive情報読み込み中.(プロジェクト画像情報取得中)')
      changeStatus(2, STATUS_CODE.LOADING)
      const projectImagesFolder = resumeFolder.value.filter((x) => {
        return x.name === 'project_images'
      })[0]
      const projectImagesSubFolderList = (await callMsGraph2OneDriveByItemId(
        authentication.accessToken,
        projectImagesFolder.id
      )) as OneDriveItemInterface
      const user = await editImageId(projectImagesSubFolderList, resumeJsonFile, authentication.accessToken)
      changeStatus(2, STATUS_CODE.COMPLETE)

      //--------------------------------------
      // 認証結果保存
      changeStatus(3, STATUS_CODE.LOADING)
      const result: MsalResult = {
        accessToken: authentication.accessToken,
        account: accounts[0],
      }
      setTimeout(() => {
        msalResultContext.setResult(result)
        userContext.setUser(user)
        changeStatus(3, STATUS_CODE.COMPLETE)
      }, 5000)
    }

    if (accounts.length > 0) {
      // 認証成功の場合、情報取得開始
      console.log('■ 認証成功の場合、情報取得開始')
      fetchData()
    } else {
      console.log('■ 未認証の場合、認証成功までに待機')
    }
  }, [accounts, accounts.length, changeStatus, instance, msalResultContext, userContext])

  /**
   * OneDriveでプロジェクトの関連イメージIDを取得し、resume jsonファイル対象に書き込んで戻るメソッドである
   * @param projectImagesSubFolderList
   * @param resumeJsonFile オリジナルresume jsonファイル対象
   * @param accessToken token
   * @param projectImagesFolderId
   * @returns プロジェクトの関連イメージID編集後のUser対象
   */
  const editImageId = async (
    projectImagesSubFolderList: OneDriveItemInterface,
    resumeJsonFile: User,
    accessToken: string
    // projectImagesFolderId: string
  ): Promise<User> => {
    for (let item of projectImagesSubFolderList.value) {
      console.log(item)
      for (let project of resumeJsonFile.timeline_list) {
        if (project.project_code === item.name) {
          console.log(item.id)
          const projectImagesList = (await callMsGraph2OneDriveByItemId(accessToken, item.id)) as OneDriveItemInterface
          projectImagesList.value.forEach((item) => {
            console.log(item.id)
            project.image_list?.push(item.id)
          })
        }
      }
    }
    return resumeJsonFile
  }

  return (
    <div>
      {accounts.length > 0 && (
        <div className='panel'>
          <div className='title'>OneDriveから履歴情報取得中</div>
          <List
            itemLayout='horizontal'
            dataSource={statusList}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    item.statusCode === STATUS_CODE.READY ? (
                      <LineOutlined className='icon-loading' />
                    ) : item.statusCode === STATUS_CODE.LOADING ? (
                      <LoadingOutlined className='icon-loading' />
                    ) : item.statusCode === STATUS_CODE.COMPLETE ? (
                      <CheckCircleOutlined className='icon-result-ok' />
                    ) : (
                      <CloseCircleOutlined className='icon-result-ng' />
                    )
                  }
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default LoadOneDriveView
