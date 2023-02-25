import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingPage from '.././pages/LoadingPage'

// Navigatorモック準備
const mockedNavigator = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}))

describe('LoadingPage', () => {
  test('renders LoadingPage without url param', () => {
    render(<LoadingPage />)
    const linkElement = screen.getByText(/次世代経歴書/i)
    const linkElement2 = screen.getByText(/Microsoft アカウントを持っているこ/i)
    expect(linkElement).toBeInTheDocument()
    expect(linkElement2).toBeInTheDocument()
  })
})
