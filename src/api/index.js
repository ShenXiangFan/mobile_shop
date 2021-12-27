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
//清除历史记录 url：search/clearhistory
export const reqDeleteHistoryData=()=>{
  return requests.post('/search/clearhistory')
}
//用户登录 url:/auth/loginByWeb method:post
export const reqUserLogin=(params)=>{
  return requests.post('/auth/loginByWeb',params)
}
//获取专题数据
export const reqTopicData=(params)=>{
  return requests.get('/topic/list',{params})
}

//获取分类列表 url:/catalog/index method:get
export const reqClassific=()=>{
  return requests.get('/catalog/index')
}

export const reqGoodsDetail=(params)=>{
  return requests.get('/goods/detail',{params})
}
//获取大家都在看相关产品
export const reqRelativeGoods=(params)=>{
  return requests.get('/goods/related',{params})
}
//获取产品数量
export const reqGetGoodsNumber=()=>{
  return requests.get('/cart/goodscount')
}
//加入购物车
export const reqAddCart=(params)=>{
  return requests.post('/cart/add',params)
}
//获取购物车的数据
export const reqGetCartdata=()=>{
  return requests.get('/cart/index')
}
//修改选中栏的状态
export const reqChangeChecked=(params)=>{
  return requests.post('/cart/checked',params)
}
//步进器
export const reqUpdataComputedMath=(params)=>{
  return requests.post('/cart/update',params)
}
//删除购物车列表
export const reqDeleteCartList=(params)=>{
  return requests.post('/cart/delete',params)
}
