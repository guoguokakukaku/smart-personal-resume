import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom'
import TopPage from '../pages/TopPage'
import TimelinePage from '../pages/TimelinePage'
import ProjectPage from '../pages/ProjectPage'
import LoadingPage from '../pages/LoadingPage'
import Error from '../pages/ErrorPage'
import { UserContext, useUserContext } from '../hooks/UserContext'

export default function Router() {
  // 这里的user是一个自定义hook，组件树中取得userContext，并可以调用setUser方法更新
  const user = useUserContext()

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path='/top' element={<TopPage />}></Route>
          <Route path='/project' element={<ProjectPage />}></Route>
          <Route path='/timeline' element={<TimelinePage />}></Route>
          <Route path='/error' element={<Error />}></Route>
          <Route path='*' element={<LoadingPage />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
