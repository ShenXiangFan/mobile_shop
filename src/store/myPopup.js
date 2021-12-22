import {reqSearchData} from '@/api/'
const actions={
  async getInputValue(context,value){
   const result = await reqSearchData(value)
   if(result.errno === 0){
    let arr = JSON.parse(JSON.stringify(result.data.filterCategory).replace(/name/g, 'text').replace(/id/g, 'value'))
    result.data.filterCategory=arr
    context.commit('GETINPUTVALUE',result.data)
   }
  }
}
const mutations={
  GETINPUTVALUE(state,value){
    state.searchInfo=value
  }
}
const state={
  searchInfo:{}
}
const getters={

}
export default{
  actions,
  mutations,
  state,
  getters
}