import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getTwoEmoBarData, handleError } from "../api";


export default function TwoEmoBar(props){
    const {videoName,userName} = props;
    const [option,setOption] = useState({
        title:{
            text:"二元感情倾向"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: [ '消极', '积极']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['视频名']
          }
        ],
        series: [
          {
            name: '积极',
            type: 'bar',
            barWidth:36,
            stack: 'Total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [0.5]
          },
          {
            name: '消极',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series'
            },
            data: [-0.5]
          }
        ]
    });
    useEffect(()=>{
        console.log("props change");
        getTwoEmoBarData(userName,videoName).then((res)=>{
            let good=res.data[0];
            let bad=res.data[1];
            setOption({
                title:{
                    text:"二元感情倾向"
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  }
                },
                legend: {
                  data: [ '消极', '积极']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                yAxis: [
                  {
                    type: 'value'
                  }
                ],
                xAxis: [
                  {
                    type: 'category',
                    axisTick: {
                      show: false
                    },
                    data: [videoName]
                  }
                ],
                series: [
                  {
                    name: '积极',
                    type: 'bar',
                    barWidth:36,
                    stack: 'Total',
                    label: {
                      show: true
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [good]
                  },
                  {
                    name: '消极',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                      show: true,
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: [-bad]
                  }
                ]
            })
        })
        .catch((e)=>{
            handleError(e);
        })
    },[props]);
    return (
        <div style={{
            minHeight:"500px"
        }}>
            {<ReactECharts style={{ minHeight:"500px"}} option={option}/>}
        </div>
    );
};