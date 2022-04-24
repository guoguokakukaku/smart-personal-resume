import Data from '../mock/resume/guowei.json'

export const getInfo = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(Data))
    }, 1000)
  })
}
