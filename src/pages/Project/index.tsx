import React, { FC, useEffect } from 'react'
import { ConfigProvider, Button, Divider } from 'antd'
import { LeftOutlined, SmileOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import './index.less'
import { useNavigate } from 'react-router-dom'
import ProjectDetail from '../../components/ProjectDetail'
import Header from '../../components/Header'
import { HEADER_TYPE } from '../../util/common'

const Project: FC = () => {
  useEffect(() => {
    console.log('Project')
    window.scrollTo(0, 0)
  }, [])
  const navigate = useNavigate()

  const handleNavBack = () => {
    console.log('handleNavBack')
    navigate(-1)
  }

  return (
    <div className='page project'>
      <Header type={HEADER_TYPE.COMMON} title='案件詳細' actionFuncs={[handleNavBack]} />

      <section className='section'>
        <ProjectDetail text='hello' cb={() => console.log('aaa')} />
      </section>
    </div>
  )
}

export default Project
