import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import {getRiverData, handleError} from '../api'

export default function EmoRiver(props){
    const {videoName,userName} = props;
    const [option,setOption] = useState(
        {
            title:{
                text:"情感河流图"
            },
            toolbox: {
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'line',
                lineStyle: {
                  color: 'rgba(0,0,0,0.2)',
                  width: 2,
                  type: 'solid'
                }
              }
            },
            legend: {
              data: ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise','neutral']
            },
            singleAxis: {
              top: 50,
              bottom: 50,
              axisTick: {},
              axisLabel: {},
              type: 'value',
              axisPointer: {
                animation: true,
                label: {
                  show: true
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  opacity: 0.2
                }
              }
            },
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
                type: 'themeRiver',
                emphasis: {
                  itemStyle: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                  }
                },
                data: [
                  ['0.00', 0.9, 'angry'],
                  ['0.00', 0.2, 'disgust'],
                  ['0.00', 0.2, 'fear'],
                  ['0.00', 0.2, 'happy'],
                  ['0.00', 0.2, 'sad'],
                  ['0.00', 0.2, 'surprise'],
                  ['0.00', 0.2, 'neutral'],
                  ['0.02', 0.3, 'angry'],
                  ['0.02', 0.2, 'disgust'],
                  ['0.02', 0.2, 'fear'],
                  ['0.02', 0.5, 'happy'],
                  ['0.02', 0.2, 'sad'],
                  ['0.02', 0.2, 'surprise'],
                  ['0.02', 0.1, 'neutral'],
                ]
              }
            ]
          });
    useEffect(()=>{
        console.log("props change");
        getRiverData(userName,videoName).then((res)=>{
          let data=res.data;
          setOption({
            title:{
                text:"情感河流图"
            },
            toolbox: {
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'line',
                lineStyle: {
                  color: 'rgba(0,0,0,0.2)',
                  width: 2,
                  type: 'solid'
                }
              }
            },
            legend: {
              data: ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise','neutral']
            },
            singleAxis: {
              top: 50,
              bottom: 50,
              axisTick: {},
              axisLabel: {},
              type: 'value',
              axisPointer: {
                animation: true,
                label: {
                  show: true
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  opacity: 0.2
                }
              }
            },
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
                type: 'themeRiver',
                emphasis: {
                  itemStyle: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                  }
                },
                data: data
              }
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