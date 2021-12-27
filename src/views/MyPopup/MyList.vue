<template>
  <div>
    <van-list :finished="finished" finished-text="没有更多了">
      <van-cell v-for="(item,index) in arr" :key="index" :title="item" @click="cellClick (item)"/>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "MyList",
  props:['arr'],
  data(){
    return{
      finished:true
    }
  },
  methods:{
    cellClick(item){
      this.$emit('cellHandler',item)
    }
  },
  mounted(){
    console.log(this.iptValue)
  }
};
</script>

<style>
</style>