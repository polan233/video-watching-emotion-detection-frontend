import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { handleError,getDiffRadarData } from "../api";

export default function DifferRadar(props){
    const {userName} = props;
    const [option,setOption] = useState(
        {
            title: {
              text: '不同视频反应比较'
            },
            legend: {
              data: ['video1', 'video2']
            },
            radar: {
              // shape: 'circle',
              indicator: [
               { name: 'angry', max: 1 },
                          { name: 'disgust', max: 1 },
                          { name: 'fear', max: 1 },
                          { name: 'happy', max: 1 },
                          { name: 'sad', max: 1 },
                          { name: 'surprise', max: 1 },
                          { name: 'neutral', max: 1 }
              ]
            },
            series: [
              {
                name: '不同视频反应比较',
                type: 'radar',
                data: [
                  {
                    value: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4,0.7],
                    name: 'video1'
                  },
                  {
                    value: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8,0.2],
                    name: 'video2'
                  }
                ]
              }
            ]
          });
          useEffect(()=>{
            console.log("props change");
            getDiffRadarData(userName).then((res)=>{
                let data=res.data;
                let videos=data.videos;
                let datas=data.datas;
                setOption({
                    title: {
                      text: '不同视频反应比较'
                    },
                    legend: {
                      data: videos
                    },
                    radar: {
                      // shape: 'circle',
                      indicator: [
                                { name: 'angry', max: 1 },
                                { name: 'disgust', max: 1 },
                                { name: 'fear', max: 1 },
                                { name: 'happy', max: 1 },
                                { name: 'sad', max: 1 },
                                { name: 'surprise', max: 1 },
                                { name: 'neutral', max: 1 }
                      ]
                    },
                    series: [
                      {
                        name: '不同视频反应比较',
                        type: 'radar',
                        data: datas
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
            <ReactECharts style={{ minHeight:"500px"}} option={option}/>
        </div>
    );
};