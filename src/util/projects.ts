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
