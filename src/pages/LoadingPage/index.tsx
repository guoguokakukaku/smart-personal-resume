import { FC, useEffect, useContext, useState, useCallback } from 'react'
import { UserContext } from '../../hooks/UserContext'
import { useNavigate } from 'react-router-dom'
import { fetchUserInfoFromJsonFile } from '../../mock/api'
import { ConfigProvider } from 'antd'
import { USER_TYPE } from '../../model/User'
import { SignInButton } from '../../msal/components/SignInButton'
import { loginRequest } from '../../msal/authConfig'
import {
  callMsGraph2OneDrive,
  callMsGraph2OneDriveByItemId,
  callMsGraph2OneDriveImgContentByItemId,
  OneDriveItemInterface,
  callMsGraph2OneDriveResumeJsonContentByItemId,
} from '../../msal/graph'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import User from '../../model/User'
import { MsalResultContext, MsalResult } from '../../hooks/MsalResultContext'
import './index.less'
import Header from '../../components/HeaderView'
import { HEADER_TYPE } from '../../util/common'

const enum STATUS {
  RENDING,
  READY,
  COMMUNICATION,
  LOADED,
}

const LoadingPage: FC = () => {
  console.log('Loading page render...')
  console.log('Loading page render...' + process.env.REACT_AAA)
  const navigate = useNavigate()
  // 因为已经在router里边进行了初始化，所以这里得到的userContext的值就是useUserContext，里边包含一个user，还有一个设置user的方法。
  const userContext = useContext(UserContext)
  const msalResultContext = useContext(MsalResultContext)
  const [status, setStatus] = useState<STATUS>(STATUS.RENDING)
  const { instance, accounts } = useMsal()
  const [infoMessage, setInfoMessage] = useState<string>()

  const requestJsonData = useCallback(async () => {
    setStatus(STATUS.COMMUNICATION)

    setInfoMessage('OneDrive情報読み込み中.(resumeフォルダ)')
    const authentication = await instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    })
    const oneDriveRootFolder = (await callMsGraph2OneDrive(authentication.accessToken)) as OneDriveItemInterface
    const resume = oneDriveRootFolder.value.filter((x) => {
      return x.name === 'resume'
    })[0]
    if (!resume) {
      setInfoMessage('OneDrive情報読みに失敗しました。.(resumeフォルダ)')
      return
    }

    setInfoMessage('OneDrive情報読み込み中.(resume.jsonファイル)')
    const resumeFolder = (await callMsGraph2OneDriveByItemId(
      authentication.accessToken,
      resume.id
    )) as OneDriveItemInterface
    // resume jsonファイルのアイテム
    const resumeItem = resumeFolder.value.filter((item) => {
      return item.name === 'resume.json'
    })[0]
    if (!resumeItem) {
      setInfoMessage('OneDrive情報読みに失敗しました。.(resume.jsonファイル)')
      return
    }

    // self画像ファイルのアイテム
    setInfoMessage('OneDrive情報読み込み中.(self.png|jpgファイル)')
    const selfImgItem = resumeFolder.value.filter((x) => {
      return x.name === 'self.png' || x.name === 'self.jpg'
    })[0]
    if (!selfImgItem) {
      setInfoMessage('OneDrive情報読みに失敗しました。.(self.png|jpgファイル)')
      return
    }

    setInfoMessage('OneDrive情報読み込み中.(resume.jsonファイル内容取得中)')
    const resumeJsonFile = (await callMsGraph2OneDriveResumeJsonContentByItemId(
      authentication.accessToken,
      resumeItem.id
    )) as User
    resumeJsonFile.type = USER_TYPE.NETWORK

    setInfoMessage('OneDrive情報読み込み中.(self.png|jpgファイル内容取得中)')
    const selfImgFile = await callMsGraph2OneDriveImgContentByItemId(authentication.accessToken, selfImgItem.id)
    resumeJsonFile.basic.photo = selfImgFile

    setInfoMessage('OneDrive情報読み込み中.(プロジェクト画像情報取得中)')
    const projectImagesFolder = resumeFolder.value.filter((x) => {
      return x.name === 'project_images'
    })[0]
    const projectImagesSubFolderList = (await callMsGraph2OneDriveByItemId(
      authentication.accessToken,
      projectImagesFolder.id
    )) as OneDriveItemInterface
    const user = await editImageId(projectImagesSubFolderList, resumeJsonFile, authentication.accessToken)

    // 認証結果保存
    const result: MsalResult = {
      accessToken: authentication.accessToken,
      account: accounts[0],
    }
    msalResultContext.setResult(result)
    userContext.setUser(user)
    setStatus(STATUS.LOADED)
  }, [accounts, instance, msalResultContext, userContext])

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

  useEffect(() => {
    // ユーザが未取得の場合、取得を行う
    if (!userContext.user.basic.name) {
      let urlParamStr = window.location.search
      // TODO 通常urlパラメータでユーザ識別しますが、ここでdefault userを設定されてしまう
      // if (!urlParamStr) urlParamStr = 'u=guowei'
      let userName = ''
      if (urlParamStr) {
        // urlにパラメータが存在する場合、ローカルユーザとして扱う
        //?を除去
        urlParamStr = urlParamStr.substring(1)

        //urlパラメータをオブジェクトにまとめる
        console.log(urlParamStr.split('&').length) // 必ず1
        userName = urlParamStr.split('&')[0].split('=')[1] // this is a sample: guowei

        if (userName) {
          const fetchData = async () => {
            setInfoMessage('ローカルユーザ情報読み込み中...')
            console.log('getUserInfoFromJsonFile start')
            const data = await fetchUserInfoFromJsonFile(userName)
            data.basic.photo = require(`../../mock/resume/${userName}/self.png`)
            console.log('getUserInfoFromJsonFile end')
            data.type = USER_TYPE.LOCAL
            userContext.setUser(data)
          }
          fetchData().catch(console.error)
        } else {
          navigate('/error')
        }
      } else {
        // urlにパラメータが存在する場合、ネットユーザとして扱う（マイクロソフト認証を利用予定）
        setStatus(STATUS.READY)
      }
    }
  }, [navigate, userContext, userContext.user])

  useEffect(() => {
    if (accounts.length > 0 && status === STATUS.READY) {
      // 認証成功の場合、情報取得開始
      requestJsonData()
    }
  }, [accounts.length, requestJsonData, status])

  useEffect(() => {
    if (userContext.user.basic.name) {
      // メインカラーを変更する
      const mergedNextColor = {
        // primaryColor: '#f759ab',
        // primaryColor: '#7cb305',
        primaryColor: userContext.user.basic.color,
      }
      ConfigProvider.config({
        theme: mergedNextColor,
      })
      setTimeout(() => {
        navigate('/top')
      }, 1000)
    }
  }, [navigate, userContext.user.basic.color, userContext.user.basic.name])

  return (
    <div className='page loading'>
      <Header type={HEADER_TYPE.TOP} title='次世代履歴書' actionFuncs={[]} />
      {status === STATUS.RENDING
        ? 'rending'
        : status === STATUS.COMMUNICATION
        ? 'communication'
        : status === STATUS.READY
        ? 'ready'
        : 'loaded'}
      <br />
      {infoMessage}
      <br />
      <div>{userContext.user.basic.name}</div>
      {status !== STATUS.RENDING && (
        <>
          <AuthenticatedTemplate></AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <div>
              <h1>利用条件</h1>
              <div className='tos'>
                <ul>
                  <li>Microsoft アカウントを持っていること</li>
                  <li>
                    Microsoft OneDriveに自己紹介用Jsonファイルの準備が完了したこと
                    <br />
                    （ファイル配置方法については
                    <a href='./help.html' target='_blank'>
                      こちら
                    </a>
                    ）
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <SignInButton />
            </div>
          </UnauthenticatedTemplate>
        </>
      )}
    </div>
  )
}

export default LoadingPage
