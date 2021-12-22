import {reqHomeInfo} from '@/api/index'
const actions={
  async homeInfo(context,value){
    const result = await reqHomeInfo()
    context.commit('HOMEINFO',result.data)
  }
}
const mutations={
  HOMEINFO(state,value){
    state.homeInfo=value
  }
}
const state={
  homeInfo:{}
}
const getters={
}
export default{
  actions,
  mutations,
  state,
  getters
}