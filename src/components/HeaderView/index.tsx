import React, { FC, Fragment } from 'react'
import './index.less'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { HEADER_TYPE } from '../../util/common'
import LINELogo from '../../assets/LINE_logo.svg';
import GmailLogo from '../../assets/Gmail_logo.svg';

const { Search } = Input

interface Props {
  // 0: top画面, 1: timelin画面 2: 通常
  type: string
  title?: string
  actionFuncs: Function[]
  defaultValue?:  string
}

const HeaderView: FC<Props> = (props) => {
  return (
    <div className='header'>
      {props.type === HEADER_TYPE.TOP && (
        <Fragment>
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
