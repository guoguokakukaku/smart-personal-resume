import { FC, useEffect, useContext } from 'react'
import { UserContext } from '../../hooks/UserContext'
import { useNavigate } from 'react-router-dom'
import { fetchUserInfoFromJsonFile } from '../../mock/api'
import { ConfigProvider } from 'antd'

const Loading: FC = () => {
  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  console.log('loading page: ', userContext.user.basic.name)

  useEffect(() => {
    if (!userContext.user.basic.name) {
      let urlParamStr = window.location.search
      // console.log('★', urlParamStr)

      if (!urlParamStr) urlParamStr = 'u=guowei' // TODO default user
      let user = ''
      if (urlParamStr) {
        //?を除去
        urlParamStr = urlParamStr.substring(1)

        //urlパラメータをオブジェクトにまとめる
        console.log(urlParamStr.split('&').length) // 必ず1
        user = urlParamStr.split('&')[0].split('=')[1] // this is a sample: guowei

        if (user) {
          const fetchData = async () => {
            console.log('getUserInfoFromJsonFile start')
            const data = await fetchUserInfoFromJsonFile(user)
            data.basic.photo = require(`../../mock/resume/${user}/self.png`)
            console.log('getUserInfoFromJsonFile end')
            userContext.setUser(data)
          }
          fetchData().catch(console.error)
        } else {
          navigate('/error')
        }
      } else {
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

export default Loading

// let urlParamStr = window.location.search
// // console.log('★', urlParamStr)
// let user = ""
// if (urlParamStr) {
//   //?を除去
//   urlParamStr = urlParamStr.substring(1)

//   //urlパラメータをオブジェクトにまとめる
//   console.log(urlParamStr.split('&').length) // 必ず1
//   user = urlParamStr.split('&')[0].split('=')[1]
//   // urlParamStr.split('&').forEach((param) => {
//   //   const temp = param.split('=')
//   //   //pramsオブジェクトにパラメータを追加
//   //   params = {
//   //     ...params,
//   //     [temp[0]]: temp[1],
//   //   }
//   // })
// }
// // console.log(user)

// // React.createContext()
