import React, { FC, useState, useEffect } from 'react'
import { Timeline, Input } from 'antd'
import './index.less'
import { useNavigate } from 'react-router-dom'
import ProjectSummary from '../../components/ProjectSummary'
import Header from '../../components/Header'
import { HEADER_TYPE } from '../../util/common'
import { UserContext } from '../../hooks/UserContext'
import { getProjectList } from '../../util/projects'

const { Search } = Input

const TimeLine: FC = () => {
  const navigate = useNavigate()
  const userContext = React.useContext(UserContext)
  console.log('timeline page: ', userContext.user.basic.name)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (!userContext.user.basic.name) {
      navigate('/loading')
    }
    console.log('★' + getProjectList('guowei').length)
    window.scrollTo(0, 0)
  })

  const handleShowProject = () => {
    navigate('/project')
  }

  const handleNavBack = () => {
    console.log('handleNavBack')
    navigate(-1)
  }

  const handleSearch = () => {
    console.log('onSearch')
  }

  return (
    <div className='page timeline'>
      <Header type={HEADER_TYPE.SEARCH} title='' actionFuncs={[handleNavBack, handleSearch]} />

      <section className='section'>
        <div>
          <Timeline>
            <Timeline.Item color='red'>
              <ProjectSummary text='hello' cb={() => handleShowProject()} />
            </Timeline.Item>
            <Timeline.Item color='green'>
              <ProjectSummary text='hello' cb={() => handleShowProject()} />
            </Timeline.Item>
            <Timeline.Item color='green'>
              <ProjectSummary text='hello' cb={() => handleShowProject()} />
            </Timeline.Item>
          </Timeline>
        </div>
      </section>
    </div>
  )
}

export default TimeLine
