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
