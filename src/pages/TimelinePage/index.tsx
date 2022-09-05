import React, { FC, useState, useEffect } from 'react'
import { Timeline, Input } from 'antd'
import './index.less'
import { useNavigate, useLocation } from 'react-router-dom'
import ProjectSummaryView from '../../components/ProjectSummaryView'
import Header from '../../components/HeaderView'
import { HEADER_TYPE } from '../../util/common'
import { UserContext } from '../../hooks/UserContext'
import { getProjectList } from '../../util/projects'
import { Project } from '../../hooks/Project'

type State = {
  searchValue: string
}

const TimelinePage: FC = () => {
  const navigate = useNavigate()
  const userContext = React.useContext(UserContext)
  const projectListInit: Project[] = []
  const [projectList, setProjectList] = useState(projectListInit)
  const location = useLocation()
  const state = location.state as State
  console.log('timeline page state.searchValue: ', state ? state.searchValue : '');
  const [searchValue, setSearchValue] = useState(state ? state.searchValue : '')

  useEffect(() => {
    if (!userContext.user.basic.name) {
      navigate('/loading')
    }
    setProjectList(getProjectList('guowei'))
    window.scrollTo(0, 0)
  }, [userContext.user.basic.name, navigate])

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
    const listItems = projectList.map((project) => (
      <Timeline.Item color='red' key={project.project_code}>
        <ProjectSummaryView project={project} searchValue={searchValue} />
        <div className='common-button' onClick={() => handleShowProject(project, searchValue)}>
          案件詳細はこちら
        </div>
      </Timeline.Item>
    ))
    return listItems
  }

  return (
    <div className='page timeline'>
      <Header type={HEADER_TYPE.SEARCH} defaultValue={searchValue} actionFuncs={[handleNavBack, handleSearch]}/>

      <section className='section'>
        <div>
          <Timeline>{showProjectList(searchValue)}</Timeline>
        </div>
      </section>
    </div>
  )
}

export default TimelinePage
