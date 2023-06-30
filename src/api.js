import axios from 'axios';
const baseURL='http://127.0.0.1:5000'
axios.defaults.baseURL=baseURL;

export function handleError(error){
    // handle error
    console.log(error)
    if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log(error.request);
      } else {
        // 发送请求时出了点问题
        console.log('Error', error.message);
      }
      console.log(error.config);
}

export function getVideoList(){
  return axios({
    method:'get',
    url:'/getAllVideos'+'/',
  })
}

export function getUserList(){
    return axios({
        method:'get',
        url:'/getUserList'+'/',
      })
}

export function getData(username,videoname){
    return axios({
        method:'get',
        url:'/getData'+'/'+username+"/"+videoname+'/',
      })
}
export function getTwoEmoBarData(username,videoname){
    return axios({
        method:'get',
        url:'/getTwoEmoBar'+'/'+username+"/"+videoname+'/',
      })
}

export function getMulEmoRadarData(username,videoname){
    return axios({
        method:'get',
        url:'/getMulEmoRadar'+'/'+username+"/"+videoname+'/',
      })
}

export function getRiverData(username,videoname){
  return axios({
      method:'get',
      url:'/getRiverData/',
      params:{
        username:username,
        videoname:videoname,
      }
    })
}

export function getDiffRadarData(username){
  return axios({
    method:'get',
    url:'/getDiffRadar/',
    params:{
      username:username,
    }
  })
}

export function getDiffBarData(username){
  return axios({
    method:'get',
    url:'/getDiffBar/',
    params:{
      username:username,
    }
  })
}