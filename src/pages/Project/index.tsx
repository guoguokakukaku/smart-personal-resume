import React, { FC, useEffect } from 'react'
import { ConfigProvider, Button, Divider } from 'antd'
import { LeftOutlined, SmileOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import './index.less'
import { useNavigate } from 'react-router-dom'
import ProjectDetail from '../../components/ProjectDetail'

const Project: FC = () => {
  useEffect(() => {
    console.log('Project')
    window.scrollTo(0, 0)
  }, [])
  const navigate = useNavigate()

  return (
    <div className='page project'>
      <div className='header'>
        <ArrowLeftOutlined className='back-arrow' onClick={() => navigate(-1)} />
        <div className='title'>案件詳細</div>
      </div>
      <section className='section'>
        <ProjectDetail text='hello' cb={() => console.log('aaa')} />
      </section>
    </div>
  )
}

export default Project
