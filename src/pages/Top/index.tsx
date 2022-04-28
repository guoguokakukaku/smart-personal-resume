import React, { FC, useEffect, useState } from 'react'
import { Layout, Radio } from 'antd'
import './index.less'
import male from '../../assets/male.png'
import female from '../../assets/female.png'
import { ConfigProvider, Button, Divider } from 'antd'
import { drawBar, drawRadar0, drawRadar1 } from '../../util/drawCharts'
import Chart from 'chart.js/auto'
import { hex2rgb, getStyleFromCSSClass } from '../../util/common'

let experienceChart: Chart | undefined = undefined
let skillChart: Chart | undefined = undefined

const Top: FC = () => {
  console.log('top', experienceChart, skillChart)
  const [selfImg, setSelfImg] = useState(male)
  const [selfRadarChartColor, setSelfRadarChartColor] = useState<string>(
    hex2rgb(getStyleFromCSSClass('canvas-panel', 'color'))
  )
  const [radarType, setRadarType] = useState<string>('0')

  const changePrimaryColor = () => {
    // メインカラーを変更する
    const mergedNextColor = {
      // primaryColor: '#f759ab',
      primaryColor: '#7cb305',
    }
    ConfigProvider.config({
      theme: mergedNextColor,
    })
  }

  const handleClick = () => {
    changePrimaryColor()
    setSelfImg(female)
    setSelfRadarChartColor(hex2rgb(getStyleFromCSSClass('canvas-panel', 'color')))
  }

  const handleChangeExperienceChart = (type: string) => {
    if (type === '0') {
      setRadarType('0')
    } else {
      setRadarType('1')
    }
  }

  useEffect(() => {
    console.log('experienceChart', experienceChart)
    const ctx = document.getElementById('experienceChart') as HTMLCanvasElement
    if (experienceChart !== undefined) {
      experienceChart.destroy()
      experienceChart = undefined
    }
    if (radarType === '0') {
      experienceChart = drawRadar0(ctx, selfRadarChartColor)
    } else {
      experienceChart = drawRadar1(ctx, selfRadarChartColor)
    }
  }, [selfRadarChartColor, radarType])

  useEffect(() => {
    console.log('skillChart', skillChart)
    const ctx = document.getElementById('skillChart') as HTMLCanvasElement
    if (skillChart !== undefined) {
      skillChart.destroy()
      skillChart = undefined
    }
    skillChart = drawBar(ctx)
  }, [])

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
        <div className='canvas-panel'>
          <canvas id='experienceChart' height='200' />
          <div>
            <Radio.Group value={radarType} onChange={(e) => handleChangeExperienceChart(e.target.value)}>
              <Radio.Button value='0'>担当工程</Radio.Button>
              <Radio.Button value='1'>業務経験</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <Divider />
        <h2 className='h2'>スキル情報</h2>
        <div className='canvas-panel'>
          <canvas id='skillChart' height={300} />
        </div>

        <Button type='primary' onClick={handleClick}>
          aaa
        </Button>
      </section>
    </div>
  )
}

export default Top
