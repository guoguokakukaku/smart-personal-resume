import React, { FC, useEffect } from 'react'
import { ConfigProvider, Button, Divider } from 'antd'
import './index.less'
import { useNavigate } from 'react-router-dom'
import { attachTypeApi } from 'antd/lib/message'
import { SmileOutlined, TeamOutlined, TagOutlined, DesktopOutlined, AppstoreAddOutlined } from '@ant-design/icons'

type Props = {
  text: string
  cb: Function
}

const ProjectSummary: FC<Props> = (props) => {
  return (
    <div className='project-summary'>
      <div className='period'>2015-09-01 ～ 2015-09-01</div>
      <Divider className='divider' />
      <div className='title'>【React】あああああサービス開発</div>
      <div>
        <div className='project-flex-row'>
          <DesktopOutlined className='item-icon' />
          <div className='sub-title'>開発環境</div>
        </div>
        <div className='project-flex-row'>
          <div className='dev-env-item'><span className='dev-env-item-match'>Java</span></div>
          <div className='dev-env-item'>Vue</div>
          <div className='dev-env-item'>Aws</div>
        </div>
      </div>
      <Divider className='divider' />
      <div>
        <div className='project-flex-row'>
          <TagOutlined className='item-icon' />
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
      </div>
      <Divider className='divider' />
      {/* <div>
        <div className='project-flex-row'>
          <AppstoreAddOutlined className='item-icon' />
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
      </div>
      <Divider className='divider' /> */}
      <div className='btn' onClick={() => props.cb()}>
        案件詳細はこちら
      </div>
    </div>
  )
}

export default ProjectSummary
