import React, { FC, useEffect } from 'react'
import { ConfigProvider, Button, Divider, Image } from 'antd'
import './index.less'
import { useNavigate } from 'react-router-dom'
import { attachTypeApi } from 'antd/lib/message'
import { BlockOutlined, MessageOutlined, TagOutlined, DesktopOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import ProjectSummary from '../ProjectSummary'
import react from '../../assets/react.png'

interface Props {
  text: string
  cb: Function
}

const ProjectDetail: FC<Props> = (props) => {
  return (
    <div className='project-detail'>
      <div className='title'>【React】あああああサービス開発</div>
      <div className='project-flex-row'>
        <DesktopOutlined className='common-icon' />
        <div className='sub-title'>開発環境</div>
      </div>
      <div className='project-flex-row'>
        <div className='dev-env-item'>Java</div>
        <div className='dev-env-item'>Vue</div>
        <div className='dev-env-item'>Aws</div>
      </div>
      <Divider className='divider' />
      <div className='project-flex-row'>
        <TagOutlined className='common-icon' />
        <div className='sub-title'>担当工程</div>
      </div>
      <div className='project-flex-row'>
        <div className='process-item-enable'>要件定義</div>
        <div className='process-item-enable'>基本設計</div>
        <div className='process-item'>詳細設計</div>
        <div className='process-item'>実装</div>
        <div className='process-item'>試験</div>
        <div className='process-item'>運用</div>
      </div>
      <Divider className='divider' />
      <div className='project-flex-row'>
        <MessageOutlined className='common-icon' />
        <div className='sub-title'>案件詳細</div>
      </div>
      <div className='project-flex-row'>
        <div className='project-description'>
          スマートフォン上で撮影した本人確認書類と顔写真だけで本人確認が可能になるサービスである。
          <br />
          サーバー側はnodeJsで実装され、クライアント側はreactを利用している。私はクライアントに参加している。
          <br />
          クライアント側は書類識別SDKを使って、スマートフォンのカメラで本人確認用の書類を自動識別機能を実装して様々な書類で本人確認をできる機能を実現できた。
          アジャイル開発である。
        </div>
      </div>
      <Divider className='divider' />
      <div className='project-flex-row'>
        <AppstoreAddOutlined className='common-icon' />
        <div className='sub-title'>業務内容</div>
      </div>
      <div className='project-flex-row'>
        <ol>
          <li>運営するSAASの保守、運用開発業務</li>
          <li>要件内容/基本設計に基づいて可能性分析、詳細実現提案</li>
          <li>新規・改修・様々なカスタマイズ要望に応じて開発業務</li>
          <li>設計・実装・テスト・リリースの一連業務</li>
          <li>チームの一員としてコミュニケーションを取りながら様々な課題の分析・解決を行う</li>
        </ol>
      </div>
      <Divider className='divider' />
      <div className='project-flex-row'>
        <BlockOutlined className='common-icon' />
        <div className='sub-title'>画面キャプチャ</div>
      </div>
      <div className='project-flex-row-center'>
        <Image className='img' src={react} />
        <Image
          className='img'
          src='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
        />
        <Image
          className='img'
          src='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
        />
      </div>
      <Divider className='divider' />
    </div>
  )
}

export default ProjectDetail
