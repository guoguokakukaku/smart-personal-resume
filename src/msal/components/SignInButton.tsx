import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'
import { Button } from 'antd'
import './style.less'

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
  const { instance } = useMsal()

  const handleLogin = (loginType: string) => {
    if (loginType === 'popup') {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e)
      })
    } else if (loginType === 'redirect') {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e)
      })
    }
  }
  return (
    <Button type='primary' className='login-button' onClick={() => handleLogin('redirect')}>
      サインイン
    </Button>
  )
}
