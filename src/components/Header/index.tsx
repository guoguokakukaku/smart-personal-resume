import React, { FC, useEffect, Fragment } from 'react'
import { ConfigProvider, Button, Divider, Image } from 'antd'
import './index.less'
import { useNavigate } from 'react-router-dom'
import { attachTypeApi } from 'antd/lib/message'
import { BlockOutlined, MessageOutlined, TagOutlined, DesktopOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import ProjectSummary from '../ProjectSummary'
import react from '../../assets/react.png'
import { LeftOutlined, SmileOutlined, ArrowLeftOutlined, WechatFilled, MailOutlined } from '@ant-design/icons'
import { Timeline, Input } from 'antd'
import { HEADER_TYPE } from '../../util/common'
import LINELogo from '../../assets/LINE_logo.svg';
import GmailLogo from '../../assets/Gmail_logo.svg';

const { Search } = Input

type Props = {
  // 0: top画面, 1: timelin画面 2: 通常
  type: string
  title: string
  actionFuncs: Function[]
}

const Header: FC<Props> = (props) => {
  return (
    <div className='header'>
      {props.type === HEADER_TYPE.TOP && (
        <Fragment>
          {/* <Button type='primary'>English</Button>
          <Button type='primary'>開発履歴</Button> */}
          {/* <WechatFilled className='aaaaa'/>
          <MailOutlined className='bbbbb' /> */}
          <a href='https://line.me/ti/p/_TadaLnNlm' target='_blank' rel='noreferrer'>
            <img src={LINELogo} alt='line'  className='aaaaa'/>
          </a>
          <a href='mailto:guowei.dev@gmail.com'>
            <img src={GmailLogo} alt='gmail' className='bbbbb'/>
          </a>
        </Fragment>
      )}

      {props.type === HEADER_TYPE.SEARCH && (
        <Fragment>
          <ArrowLeftOutlined className='back-arrow' onClick={() => props.actionFuncs[0]()} />
          <Search
            className='search-button'
            placeholder='input search text'
            size='large'
            onSearch={() => props.actionFuncs[1]()}
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

export default Header
