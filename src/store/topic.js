import { reqTopicData } from "@/api/index"
const actions={
  async topicData(context,value){
    let result = await reqTopicData(value)
    console.log(result)
    context.commit('TOPICDATA',result.data)
  }
}
const mutations={
  TOPICDATA(state,value){
    state.topicInfo=value
  }
}
const state={
   topicInfo:{}
}
const getters={

}
export default{
  actions,
  mutations,
  state,
  getters
}