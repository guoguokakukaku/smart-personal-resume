import React, { FC, useState } from 'react'
import { Timeline, Input } from 'antd'
import { LeftOutlined, SmileOutlined } from '@ant-design/icons'
import { Modal, Button } from 'antd'
import './index.less'
import react from '../../assets/react.png'
const { Search } = Input;
function TimeLine() {
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
    <div>
      <div className='header'>
        <LeftOutlined />
        <Search placeholder='input search text' allowClear enterButton='Search' size='large' />
      </div>

      <Modal title='Basic Modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
      </Modal>
      <div className='timeline'>
        <Timeline>
          <Timeline.Item color='green'>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color='red'>
            <p className='title'>2015-09-01 ～ 2015-09-01</p>
            <a href='#' className='title2' onClick={showModal}>
              ekyc本人オンライン確認サービス
            </a>
            <p className='title3'>
              <div className='item'>React</div>
              <div className='item'>React</div>
              <div className='item'>React</div>
              <div className='item'>React</div>
              <div className='item'>React</div>
            </p>
            <p>
              スマートフォン上で撮影した本人確認書類と顔写真だけで本人確認が可能になるサービスである。
              サーバー側はnodeJsで実装され、クライアント側はreactを利用している。私はクライアントに参加している。クライアント側は書類識別SDKを使って、スマートフォンのカメラで本人確認用の書類を自動識別機能を実装して様々な書類で本人確認をできる機能を実現できた。
              アジャイル開発である。
            </p>
          </Timeline.Item>
          <Timeline.Item color='red'>
            <p className='title'>2015-09-01 ～ 2015-09-01</p>
            <a href='#' className='title2' onClick={showModal}>
              文書管理システム
            </a>
            <p className='title3'>
              <div className='item'>React</div>
              <div className='item'>React</div>
              <div className='item'>React</div>
              <div className='item'>React</div>
              <div className='item'>React</div>
            </p>
            <p>
              現場を開設してから竣工までの文書を管理するシステムとなる。 我々のチームはサーバ側の開発を担当していて
              私は具体的にフォルダの作成・移動および削除などの機能を担当していた。
              また、PDF変換バッチ処理も担当していた。
            </p>
          </Timeline.Item>
          <Timeline.Item color='red'>
            <p className='title'>2015-09-01 ～ 2015-09-01</p>
            <a href='#' className='title2' onClick={showModal}>
              ekyc本人オンライン確認サービス
            </a>
            <p className='title3'>
              <div className='item'>React</div>
              <div className='item'>React</div>
              <div className='item'>React</div>
              <div className='item'>React</div>
              <div className='item'>React</div>
            </p>
            <p>
              スマートフォン上で撮影した本人確認書類と顔写真だけで本人確認が可能になるサービスである。
              サーバー側はnodeJsで実装され、クライアント側はreactを利用している。私はクライアントに参加している。クライアント側は書類識別SDKを使って、スマートフォンのカメラで本人確認用の書類を自動識別機能を実装して様々な書類で本人確認をできる機能を実現できた。
              アジャイル開発である。
            </p>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  )
}

export default TimeLine