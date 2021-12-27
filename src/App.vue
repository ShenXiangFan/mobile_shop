<template>
  <div>
    <router-view></router-view>
    <Layout v-if="$route.meta.showTab"></Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'
export default {
  name: 'App',
  components:{
    Layout
  }
}
</script>

<style>
</style>
