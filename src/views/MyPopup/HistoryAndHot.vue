<template>
  <div>
    <div class="history">
      <div class="top">
        <h3>历史记录</h3>
        <van-icon name="delete-o" />
      </div>
      <div class="down">
        <van-tag plain type="default" v-for="(item,index) in historyKeywordList" :key="index">{{item}}</van-tag>
      </div>
    </div>
    <div class="hot">
      <div class="top">
        <h3>热门搜索</h3>
      </div>
      <div class="down">
        <van-tag plain  v-for="(item,index) in hotKeywordList" 
        :key="index" :type="item.is_hot===1?'danger':'default'">{{item.keyword}}</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryAndHot",
  data(){
    return{
      defaultKeyword:{},
      historyKeywordList:[],
      hotKeywordList:[],
    }
  },
  methods:{
    // 获取搜索框数据
    async getSearchBoxInfo(){
      //发送axios请求
      const result = await this.$API.reqPopupBoxData()
      if(result.errno === 0){
        console.log(result.data)
        this.historyKeywordList=result.data.historyKeywordList
        this.hotKeywordList=result.data.hotKeywordList
        //子传递父
        this.$emit('inputDefault',result.data.defaultKeyword.keyword)
      }
    }
  },
  mounted(){
    this.getSearchBoxInfo()
  }
};
</script>

<style scoped lang="less">
.history {
  padding: 0 1.5%;
  background-color: #fff;
  .top {
    display: flex;
    justify-content: space-between;
    height: 50px;
    font-size: 20px;
    align-items: center;
    h3 {
      font-weight: normal;
    }
  }
  .down {
    .van-tag {
      font-size: 13px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
.hot {
  padding: 0 1.5%;
  background-color: #fff;
  margin-top: 20px;
  font-size: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    height: 50px;
    font-size: 20px;
    align-items: center;
    h3 {
      font-weight: normal;
    }
  }
  .down {
    .van-tag {
      font-size: 13px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
.active{
  border-color: red;
  color: red;
}
</style>