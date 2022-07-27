import React, { FC, useEffect, useState } from 'react'
import { Radio } from 'antd'
import './index.less'
import male from '../../assets/male.png'
import female from '../../assets/female.png'
import { ConfigProvider, Divider } from 'antd'
import { drawBar, drawRadar0, drawRadar1 } from '../../util/drawCharts'
import Chart from 'chart.js/auto'
import { hex2rgb, getStyleFromCSSClass } from '../../util/common'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { HEADER_TYPE } from '../../util/common'
import { UserContext } from '../../hooks/UserContext'

let experienceChart: Chart | undefined = undefined
let skillChart: Chart | undefined = undefined

const Top: FC = () => {
  const navigate = useNavigate()
  const userContext = React.useContext(UserContext)
  console.log('top page: ', userContext.user.basic.name)
  // const [selfImg, setSelfImg] = useState(userContext.user.basic.sex === 0 ? male : female)
  const [selfRadarChartColor, setSelfRadarChartColor] = useState<string>(
    hex2rgb(getStyleFromCSSClass('canvas-panel', 'color'))
  )
  const [radarType, setRadarType] = useState<string>('0')

  useEffect(() => {
    if (!userContext.user.basic.name) {
      navigate('/loading')
    }
  })

  useEffect(() => {
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
    const ctx = document.getElementById('skillChart') as HTMLCanvasElement
    if (skillChart !== undefined) {
      skillChart.destroy()
      skillChart = undefined
    }
    skillChart = drawBar(ctx)
  }, [])

  const handleChangeExperienceChart = (type: string) => {
    if (type === '0') {
      setRadarType('0')
    } else {
      setRadarType('1')
    }
  }

  const handleTimeLineClick = () => {
    navigate('/timeLine')
  }

  const changePrimaryColor = () => {
    // メインカラーを変更する
    const mergedNextColor = {
      // primaryColor: '#f759ab',
      // primaryColor: '#7cb305',
      primaryColor: userContext.user.basic.color,
    }
    ConfigProvider.config({
      theme: mergedNextColor,
    })
  }

  const handleClick = () => {
    changePrimaryColor()
    // setSelfImg(female)
    setSelfRadarChartColor(hex2rgb(getStyleFromCSSClass('canvas-panel', 'color')))
  }

  const generalListHtml = (infoList: string[]) => {
    let t = ''
    infoList.forEach((item) => {
      t += `<li>${item}</li>`
    })
    return { __html: t }
  }

  return (
    <div className='page top'>
      <Header type={HEADER_TYPE.TOP} title='' actionFuncs={[]} />

      <div>
        <img src={userContext.user.basic.photo} alt='Logo' className='selfy-logo' />
      </div>

      <section className='section'>
        <h1>{userContext.user.basic.name}</h1>
        <h5>{userContext.user.basic.job_category}</h5>
        <Divider />
        <div className='content'>{userContext.user.basic.personal_info}</div>
        <Divider />

        <h2>自己PR</h2>
        <div className='content'>{userContext.user.pr}</div>
        <Divider />

        <h2>価値観</h2>
        <div className='content'>
          <ul dangerouslySetInnerHTML={generalListHtml(userContext.user.personal_value_list)} />
        </div>
        <Divider />

        <h2>{userContext.user.customize_info.title}</h2>
        <div className='content'>
          <ul dangerouslySetInnerHTML={generalListHtml(userContext.user.customize_info.info_list)} />
        </div>
        <Divider />
        <h2>私には何ができますか</h2>
        <div className='canvas-panel'>
          <canvas id='experienceChart' />
          <div>
            <Radio.Group
              value={radarType}
              onChange={(e) => handleChangeExperienceChart(e.target.value)}
              optionType='button'
              buttonStyle='solid'
            >
              <Radio.Button value='0'>担当工程</Radio.Button>
              <Radio.Button value='1'>業務経験</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <Divider />
        <h2>スキル情報</h2>
        <div className='canvas-panel'>
          <canvas id='skillChart' height={300} />
        </div>

        <Divider />
        {/* <Button type='primary' onClick={handleClick}>
          aaa
        </Button> */}

        <div className='footer'>
          <div className='common-button' onClick={() => handleTimeLineClick()}>
            開発履歴はこちら
          </div>
        </div>
      </section>
    </div>
  )
}

export default Top
