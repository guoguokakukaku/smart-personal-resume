import { FC, useContext, useEffect, useState } from 'react'
import { Divider, Image, Spin } from 'antd'
import './index.less'
import { BlockOutlined, MessageOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import ProjectSummaryView from '../ProjectSummaryView'
import { Project } from '../../model/Project'
import { USER_TYPE } from '../../model/User'
import { MsalResultContext } from '../../hooks/MsalResultContext'
import { callMsGraph2OneDriveImgContentByItemId } from '../../msal/graph'

interface Props {
  project: Project
  searchValue: string
  userType: USER_TYPE
}

const ProjectDetailView: FC<Props> = (props) => {
  const msalResultContext = useContext(MsalResultContext)
  const [status, setStatus] = useState('rending')
  const [projectImageListJSX, setProjectImageListJSX] = useState(Array<JSX.Element>())

  useEffect(() => {
    if (props.userType === USER_TYPE.LOCAL) {
      const jsxList = props.project.image_list.map((image) => {
        return (
          <Image
            key={image}
            className='img'
            src={`${process.env.PUBLIC_URL}/project_images/${props.project.project_code}/${image}`}
          />
        )
      })
      setProjectImageListJSX(jsxList)
      setStatus('loaded')
    } else if (props.userType === USER_TYPE.NETWORK) {
      const urlList = props.project.image_list.map((imageId) => {
        return callMsGraph2OneDriveImgContentByItemId(msalResultContext.result.accessToken, imageId)
      })
      Promise.all(urlList).then((values) => {
        const jsxList = values.map((i: string) => {
          return <Image key={i} className='img' src={i} />
        })
        setProjectImageListJSX(jsxList)
        setStatus('loaded')
      })
    }
  }, [msalResultContext.result.accessToken, props.project.image_list, props.project.project_code, props.userType])

  if (status === 'rending') {
    return (
      <div className='project-detail-view-loading'>
        <Spin tip="Loading" size="large"/>
      </div>
    )
  }
  console.log('ProjectDetailView page rending.')
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

export default ProjectDetailView
