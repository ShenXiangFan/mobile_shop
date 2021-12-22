<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search">专题</van-tabbar-item>
      <van-tabbar-item icon="friends-o">分类</van-tabbar-item>
      <van-tabbar-item icon="setting-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name:'Layout',
  data(){
    return {
      active:0
    }
  }
}
</script>

<style scoped lang="less">

</style>