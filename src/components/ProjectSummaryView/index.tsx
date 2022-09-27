import { FC } from 'react'
import { Divider } from 'antd'
import './index.less'
import { Project } from '../../model/Project'
import { TagOutlined, DesktopOutlined } from '@ant-design/icons'
import { isEnableProcess } from '../../util/projects'
import { DEV_PROCESS } from '../../util/common'

interface Props {
  project: Project
  searchValue: string
}

const ProjectSummaryView: FC<Props> = (props) => {
  const getHighlightDevItem = (dev_item: string) => {
    if (props.searchValue === undefined || props.searchValue === null || props.searchValue === '') {
      return <>{dev_item}</>
    }

    const searchValueRegExp = new RegExp(props.searchValue, 'i')
    const result = dev_item.match(searchValueRegExp)
    let part1
    let part2
    let part3
    if (result !== undefined && result !== null && result.index !== undefined) {
      part1 = dev_item.substring(0, result?.index)
      part2 = dev_item.substring(result?.index, result?.index + props.searchValue.length)
      part3 = dev_item.substring(result?.index + props.searchValue.length)
      return (
        <>
          {part1}
          <span className='dev-env-item-match'>{part2}</span>
          {part3}
        </>
      )
    } else {
      return <>{dev_item}</>
    }
  }

  return (
    <div className='project-summary'>
      <div className='period'>
        {`${props.project.start_time.substring(0, 4)}年${props.project.start_time.substring(4, 6)}月`}～
        {props.project.end_time
          ? `${props.project.end_time.substring(0, 4)}年${props.project.end_time.substring(4, 6)}月`
          : '現在'}
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
            return (
              <div key={dev_item} className='dev-env-item'>
                {getHighlightDevItem(dev_item)}
              </div>
            )
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
              isEnableProcess(props.project.process_list, DEV_PROCESS.REQUIREMENTS_DEFINITION)
                ? 'process-item'
                : 'process-item-disable'
            }
          >
            {DEV_PROCESS.REQUIREMENTS_DEFINITION}
          </div>
          <div
            className={
              isEnableProcess(props.project.process_list, DEV_PROCESS.BASIC_DESIGN)
                ? 'process-item'
                : 'process-item-disable'
            }
          >
            {DEV_PROCESS.BASIC_DESIGN}
          </div>
          <div
            className={
              isEnableProcess(props.project.process_list, DEV_PROCESS.DETAILED_DESIGN)
                ? 'process-item'
                : 'process-item-disable'
            }
          >
            {DEV_PROCESS.DETAILED_DESIGN}
          </div>
          <div
            className={
              isEnableProcess(props.project.process_list, DEV_PROCESS.CODING) ? 'process-item' : 'process-item-disable'
            }
          >
            {DEV_PROCESS.CODING}
          </div>
          <div
            className={
              isEnableProcess(props.project.process_list, DEV_PROCESS.TEST) ? 'process-item' : 'process-item-disable'
            }
          >
            {DEV_PROCESS.TEST}
          </div>
          <div
            className={
              isEnableProcess(props.project.process_list, DEV_PROCESS.MENTINATION)
                ? 'process-item'
                : 'process-item-disable'
            }
          >
            {DEV_PROCESS.MENTINATION}
          </div>
        </div>
      </div>
      <Divider className='divider' />
    </div>
  )
}

export default ProjectSummaryView
