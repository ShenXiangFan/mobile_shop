<template>
    <div>
      <!-- 搜索区域 -->
      <van-search v-model="searchValue" disabled shape="round"
       background="#fff"  placeholder="请输入搜索关键词" @click="gotoPupup"/>
      <!-- 轮播图区域 -->
      <van-swipe :autoplay="3000" indicator-color="blue">
        <van-swipe-item v-for="item in homeInfo.banner" :key="item.id">
          <img :src="item.image_url" style="width:100%;display:block;">
        </van-swipe-item>
      </van-swipe>
      <Channel :channel="channel"></Channel>
      <Manufacturer :brandList="brandList"></Manufacturer>
      <transition name="van-slide-right">     
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Channel from './Channel'
import Manufacturer from './Manufacturer'
export default {
  name:'Home',
  data(){
    return{
      searchValue:'',
      //品牌制造商
      brandList:[],
      //种类
      categoryList:[],
      channel:[]
    }
  },
  components:{
    Channel,
    Manufacturer
  },
  methods:{
    // 获取home信息
    getHomeInfo(){
      this.$store.dispatch('homeInfo')
    },
    // 跳转popup页面
    gotoPupup(){
      this.$router.push({name:'MyPopup'})
    }
  },
  computed:{
    ...mapState({
      homeInfo:function(state){
        let {categoryList,channel,brandList} = state.home.homeInfo
        this.categoryList =categoryList
        this.brandList =brandList
        this.channel = channel
        return state.home.homeInfo
      }
    })
  },
  created(){
    this.getHomeInfo()
  }
}
</script>

<style lang="less" scoped>
// .slide-enter,.slide-leave-to{
//   right: -100%;
// }
// .slide-enter-active,.slide-leave-active{
//   transition: right 1s;
// }
// .slide-enter-to,.slide-leave{
//   right: 0;
// }
</style>