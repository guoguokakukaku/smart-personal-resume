import { Project } from './Project'

export default interface User {
  basic: {
    color: string
    name: string
    // 0: male 1: female
    sex: number
    birthdate: string
    station: string
    educational: string
    job_category: string
    personal_info: string
    photo: string
  }
  pr_title: string
  pr: string
  personal_value_title: string
  personal_value_list: string[]
  customize_info: {
    title: string
    info_list: string[]
  }
  what_can_i_do_title: string
  what_can_i_do: {
    label: string
    labels: string[]
    data: number[]
    button_text: string
  }[]
  skill_point_title: string
  skill_point: {
    label: string
    labels: string[]
    data: number[]
  }
  timeline_list: Project[]
}
