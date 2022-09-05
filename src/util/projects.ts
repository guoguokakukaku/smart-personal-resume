import { getGuoweiResumeData } from '../mock/UserData'
import { Project } from '../hooks/Project'

export function getProjectList(name: string): Project[] {
  let result: Project[] = []
  if (name === 'guowei') {
    const data = getGuoweiResumeData()
    result = data.timeline_list
  }
  return result
}

export function isEnableProcess(projectList: string[], process: string): boolean {
  let result = false
  projectList.forEach((e) => {
    if (e === process) {
      result = true
      return
    }
  })
  return result
}
