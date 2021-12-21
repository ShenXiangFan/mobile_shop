<template>
    <div>
      <router-link to="/home">首页</router-link>
      <router-link to="/topic">榜单</router-link>
      <router-link to="/mine">我的</router-link>
      <router-link to="/search">搜索</router-link>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name:'Home'
}
</script>

<style>

</style>