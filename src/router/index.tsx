import { Routes, Route, MemoryRouter } from 'react-router-dom'
import TopPage from '../pages/TopPage'
import TimelinePage from '../pages/TimelinePage'
import ProjectPage from '../pages/ProjectPage'
import LoadingPage from '../pages/LoadingPage'
import Error from '../pages/ErrorPage'
import { UserContext, useUserContext } from '../hooks/UserContext'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from '../msal/authConfig'
import { MsalProvider } from '@azure/msal-react'
import { MsalResultContext, useMaslResultContext } from '../hooks/MsalResultContext'

export default function Router() {
  console.log('Router page render...')
  // 这里的user是一个自定义hook，组件树中取得userContext，并可以调用setUser方法更新
  const user = useUserContext()
  const msalResult = useMaslResultContext()
  /**
   * Initialize a PublicClientApplication instance which is provided to the MsalProvider component
   * We recommend initializing this outside of your root component to ensure it is not re-initialized on re-renders
   */
  const msalInstance = new PublicClientApplication(msalConfig)

  return (
    <UserContext.Provider value={user}>
      <MsalProvider instance={msalInstance}>
        <MsalResultContext.Provider value={msalResult}>
          <MemoryRouter>
            <Routes>
              <Route path='/top' element={<TopPage />}></Route>
              <Route path='/project' element={<ProjectPage />}></Route>
              <Route path='/timeline' element={<TimelinePage />}></Route>
              <Route path='/error' element={<Error />}></Route>
              <Route path='*' element={<LoadingPage />}></Route>
            </Routes>
          </MemoryRouter>
        </MsalResultContext.Provider>
      </MsalProvider>
    </UserContext.Provider>
  )
}
