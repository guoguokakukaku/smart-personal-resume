import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import App from './App';
import Top from './pages/Top';
import TimeLine from './pages/TimeLine';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// メインカラーを初期化する。そうするとvar(--ant-primary-1)などの変数が初期化されて利用できるようになる
const mergedNextColor = {
  // primaryColor: '#949494',
  primaryColor: '#40a9ff',
}
ConfigProvider.config({
  theme: mergedNextColor,
})

root.render(
  <React.StrictMode>
    <TimeLine />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
