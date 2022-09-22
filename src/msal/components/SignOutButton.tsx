import { useMsal } from '@azure/msal-react'
import { Button } from 'antd'
import './style.less'

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
  const { instance } = useMsal()

  const handleLogout = (logoutType: string) => {
    if (logoutType === 'popup') {
      instance.logoutPopup({
        postLogoutRedirectUri: '/',
        mainWindowRedirectUri: '/',
      })
    } else if (logoutType === 'redirect') {
      instance.logoutRedirect({
        postLogoutRedirectUri: '/',
      })
    }
  }
  return (
    <Button type='primary' className='logout-button' onClick={() => handleLogout('redirect')}>
      サインアウト
    </Button>
  )
}
