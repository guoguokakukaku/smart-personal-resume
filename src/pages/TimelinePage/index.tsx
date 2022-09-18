import { FC, useState, useEffect, useMemo, useContext } from 'react'
import { Timeline } from 'antd'
import './index.less'
import { useNavigate, useLocation } from 'react-router-dom'
import ProjectSummaryView from '../../components/ProjectSummaryView'
import Header from '../../components/HeaderView'
import { HEADER_TYPE } from '../../util/common'
import { Project } from '../../model/Project'
import { UserContext } from '../../hooks/UserContext'

type State = {
  searchValue: string
}

const TimelinePage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as State
  const userContext = useContext(UserContext)
  const projectList: Project[] = useMemo(() => userContext.user.timeline_list, [userContext.user.timeline_list])
  const [searchValue, setSearchValue] = useState(state ? state.searchValue : '')
  const [projectFilterList, setProjectFilterList] = useState(projectList)
  useEffect(() => {
    if (!userContext.user.basic.name) {
      navigate('/loading')
    }
    window.scrollTo(0, 0)
    if (searchValue === undefined || searchValue === null || searchValue === '') {
      setProjectFilterList(projectList)
    } else {
      const searchValueRegExp = new RegExp(searchValue, 'i')
      setProjectFilterList(
        projectList.filter((project) => {
          return (
            project.dev_tool_list.find((devItem) => {
              return devItem.match(searchValueRegExp) !== null
            }) !== undefined
          )
        })
      )
    }
  }, [navigate, projectList, searchValue, userContext.user.basic.name])

  const handleShowProject = (project: Project, searchValue: string) => {
    navigate('/project', { state: { project: project, searchValue: searchValue } })
  }

  const handleNavBack = () => {
    console.log('handleNavBack')
    navigate('/top')
  }

  const handleSearch = (value: string) => {
    console.log('onSearch ', value)
    setSearchValue(value)
  }

  const showProjectList = (searchValue: string) => {
    if (projectFilterList.length === 0) return <div>条件に一致する内容は見つかりません。</div>

    return projectFilterList.map((project) => (
      <Timeline.Item color={project.end_time ? 'green': 'red'} key={project.project_code}>
        <ProjectSummaryView project={project} searchValue={searchValue} />
        <div className='common-button' onClick={() => handleShowProject(project, searchValue)}>
          案件詳細はこちら
        </div>
      </Timeline.Item>
    ))
  }
  console.log('timeline page render...')
  return (
    <div className='page timeline'>
      <Header type={HEADER_TYPE.SEARCH} defaultValue={searchValue} actionFuncs={[handleNavBack, handleSearch]} />

      <section className='section'>
        <div>
          <Timeline>{showProjectList(searchValue)}</Timeline>
        </div>
      </section>
    </div>
  )
}

export default TimelinePage
