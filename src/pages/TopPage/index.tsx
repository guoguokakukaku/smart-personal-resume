import React, { FC, useEffect, useState } from 'react'
import { Radio } from 'antd'
import './index.less'
import { ConfigProvider, Divider } from 'antd'
import { drawBar, drawRadar0 } from '../../util/drawCharts'
import Chart from 'chart.js/auto'
import { hex2rgb, getStyleFromCSSClass } from '../../util/common'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/HeaderView'
import { HEADER_TYPE } from '../../util/common'
import { UserContext } from '../../hooks/UserContext'

let experienceChart: Chart | undefined = undefined
let skillChart: Chart | undefined = undefined

const TopPage: FC = () => {
  console.log('Top page render...')
  const navigate = useNavigate()
  const userContext = React.useContext(UserContext)
  const [selfRadarChartColor, setSelfRadarChartColor] = useState<string>(
    hex2rgb(getStyleFromCSSClass('canvas-panel', 'color'))
  )
  const [radarType, setRadarType] = useState('0')

  useEffect(() => {
    if (!userContext.user.basic.name) {
      navigate('/loading')
    }
  })

  useEffect(() => {
    // 図表を描画する
    if (!userContext.user.what_can_i_do_title) return
    const ctx = document.getElementById('experienceChart') as HTMLCanvasElement
    if (experienceChart !== undefined) {
      experienceChart.destroy()
      experienceChart = undefined
    }

    experienceChart = drawRadar0(
      ctx,
      selfRadarChartColor,
      userContext.user.what_can_i_do[Number(radarType)].label,
      userContext.user.what_can_i_do[Number(radarType)].labels,
      userContext.user.what_can_i_do[Number(radarType)].data
    )
  }, [selfRadarChartColor, radarType, userContext.user.what_can_i_do, userContext.user.what_can_i_do_title])

  useEffect(() => {
    // 図表を描画する
    const ctx = document.getElementById('skillChart') as HTMLCanvasElement
    if (!userContext.user.skill_point_title) return
    if (skillChart !== undefined) {
      skillChart.destroy()
      skillChart = undefined
    }
    skillChart = drawBar(
      ctx,
      userContext.user.skill_point.label,
      userContext.user.skill_point.labels,
      userContext.user.skill_point.data
    )
  }, [
    userContext.user.skill_point.data,
    userContext.user.skill_point.label,
    userContext.user.skill_point.labels,
    userContext.user.skill_point_title,
  ])

  const handleChangeExperienceChart = (type: string) => {
    setRadarType(type)
  }

  const handleTimeLineClick = () => {
    navigate('/timeLine')
  }

  const changePrimaryColor = (primaryColor: undefined | string) => {
    // メインカラーを変更する
    const mergedNextColor = {
      // primaryColor: '#f759ab',
      // primaryColor: '#7cb305',
      primaryColor: primaryColor ? primaryColor : userContext.user.basic.color,
    }
    ConfigProvider.config({
      theme: mergedNextColor,
    })
  }

  // theme変更メソッド
  const handleClick = () => {
    changePrimaryColor('#00FF00')
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
      <Header type={HEADER_TYPE.TOP} title='基本情報' actionFuncs={[]} />

      <div>
        <img src={userContext.user.basic.photo} alt='Logo' className='selfy-logo' />
      </div>

      <section className='section'>
        <h1>{userContext.user.basic.name}</h1>
        <h5>{userContext.user.basic.job_category}</h5>
        <Divider />
        <div className='content' dangerouslySetInnerHTML={{ __html: userContext.user.basic.personal_info }} />
        <Divider />
        <h2>{userContext.user.pr_title}</h2>
        <div className='content' dangerouslySetInnerHTML={{ __html: userContext.user.pr }} />
        <Divider />
        <h2>{userContext.user.personal_value_title}</h2>
        <div className='content'>
          <ul dangerouslySetInnerHTML={generalListHtml(userContext.user.personal_value_list)} />
        </div>
        <Divider />
        <h2>{userContext.user.customize_info.title}</h2>
        <div className='content'>
          <ul dangerouslySetInnerHTML={generalListHtml(userContext.user.customize_info.info_list)} />
        </div>
        {userContext.user.what_can_i_do_title && (
          <>
            <Divider />
            <h2>{userContext.user.what_can_i_do_title}</h2>
            <div className='canvas-panel'>
              <canvas id='experienceChart' />
              <div>
                <Radio.Group
                  value={radarType}
                  onChange={(e) => handleChangeExperienceChart(e.target.value)}
                  optionType='button'
                  buttonStyle='solid'
                >
                  <Radio.Button value='0'>{userContext.user.what_can_i_do[0].button_text}</Radio.Button>
                  {userContext.user.what_can_i_do.length > 1 && (
                    <>
                      <Radio.Button value='1'>{userContext.user.what_can_i_do[1].button_text}</Radio.Button>
                    </>
                  )}
                </Radio.Group>
              </div>
            </div>
          </>
        )}
        {userContext.user.skill_point_title && (
          <>
            <Divider />
            <h2>{userContext.user.skill_point_title}</h2>
            <div className='canvas-panel'>
              <canvas id='skillChart' height={300} />
            </div>
            <Divider />
            <div className='footer'>
              <div className='common-button' onClick={() => handleTimeLineClick()}>
                開発履歴はこちら
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default TopPage
