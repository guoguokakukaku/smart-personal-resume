import { FC, useEffect, useContext, useState } from 'react'
import { UserContext } from '../../hooks/UserContext'
import { useNavigate } from 'react-router-dom'
import { fetchUserInfoFromJsonFile } from '../../mock/api'
import { ConfigProvider } from 'antd'
import { USER_TYPE } from '../../model/User'
import { SignInButton } from '../../msal/components/SignInButton'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import './index.less'
import Header from '../../components/HeaderView'
import LoadOneDriveView from '../../components/LoadOneDriveView'
import { HEADER_TYPE } from '../../util/common'
import { QRCodeSVG } from 'qrcode.react'

const enum STATUS {
  RENDING, // 初始时
  READY, // 等待用户进行msal认证时
  COMMUNICATION, // 认证成功取得oneDrive内容时
  LOADED, //oneDrive内容载入完了时
}

const LoadingPage: FC = () => {
  console.log('Loading page render...')
  const navigate = useNavigate()
  // 因为已经在router里边进行了初始化，所以这里得到的userContext的值就是useUserContext，里边包含一个user，还有一个设置user的方法。
  const userContext = useContext(UserContext)
  const [status, setStatus] = useState<STATUS>(STATUS.RENDING)
  const [infoMessage, setInfoMessage] = useState<string>()

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
            const data = await fetchUserInfoFromJsonFile(userName)
            data.basic.photo = require(`../../mock/resume/${userName}/self.png`)
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
      }, 2000)
    }
  }, [navigate, userContext.user.basic.color, userContext.user.basic.name])

  return (
    <div className='page loading'>
      <Header type={HEADER_TYPE.TOP} title='次世代履歴書' actionFuncs={[]} />
      {infoMessage}
      <br />
      <LoadOneDriveView />
      <div>{userContext.user.basic.name && <div> Welcome back {userContext.user.basic.name}</div>}</div>
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
            <div className='tos'>
              <div className='title'>サンプル用アカウント</div>
              <div>ﾕｰｻﾞ: smart-personal-resume@outlook.jp</div>
              <div>ﾊﾟｽﾜｰﾄﾞ: smartpr2023</div>
            </div>
            <div className='tos'>
              <div className='title'>
                スマートフォンでアクセスする場合
                <br />
                下記QRコードを読み込んでください
                <br />
              </div>
              <div className='qrcode'>
                <QRCodeSVG value='https://smart-personal-resume.azurewebsites.net/' />
              </div>
            </div>
          </UnauthenticatedTemplate>
        </>
      )}
    </div>
  )
}

export default LoadingPage
