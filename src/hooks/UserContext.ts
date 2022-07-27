import React from 'react'
import User from './User'

export function createEmptyUser(): User {
  const emptyUser: User = {
    basic: {
      color: '',
      name: '',
      sex: 0,
      birthdate: '',
      station: '',
      educational: '',
      job_category: '',
      personal_info: '',
      photo: '',
    },
    pr: '',
    personal_value_list: [],
    customize_info: {
      title: '',
      info_list: [],
    },
    timeline_list: [],
  }
  return emptyUser
}

interface UserContextInterface {
  user: User
  setUser: (value: User) => void
}

/**
 * 一个自定义的hooks，提供给Provider方调用，来用它设置一个初始值。
 * 之后一起在provider的包裹范围内，取得useUserContext的hooks，
 * user就是实例，setUser可以更新user，当然userContext.user.basic.name='xxx'这样的改法也是可以的,
 * 但是要注意，浅拷贝的话并不会触发更新，所以有时候必须要通过setUser(一个新的对象)来完成更新
 * @returns
 */
export function useUserContext(): UserContextInterface {
  const defaultUser: User = createEmptyUser()
  const [user, setUser] = React.useState(defaultUser)

  return {
    user,
    setUser,
  }
}

/**
 * 使创建的userContext里边有两个成员，
 * 一个是user，一个是用来更新user的函数
 */
export const UserContext = React.createContext<UserContextInterface>({
  user: createEmptyUser(),
  setUser: (value: User) => {},
})
