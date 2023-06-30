
import './App.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState,useEffect } from 'react';
import { Video } from './Video';
import {Statistic} from './Statistic';

const items = [
  {
    label: '视频观看',
    key: 'video',
    icon: <MailOutlined />,
  },
  {
    label: '统计数据',
    key: 'statistic',
    icon: <AppstoreOutlined />,
  },
];

function App() {
  const [current, setCurrent] = useState('video');
  const [content,setContent] = useState(<Video/>);
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    if(e.key=='video'){
      setContent(<Video/>)
    }
    else{
      setContent(<Statistic/>)
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>视频观看中表情分析系统</h2>
      </header>
      <body>
        <Menu className='top-menu' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        {content}
      </body>
      <footer>
      </footer>
    </div>
  );
}

export default App;
