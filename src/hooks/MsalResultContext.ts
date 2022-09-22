import React from 'react'
import { AccountInfo } from '@azure/msal-browser'

export interface MsalResult {
  accessToken: string
  account: AccountInfo | null
}

interface MsalResultContextInterface {
  result: MsalResult
  setResult: (value: MsalResult) => void
}

export function useMaslResultContext(): MsalResultContextInterface {
  const defaultValue: MsalResult = {
    accessToken: '',
    account: null,
  }
  const [result, setResult] = React.useState(defaultValue)

  return {
    result,
    setResult,
  }
}

export const MsalResultContext = React.createContext<MsalResultContextInterface>({
  result: {
    accessToken: '',
    account: null,
  },
  setResult: (value: MsalResult) => {}
})
