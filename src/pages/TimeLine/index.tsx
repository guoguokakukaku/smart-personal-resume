import React, { FC, useState, useEffect } from 'react'
import { Timeline, Input } from 'antd'
import { LeftOutlined, SmileOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Modal, Button } from 'antd'
import './index.less'
import react from '../../assets/react.png'
import { useNavigate } from 'react-router-dom'
import ProjectSummary from '../../components/ProjectSummary'

const { Search } = Input

const TimeLine: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    console.log('TimeLine')
  }, [])
  const showModal = () => {
    // setIsModalVisible(true)
    navigate('/project')
  }

  // const handleOk = () => {
  //   setIsModalVisible(false)
  // }

  // const handleCancel = () => {
  //   setIsModalVisible(false)
  // }

  const onSearch = () => {
    console.log('aaaaaaaaa')
  }

  return (
    <div className='page timeline'>
      <div className='header'>
        <ArrowLeftOutlined className='back-arrow' onClick={() => navigate(-1)} />
        {/* <Search placeholder='input search text' allowClear enterButton='検索' size='large' /> */}
        <Search className='search-button' placeholder='input search text' size='large' onSearch={onSearch} enterButton />
      </div>

      <section className='section'>
        {/* <Modal title='Basic Modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal> */}
        <div>
          <Timeline>
            <Timeline.Item color='red'>
              <ProjectSummary text='hello' cb={() => showModal()} />
            </Timeline.Item>
            <Timeline.Item color='green'>
              <ProjectSummary text='hello' cb={() => showModal()} />
            </Timeline.Item>
            <Timeline.Item color='green'>
              <ProjectSummary text='hello' cb={() => showModal()} />
            </Timeline.Item>
          </Timeline>
        </div>
      </section>
    </div>
  )
}

export default TimeLine
