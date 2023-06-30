import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getMulEmoRadarData,handleError } from "../api";

export default function SevenEmoRadar(props){
    const {videoName,userName} = props;
    const [option,setOption] = useState(
        {
            title: {
              text: '总体多元感情倾向'
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
                name: '各项情感指标',
                type: 'radar',
                data: [
                  {
                    value: [0.5, 0.2, 0.5, 0.2, 0.2, 0.9,0.2],
                  },
                ]
              },
            ]
          });
          useEffect(()=>{
            console.log("props change");
            getMulEmoRadarData(userName,videoName).then((res)=>{
                let data=res.data;
                setOption({
                    title: {
                      text: '总体多元感情倾向'
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
                        name: '各项情感指标',
                        type: 'radar',
                        data: [
                          {
                            value: data,
                          },
                        ]
                      },
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