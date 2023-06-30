import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Divider, Row,FloatButton,Drawer,Space,Button,Select } from 'antd';
import {FilterFilled} from '@ant-design/icons';
import TwoEmoBar from "./charts/TwoEmoBar";
import SevenEmoRadar from "./charts/SevenEmoRadar";
import EmoRiver from "./charts/EmoRiver";
import { getUserList,handleError } from "./api";
import DifferRadar from "./charts/DifferRadar";
import DiffBar from "./charts/DiffBar";



export function Statistic(props){
    const [open,setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	  };
	const onClose = () => {
	    setOpen(false);
	};
    const [mounted, setMounted] = useState(false);
    const [userList,setUserList] = useState([]);
    const [users,setUsers]= useState([]);
    const [videos,setVideos]=useState([]);
    const [user,setUser] =useState('');
    const [video,setVideo]=useState('');

    const getVideos = (username) => {
        if(username=="all users"){
            var data=userList;
            var t=[];
            for(let i=0;i<data.length;i++){
                const videos=data[i].videos;
                for(let j=0;j<videos.length;j++){
                    const video=videos[j]
                    t.push({
                        value:video,
                        label:video,
                    })
                }
            }
            t.push({
                value:"all videos",
                label:"all videos",
            })
            return t;
        }
        let videos=[];
        let res=[];
        for(let i=0;i<userList.length;i++){
            console.log("getvideos",userList);
            if(userList[i].user==username){
                videos=userList[i].videos;
                break;
            }
        }
        console.log("getvideos",videos);
        for(let i=0;i<videos.length;i++){
            res.push({
                value:videos[i],
                label:videos[i],
            })
        }
        res.push({
            value:"all videos",
            label:"all videos",
        })
        return res;
    }
    const loadUserList = () => {
        getUserList().then((res)=>{
            console.log("get user list",res);
            var data=res.data;
            setUserList(data);
            let t=[];
            for(let i=0;i<data.length;i++){
                const name=data[i].user;
                t.push({
                    value:name,
                    label:name,
                })
            }
            t.push({
                value:"all users",
                label:"all users",
            })
            setUsers(t);
            t=[];
            for(let i=0;i<data.length;i++){
                const videos=data[i].videos;
                for(let j=0;j<videos.length;j++){
                    const video=videos[j]
                    t.push({
                        value:video,
                        label:video,
                    })
                }
            }
            t.push({
                value:"all videos",
                label:"all videos",
            })
            setVideos(t);
        })
        .catch((e)=>{
            handleError(e);
        })
    }
    useEffect(()=>{
        if (!mounted) {
            // 在组件挂载时执行一次的代码
            console.log('S mounted');
            setMounted(true);
            loadUserList();
          } else {
            // 在组件更新时执行的代码
            console.log('S updated');
          }
    })
    return (
        <>
        {
            video=="all videos"?
            <div className="charts">
                <div className="top-padding"></div>
                <Row justify="space-around">
                    <Col span={22}><DifferRadar userName={user} /></Col>
                </Row>
                <Row justify="space-around">
                    <Col span={22}><DiffBar userName={user}/></Col>
                </Row>
            </div>
            :
            <div className="charts">
            <div className="top-padding"></div>
            <Row justify="space-around">
                <Col span={10}><TwoEmoBar userName={user} videoName={video} /></Col>
                <Col span={10}><SevenEmoRadar userName={user} videoName={video} /></Col>
            </Row>
            <Row justify="space-around">
                <Col span={22}><EmoRiver userName={user} videoName={video} /></Col>
            </Row>
            </div>
        }
        <FloatButton type='primary' shape='square' icon={<FilterFilled />} onClick={()=>{loadUserList();showDrawer();}}/>
        <Drawer
        title="筛选数据范围"
        width={400}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={()=>{onClose();}} type="primary">
              完成
            </Button>
            <Button onClick={()=>{loadUserList();}} >
              刷新
            </Button>
          </Space>
        }
      	>
        <Space size={'large'} direction='vertical'>
            <Space direction='horizontal'>
                <p>选择用户:</p>
                <Select
                    options={users}
                    value={user}
                    style={{width:'280px'}}
                    onChange={(e)=>{
                        let v=getVideos(e);
                        setUser(e);
                        setVideos(v);
                    }}
                />
            </Space>
            <Space direction='horizontal'>
                <p>选择视频:</p>
                <Select
                    options={videos}
                    value={video}
                    style={{width:'280px'}}
                    onChange={(e)=>{
                        setVideo(e);
                    }}
                />
            </Space>
        </Space>
        </Drawer>
        </>
    )
    
}