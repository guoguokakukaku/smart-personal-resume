import React, { FC, useEffect } from 'react'
import { ConfigProvider, Button, Divider, Image } from 'antd'
import './index.less'
import { useLocation } from 'react-router-dom'
import { attachTypeApi } from 'antd/lib/message'
import { BlockOutlined, MessageOutlined, TagOutlined, DesktopOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import ProjectSummaryView from '../ProjectSummaryView'
import react from '../../assets/react.png'
import { Project } from '../../hooks/Project'
import { isEnableProcess } from '../../util/projects'

interface Props {
  project: Project,
  searchValue: string
}

const ProjectDetailView: FC<Props> = (props) => {
  return (
    <div className='project-detail'>
      <ProjectSummaryView project={props.project} searchValue={props.searchValue} />
      <div className='project-flex-row'>
        <MessageOutlined className='common-icon' />
        <div className='sub-title'>案件詳細</div>
      </div>
      <div className='project-flex-row'>
        <div className='project-description' dangerouslySetInnerHTML={{ __html: props.project.description }} />
      </div>
      <Divider className='divider' />
      <div className='project-flex-row'>
        <AppstoreAddOutlined className='common-icon' />
        <div className='sub-title'>業務内容</div>
      </div>
      <div className='project-flex-row'>
        <ol>
          {props.project.detail_list.map((detail_item) => {
            return <li key={detail_item}>{detail_item}</li>
          })}
        </ol>
      </div>
      <Divider className='divider' />
      <div className='project-flex-row'>
        <BlockOutlined className='common-icon' />
        <div className='sub-title'>画面キャプチャ</div>
      </div>
      <div className='project-flex-row-center'>
        {props.project.image_list.map((image) => {
          return <Image key={image} className='img' src={`./project_images/${props.project.project_code}/${image}`} />
        })}
      </div>
      <Divider className='divider' />
    </div>
  )
}

export default ProjectDetailView
