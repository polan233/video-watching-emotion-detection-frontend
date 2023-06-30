import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getDiffBarData, handleError} from '../api'

export default function DiffBar(props){
    const {userName} = props;
    const [option,setOption] = useState(
        {
            title:{
               text:"不同视频反应比较"
           },
           tooltip: {
             trigger: 'axis',
             axisPointer: {
               type: 'shadow'
             }
           },
           legend: {},
           grid: {
             left: '3%',
             right: '4%',
             bottom: '3%',
             containLabel: true
           },
           xAxis: [
             {
               type: 'category',
               data: ['video1', 'video2', 'video3', 'video4', 'video5', 'video6', 'video7']
             }
           ],
           yAxis: [
             {
               type: 'value'
             }
           ],
           dataZoom: [
             {
               type: 'inside',
               start: 0,
               end: 10
             },
             {
               start: 0,
               end: 10
             }
           ],
           series: [
             {
               name: 'happy',
               type: 'bar',
               stack: '积极',
               emphasis: {
                 focus: 'series'
               },
               data: [620, 732, 701, 734, 1090, 1130, 1120]
             },
             {
               name: 'surprise',
               type: 'bar',
               stack: '积极',
               emphasis: {
                 focus: 'series'
               },
               data: [120, 132, 101, 134, 290, 230, 220]
             },
             {
               name: 'neutral',
               type: 'bar',
               stack: '积极',
               emphasis: {
                 focus: 'series'
               },
               data: [60, 72, 71, 74, 190, 130, 110]
             },
             {
               name: 'angry',
               type: 'bar',
               stack: '消极',
               emphasis: {
                 focus: 'series'
               },
               data: [120, 132, 101, 134, 90, 230, 210]
             },
             {
               name: 'disgust',
               type: 'bar',
               stack: '消极',
               emphasis: {
                 focus: 'series'
               },
               data: [220, 182, 191, 234, 290, 330, 310]
             },
             {
               name: 'fear',
               type: 'bar',
               stack: '消极',
               emphasis: {
                 focus: 'series'
               },
               data: [150, 232, 201, 154, 190, 330, 410]
             },
             {
               name: 'sad',
               type: 'bar',
               stack: '消极',
               emphasis: {
                 focus: 'series'
               },
               data: [150, 232, 201, 154, 190, 330, 410]
             },
           ]
         });
    useEffect(()=>{
        console.log("props change");
        getDiffBarData(userName).then((res)=>{
          let data=res.data;
          let videos=data.videos;
          setOption({
            title:{
               text:"不同视频反应比较"
           },
           tooltip: {
             trigger: 'axis',
             axisPointer: {
               type: 'shadow'
             }
           },
           legend: {},
           grid: {
             left: '3%',
             right: '4%',
             bottom: '3%',
             containLabel: true
           },
           xAxis: [
             {
               type: 'category',
               data: videos
             }
           ],
           yAxis: [
             {
               type: 'value'
             }
           ],
           dataZoom: [
             {
               type: 'inside',
               start: 0,
               end: 10
             },
             {
               start: 0,
               end: 10
             }
           ],
           series: [
             {
               name: 'happy',
               type: 'bar',
               stack: '积极',
               emphasis: {
                 focus: 'series'
               },
               data: data.happy
             },
             {
               name: 'surprise',
               type: 'bar',
               stack: '积极',
               emphasis: {
                 focus: 'series'
               },
               data: data.surprise
             },
             {
               name: 'neutral',
               type: 'bar',
               stack: '积极',
               emphasis: {
                 focus: 'series'
               },
               data: data.neutral
             },
             {
               name: 'angry',
               type: 'bar',
               stack: '消极',
               emphasis: {
                 focus: 'series'
               },
               data: data.angry
             },
             {
               name: 'disgust',
               type: 'bar',
               stack: '消极',
               emphasis: {
                 focus: 'series'
               },
               data: data.disgust
             },
             {
               name: 'fear',
               type: 'bar',
               stack: '消极',
               emphasis: {
                 focus: 'series'
               },
               data: data.fear
             },
             {
               name: 'sad',
               type: 'bar',
               stack: '消极',
               emphasis: {
                 focus: 'series'
               },
               data: data.sad
             },
           ]
         })
        }).catch((e)=>{
          handleError(e);
        })
    },[props]);
    return (
        <div style={{
            minHeight:"800px"
        }}>
            <ReactECharts style={{ minHeight:"800px"}} option={option}/>
        </div>
    );
};