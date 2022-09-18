import React, { FC, useEffect } from 'react'
import './index.less'
import { useNavigate, useLocation } from 'react-router-dom'
import ProjectDetailView from '../../components/ProjectDetailView'
import Header from '../../components/HeaderView'
import { HEADER_TYPE } from '../../util/common'
import { UserContext } from '../../hooks/UserContext'
import { Project } from '../../model/Project'

type State = {
  project: Project
  searchValue: string
}

const ProjectPage: FC = () => {
  const navigate = useNavigate()
  const userContext = React.useContext(UserContext)
  console.log('project page: ', userContext.user.basic.name)

  const location = useLocation()
  const state = location.state as State
  const project = state.project
  const searchValue = state.searchValue

  useEffect(() => {
    if (!userContext.user.basic.name) {
      navigate('/loading')
    }
    window.scrollTo(0, 0)
  }, [navigate, userContext.user.basic.name])

  const handleNavBack = () => {
    console.log('Project page handleNavBack ', searchValue)
    navigate('/timeline', { state: { searchValue: searchValue } })
  }

  console.log('project page render...')
  return (
    <div className='page project'>
      <Header type={HEADER_TYPE.COMMON} title='案件詳細' actionFuncs={[handleNavBack]} />

      <section className='section'>
        <ProjectDetailView project={project} searchValue={searchValue} userType={userContext.user.type} />
      </section>
    </div>
  )
}

export default ProjectPage
