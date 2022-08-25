import GuoWei from './resume/guowei/guowei.json'
import User from '../hooks/User'
import { createEmptyUser } from '../hooks/UserContext'
import { info } from 'console'
import { getGuoweiResumeData } from './UserData'

// export const getInfo = async (): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(JSON.stringify(Data))
//     }, 1000)
//   })
// }

export const fetchUserInfoFromJsonFile = async (userName: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const Data = getGuoweiResumeData();
      const user: User = createEmptyUser()
      // basic 基本情報
      user.basic.color = Data.basic.color
      user.basic.name = Data.basic.name
      user.basic.sex = Number.parseInt(Data.basic.sex)
      user.basic.birthdate = Data.basic.birthdate
      user.basic.station = Data.basic.station
      user.basic.educational = Data.basic.educational
      user.basic.job_category = Data.basic.job_category
      user.basic.personal_info = Data.basic.personal_info
      // pr 自己PR
      user.pr = Data.pr
      // personal_value_list　個人価値観
      user.personal_value_list = Data.personal_value_list
      // customize_info　プログラミングが好きな理由
      user.customize_info.title = Data.customize_info.title
      user.customize_info.info_list = Data.customize_info.info_list

      // 

      console.log(user)
      resolve(user)
    }, 1000)
  })
}
