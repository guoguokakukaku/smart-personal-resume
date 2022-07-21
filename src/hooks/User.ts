export interface User  {
  basic: {
    name: string
    // 0: male 1: female
    sex: number
    birthdate: string
    educational: string
    job_category: string
    personal_info: string
  }
  pr: string
  personal_value_list: string[]
  customize_info: {
    title: string
    info_list: []
  }
  timeline_list: {
    start_time: string
    end_time: string
    project_name: string
    dev_tool_list: number[]
    process_list: number[]
    description: string
    detail_list: string[]
    image_list: string[]
  }[]
}
