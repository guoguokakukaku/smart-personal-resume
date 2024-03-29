import React, { FC, Fragment } from 'react'
import './index.less'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { HEADER_TYPE } from '../../util/common'
import { SignOutButton } from '../../msal/components/SignOutButton'
import { UserContext } from '../../hooks/UserContext'
import { USER_TYPE } from '../../model/User'

const { Search } = Input

interface Props {
  // 0: top画面, 1: timelin画面 2: 通常
  type: string
  title?: string
  actionFuncs: Function[]
  defaultValue?: string
}

const HeaderView: FC<Props> = (props) => {
  const userContext = React.useContext(UserContext)

  return (
    <div className='header'>
      {props.type === HEADER_TYPE.TOP && (
        <Fragment>
          <div className='title'>{props.title}</div>
          {userContext.user.type === USER_TYPE.NETWORK && <SignOutButton />}
        </Fragment>
      )}

      {props.type === HEADER_TYPE.SEARCH && (
        <Fragment>
          <ArrowLeftOutlined className='back-arrow' onClick={() => props.actionFuncs[0]()} />
          <Search
            className='search-button'
            placeholder='技術キーワードを入力してください'
            size='large'
            onSearch={(value: string) => props.actionFuncs[1](value)}
            defaultValue={props.defaultValue}
            enterButton
          />
        </Fragment>
      )}

      {props.type === HEADER_TYPE.COMMON && (
        <Fragment>
          <ArrowLeftOutlined className='back-arrow' onClick={() => props.actionFuncs[0]()} />
          <div className='title'>{props.title}</div>
        </Fragment>
      )}
    </div>
  )
}

export default HeaderView
