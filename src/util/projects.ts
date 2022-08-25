import { getGuoweiResumeData } from '../mock/UserData'
import { Project } from '../hooks/Project'

export function getProjectList(name: string): Project[] {
  let result: Project[] = []
  if (name === 'guowei123') {
    const data = getGuoweiResumeData()
    result = data.timeline_list
  }
  return result
}
