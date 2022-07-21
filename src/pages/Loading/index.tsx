import { FC, useEffect } from 'react'
import { UserContext } from '../../hooks/UserContext'
import { User } from '../../hooks/User'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Loading: FC = () => {
  const navigate = useNavigate()
  const userContext = React.useContext(UserContext)
  console.log('loading page: ', userContext.user.basic.name)
  useEffect(() => {
    if (!userContext.user.basic.name) {
      setTimeout(() => {
        const loadUser: User = {
          basic: {
            name: 'guowei',
            sex: 0,
            birthdate: '',
            educational: '',
            job_category: '',
            personal_info: '',
          },
          pr: '',
          personal_value_list: [],
          customize_info: {
            title: '',
            info_list: [],
          },
          timeline_list: [],
        }
        userContext.setUser(loadUser)
        setTimeout(() => {
          navigate('/top')
        }, 1000)
      }, 1000)
    }
  }, [navigate, userContext])

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
