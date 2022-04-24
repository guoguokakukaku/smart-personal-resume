import React, { FC, useState } from 'react'
import { Layout } from 'antd'
import './index.less'
import male from '../../assets/male.png'
import female from '../../assets/female.png'
import { ConfigProvider, Button, Divider } from 'antd'

const { Header, Footer, Sider, Content } = Layout

const Top: FC = () => {
  const [selfImg, setSelfImg] = useState(male)

  const changePrimaryColor = () => {
    // メインカラーを変更する
    const mergedNextColor = {
      primaryColor: '#f759ab',
    }
    ConfigProvider.config({
      theme: mergedNextColor,
    })
  }

  const handleClick = () => {
    changePrimaryColor()
    setSelfImg(female)
  }

  return (
    <div className='top'>
      <div className='header'>
        <Button>English</Button>
        <Button>開発履歴</Button>
      </div>

      <div>
        <img src={selfImg} alt='Logo' className='selfy_logo' />
      </div>

      <section className='section'>
        <h1>郭　維</h1>
        <h5>ITシステムエンジニア</h5>
        <Divider />
        <div className='content'>
          中国大連出身、東京都在住。
          <br />
          大学でIT関連知識を学び、卒業後は日本向けのIT企業に入職、フロントエンド・バックエンドエンジニアとしてソフトウェアの開発・運用に携わる。２０１９年からReactを中心にフロントエンドの開発に従事。
        </div>
        <Divider />

        <h2>価値観</h2>
        <div className='content'>
          <ul>
            <li>機械ではなく人のように能動性を持って自発的に仕事できる</li>
            <li>コミュニケーションを重視し、協調しながら変化があっても対応できる</li>
            <li>動くソフトウェアを重視、美しさと使いやすさを重視するソースコードを求める</li>
          </ul>
        </div>
        <Divider />

        <h2>プログラミングが好きな理由</h2>
        <div className='content'>
          <ul>
            <li>ソフトウェアは世界を繋がるものである</li>
            <li>創作性がある仕事である</li>
            <li>パートナがたくさんいる</li>
          </ul>
        </div>
        <Divider />
        <h2 className='h2'>私には何ができますか</h2>
        {/* <div className='welcome_content'>
          私はシステムエンジニアです。
          <br />
          プログラミング、Webデザインが大好きです。
          <br />
          今までの経験を活かしながら更なる成長を求めています。
          <br />
        </div> */}

        <p className='heading tag'>スキル</p>

        <Button type='primary' onClick={handleClick}>
          aaa
        </Button>
      </section>
    </div>
  )
}

export default Top
