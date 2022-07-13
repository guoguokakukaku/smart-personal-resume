import React, { FC, useEffect } from 'react'
import { ConfigProvider, Button, Divider } from 'antd'
import { LeftOutlined, SmileOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import './index.less'
import { useNavigate } from 'react-router-dom'

const Project: FC = () => {
  // console.log('project')
  useEffect(() => {
    console.log('Project')
    window.scrollTo(0, 0);
  }, [])
  const navigate = useNavigate()

  return (
    <div className='page project'>
      <div className='header'>
        <ArrowLeftOutlined className='back-arrow' onClick={() => navigate(-1)} />
        <div className='title'>1長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である長文である</div>
      </div>
      <section className='section'>Projects page</section>
    </div>
  )
}

export default Project
