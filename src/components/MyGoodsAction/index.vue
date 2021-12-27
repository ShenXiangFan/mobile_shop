<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon :icon="collect===true?'star':'star-o'" :text="collect===true?'已收藏':'未收藏'" :color="collect===true?'#ff5000':'#777'" 
      @click="collectionBtn"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="badge"/>
      <van-goods-action-button type="danger" text="立即购买" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCartHandler"/>
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name:'MyGoodsAction',
  data(){
    return{
    collect:false,
    badge:0
    }
  },
  methods:{
    collectionBtn(){
      this.collect=!this.collect
    },
    addCartHandler(){
      // 加入购物车
      this.$emit('addCart')
    },
      //获取购物车数量
    async getGoodsNumber(){
      let result = await this.$API.reqGetGoodsNumber()
      if(result.errno===0){
        this.badge=result.data.cartTotal.goodsCount
      }
    }
  },
  mounted(){
    this.getGoodsNumber()
    this.$bus.$on('changeCartNumber',(value)=>{
      this.badge=value
    })
  }
}
</script>

<style>

</style>