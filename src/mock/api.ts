import User from '../model/User'
import { createEmptyUser } from '../hooks/UserContext'
import { getGuoweiResumeData } from './UserData'

export const fetchUserInfoFromJsonFile = async (userName: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // TODO
      const Data = getGuoweiResumeData()
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
      user.pr_title = Data.pr_title
      user.pr = Data.pr
      // personal_value_list　個人価値観（人物像）
      user.personal_value_title = Data.personal_value_title
      user.personal_value_list = Data.personal_value_list
      // customize_info　プログラミングが好きな理由
      user.customize_info.title = Data.customize_info.title
      user.customize_info.info_list = Data.customize_info.info_list

      // what_can_i_do_title 私には何ができますか
      user.what_can_i_do_title = Data.what_can_i_do_title
      user.what_can_i_do = Data.what_can_i_do
      
      // skill_point
      user.skill_point_title = Data.skill_point_title
      user.skill_point = Data.skill_point

      // timeline_list
      user.timeline_list = Data.timeline_list

      resolve(user)
    }, 1000)
  })
}
