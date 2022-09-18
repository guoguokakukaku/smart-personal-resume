import { FC, useEffect, useContext } from 'react'
import { UserContext } from '../../hooks/UserContext'
import { useNavigate } from 'react-router-dom'
import { fetchUserInfoFromJsonFile } from '../../mock/api'
import { ConfigProvider } from 'antd'
import { USER_TYPE } from '../../model/User'

const LoadingPage: FC = () => {
  const navigate = useNavigate()
  // 因为已经在router里边进行了初始化，所以这里得到的userContext的值就是useUserContext，里边包含一个user，还有一个设置user的方法。
  const userContext = useContext(UserContext)
  console.log('loading page: ', userContext.user.basic.name)

  useEffect(() => {
    console.log("LoadingPage: ", userContext.user.basic.name);
    // ユーザが未取得の場合、取得を行う
    if (!userContext.user.basic.name) {
      let urlParamStr = window.location.search
      // TODO 通常urlパラメータでユーザ識別しますが、ここでdefault userを設定されてしまう
      if (!urlParamStr) urlParamStr = 'u=guowei'
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
        // TODO goto microsoft
        navigate('/error')
      }
    }
  }, [navigate, userContext, userContext.user])

  useEffect(() => {
    if (userContext.user.basic.name) {
      changePrimaryColor()
      setTimeout(() => {
        navigate('/top')
      }, 1000)
    }
  })

  const changePrimaryColor = () => {
    // メインカラーを変更する
    const mergedNextColor = {
      // primaryColor: '#f759ab',
      // primaryColor: '#7cb305',
      primaryColor: userContext.user.basic.color,
    }
    ConfigProvider.config({
      theme: mergedNextColor,
    })
  }

  return (
    <div>
      Loading<div>{userContext.user.basic.name}</div>
      {/* <button onClick={() => userContext.setUser(loadUser)}>aaaaa</button> */}
    </div>
  )
}

export default LoadingPage
