import React, { FC, useState } from 'react'
import { Button } from 'antd'
import './App.less'
import { ConfigProvider } from 'antd'
import Data from './mock/resume/guowei.json'
import { getInfo } from './mock/api'
import { Resume } from './types/Resume'

const App: FC = () => {
  const [count, setCount] = useState(0)

  const handleClick = async () => {
    setCount(count + 1)

    console.log('start')
    const a = await getInfo()
    const r = JSON.parse(a) as Resume
    console.log(r.basic.name)
    window.location.href="https://funjob.jp/keisan/gekkyu/";
    // 切题主颜色
    // const mergedNextColor = {
    //   primaryColor: '#DC143C'
    // }
    // ConfigProvider.config({
    //   theme: mergedNextColor,
    // })
  }

  return (
    <div className='App'>
      <div>{count}</div>
      <Button type='primary' onClick={handleClick}>
        Button
      </Button>
    </div>
  )
}

export default App
