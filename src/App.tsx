import React, { FC, useState } from 'react'
import { Button, Modal, Timeline } from 'antd'
import './App.less'
import { SmileOutlined } from '@ant-design/icons';

const App: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className='App'>
      <Button type='primary' onClick={showModal}>
        Button
      </Button>
      <Modal title='Basic Modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <Timeline>
        <Timeline.Item color='green'>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item color='green'>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item color='red'>
          <p>Solve initial network problems 1</p>
          <p>Solve initial network problems 2</p>
          <p>Solve initial network problems 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item color='gray'>
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item color='gray'>
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item color='#00CCFF' dot={<SmileOutlined />}>
          <p>Custom color testing</p>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

export default App
