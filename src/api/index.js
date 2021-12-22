import requests from "./requests";
// 首页接口数据 /index/index
export const reqHomeInfo = () => {return requests.get('/index/index')}
//搜索popup的数据
export const reqPopupBoxData = () => {return requests.get('/search/index')}
//获取搜索框的数据
export const reqSearchData=(params)=>{return requests.get('goods/list',{params})}
// 实时搜索功能 url：search/helper method:get 参数 keyword
export const reqIntimeSearchData=(params)=>{
  return requests.get('/search/helper',{params})
}
