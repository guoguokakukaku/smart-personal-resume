import { FC } from 'react'
import { Divider, Image } from 'antd'
import './index.less'
import { BlockOutlined, MessageOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import ProjectSummaryView from '../ProjectSummaryView'
import { Project } from '../../model/Project'
import { USER_TYPE } from '../../model/User'

interface Props {
  project: Project
  searchValue: string
  userType: USER_TYPE
}

const ProjectDetailView: FC<Props> = (props) => {
  const projectImageListJSX = getProjectImageList(props.userType, props.project.image_list, props.project.project_code)

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
      <div className='project-flex-row-center'>{projectImageListJSX}</div>
      <Divider className='divider' />
    </div>
  )
}

function getProjectImageList(userType: USER_TYPE, projectImageList: string[], projectCode: string) {
  console.log('getProjects', userType)
  if (userType === USER_TYPE.LOCAL) {
    return projectImageList.map((image) => {
      return (
        <Image key={image} className='img' src={`${process.env.PUBLIC_URL}/project_images/${projectCode}/${image}`} />
      )
    })
  }
  if (userType === USER_TYPE.NETWORK) {
    // TODO
  }
}

export default ProjectDetailView
