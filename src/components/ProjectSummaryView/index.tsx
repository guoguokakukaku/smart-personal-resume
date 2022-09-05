import React, { FC, useEffect } from 'react'
import { ConfigProvider, Button, Divider } from 'antd'
import './index.less'
import { useNavigate } from 'react-router-dom'
import { attachTypeApi } from 'antd/lib/message'
import { Project } from '../../hooks/Project'
import { SmileOutlined, TeamOutlined, TagOutlined, DesktopOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import { isEnableProcess } from '../../util/projects'

interface Props {
  project: Project
  searchValue: undefined | string
}

const ProjectSummaryView: FC<Props> = (props) => {
  return (
    <div className='project-summary'>
      <div className='period'>
        {props.project.start_time}～{props.project.end_time ? props.project.end_time : '現在'}
      </div>
      <Divider className='divider' />
      <div className='title'>{props.project.project_name}</div>
      <div>
        <div className='project-flex-row'>
          <DesktopOutlined className='common-icon' />
          <div className='sub-title'>開発環境</div>
        </div>
        <div className='project-flex-row'>
          {props.project.dev_tool_list.map((dev_item) => {
            let content =
              dev_item === props.searchValue ? <span className='dev-env-item-match'>{dev_item}</span> : dev_item
            return <div key={dev_item} className='dev-env-item'>{content}</div>
          })}
        </div>
      </div>
      <Divider className='divider' />
      <div>
        <div className='project-flex-row'>
          <TagOutlined className='common-icon' />
          <div className='sub-title'>担当工程</div>
        </div>
        <div className='project-flex-row'>
          <div
            className={
              isEnableProcess(props.project.process_list, '要件定義') ? 'process-item' : 'process-item-disable'
            }
          >
            要件定義
          </div>
          <div
            className={
              isEnableProcess(props.project.process_list, '基本設計') ? 'process-item' : 'process-item-disable'
            }
          >
            基本設計
          </div>
          <div
            className={
              isEnableProcess(props.project.process_list, '詳細設計') ? 'process-item' : 'process-item-disable'
            }
          >
            詳細設計
          </div>
          <div
            className={isEnableProcess(props.project.process_list, '実装') ? 'process-item' : 'process-item-disable'}
          >
            実装
          </div>
          <div
            className={isEnableProcess(props.project.process_list, '試験') ? 'process-item' : 'process-item-disable'}
          >
            試験
          </div>
          <div
            className={isEnableProcess(props.project.process_list, '運用') ? 'process-item' : 'process-item-disable'}
          >
            運用
          </div>
        </div>
      </div>
      <Divider className='divider' />
    </div>
  )
}

export default ProjectSummaryView
