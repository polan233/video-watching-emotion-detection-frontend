import React from 'react';
import VideoJS from './VideoJS';
import { FloatButton,Button,   Drawer,  Input, Upload, Select, Space,message } from 'antd';
import { useState,useEffect } from 'react';
import { FileSearchOutlined,PlusOutlined , SmileOutlined,CheckCircleFilled,UserOutlined,FileUnknownOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Dragger } = Upload;

const options = [
	{
		value: "./videos/RWBY_R.mp4",
		label: "RWBY预告片-R"
	},
	{
		value: "./videos/RWBY_Y.mp4",
		label: "RWBY预告片-Y"
	},
	{
		value: "./videos/RWBY_W.mp4",
		label: "RWBY预告片-W"
	},
	{
		value: "./videos/RWBY_B.mp4",
		label: "RWBY预告片-B"
	},
	{
		value: "./videos/FARWAY_gameplay.mp4",
		label: "FARWAY游戏录像"
	},
	{
		value: "./videos/meme.mp4",
		label: "meme"
	},
];

export const Video = () =>{
    const playerRef = React.useRef(null);
	const wsRef=React.useRef(new WebSocket("ws://localhost:9000"));
	const [username,setUser]=useState("test-user");
	const [videoName,setVname]=useState("test-video");
	const [videoPath,setVpath]=useState("/videos/RWBY_Y.mp4");
	wsRef.current.onmessage= function(result){
		console.log(result);
		var img=document.getElementById("resImg");
		let data=result.data
		img.setAttribute("src",'data:image/jpeg;base64,'+data);
	}
	const setPaused= (flag)=>{
		var videL=document.getElementById('videL_html5_api');
		if(flag){
			if(!videL.paused){
				videL.pause()
			}
		}
		else{
			if(videL.paused){
				videL.play()
			}
		}
	}
	const [videoJsOptions,setVideo] = useState({
		// 自动播放：为true时，加载完毕自动播放
		autoplay: false,
		// 播放器子控件是否显示：为true时显示暂停、播放速率等按钮
		controls: true,
		// 响应性：为true时，播放视频进度条会自动移动
		responsive: true,
		// 流式布局：为true时尽可能大得填满父标签的剩余空间
		fluid: true,
		// 视频源
		sources: [{
			// 视频文件的路径，可以是一个前端相对路径、后台视频文件URL、直播源等
			src: videoPath,
			// 视频源类型
			type: "video/mp4"
		}]
	});
	
	const [recording,setRecording] = useState(false);

	const [open,setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	  };
	const onClose = () => {
	setOpen(false);
	};

    // 播放器实例化完成后的事件动作，注意！不是视频加载成功
	const handlePlayerReady = (player) => {
		playerRef.current = player;
		// 播放器的子事件在这里定义

		player.on("canplaythrough", () => {
	        console.log("视频加载完成！")
        });
        
		player.on("error", () => {
            console.log(`视频文件加载失败，请稍后重试！`);
        });
        
        player.on("stalled", () => {
            console.log(`网络异常，请稍后重试！`);
        });
	};

	function onPause(mode){
		console.log("pause click")
		var videL=document.getElementById('videL_html5_api');
		if(recording){
			// to-do 在这里完成在记录面部录像的时候的暂停逻辑
			const ws=wsRef.current;
			if(ws && ws.readyState==1){
				ws.send("pause");
				message.info("面部表情记录暂停/重新开始")
			}
			else{
				message.error("套接字连接断开");
			}
		}
		if(mode=='button')
		{
			if(videL.paused){
				videL.play();
			}
			else{
				videL.pause();
			}
		}
	}
	function onFullScreen(){
		console.log("full screen click")
	}
	function onStart(){
		const ws=wsRef.current;
		if(ws && ws.readyState==1){
			ws.send("start");
			ws.send(username+" "+videoName);
		}
		else{
			message.error("套接字连接断开");
		}
		setRecording(true);
		setPaused(false);
		var videL=document.getElementById('videL_html5_api');
		if(videL.paused){
			videL.play();
		}
		message.success('开始录制分析面部表情');
	}
	function onFinish(){
		const ws=wsRef.current;
		if(ws && ws.readyState==1){
			ws.send("stop");
		}
		else{
			message.error("套接字连接断开");
		}
		setRecording(false);
		setPaused(true);
		var videL=document.getElementById('videL_html5_api');
		if(!videL.paused){
			videL.pause();
		}
		var img=document.getElementById("resImg");
		img.setAttribute("src",'./temp-img.jpg');
		message.success('面部表情记录完毕');
	}

	const saveFile = ()=>{
		console.log("saveFile",videoPath);
		setVideo({
			// 自动播放：为true时，加载完毕自动播放
			autoplay: false,
			// 播放器子控件是否显示：为true时显示暂停、播放速率等按钮
			controls: true,
			// 响应性：为true时，播放视频进度条会自动移动
			responsive: true,
			// 流式布局：为true时尽可能大得填满父标签的剩余空间
			fluid: true,
			// 视频源
			sources: [{
				// 视频文件的路径，可以是一个前端相对路径、后台视频文件URL、直播源等
				src: videoPath,
				// 视频源类型
				type:"video/mp4",
			}]
		});
		message.success("用户与视频信息创建成功!")
	}
	return (
		<>
        <div className='video-player' onDoubleClick={onFullScreen}>
            <VideoJS className="video-player" options={videoJsOptions} onReady={handlePlayerReady}/>
			<img id='resImg' alt='摄像头回传图片' src='./temp-img.jpg'></img>
		</div>
        <FloatButton.Group
            className='float-button'
            trigger="click"
            type="primary"
            shape='square'
            description={recording? "录制中":"点击笑脸开始录制"}
            style={{
                right: 24,
				bottom: 30
            }}
            icon={<SmileOutlined />}
            >
            <FloatButton icon={<svg t="1687679122240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1650" width="20" height="20"><path d="M542.1 512L32 892.9V131.1L542.1 512zM992 892.9V131.1h-64.6v761.7H992z m-348.3 0V131.1h-64.6v761.7h64.6z" fill="" p-id="1651"></path></svg>} onClick={()=>{onPause('button')}}/>
            <FloatButton icon={recording? <CheckCircleFilled/>:<SmileOutlined/> } onClick={recording? onFinish:onStart}/>
		</FloatButton.Group>
		<FloatButton style={{
        	right: 94,
			bottom: 50
      	}} type='primary' shape='square' description="添加记录" icon={<PlusOutlined/>} onClick={showDrawer}/>
		<Drawer
        title="添加视频记录"
        width={400}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={()=>{saveFile();onClose();}} type="primary">
              完成
            </Button>
          </Space>
        }
      	>
			<Space direction='vertical' size={"large"} style={{
      			display: 'flex',}}>
				<Input onChange={(e)=>{setUser(e.target.value);}} placeholder="输入用户名" prefix={<UserOutlined/>}/>
				<Input onChange={(e)=>{setVname(e.target.value);}} placeholder="输入视频记录名称" prefix={<FileUnknownOutlined />} />
				<Space direction='horizontal'>
				<p>选择视频:</p>
				<Select
					onChange={(e)=>{setVpath(e)}}
					options={options}
					style={{width:'280px'}}
				/>
				</Space>
			</Space>
		</Drawer>
		</>
	);
}