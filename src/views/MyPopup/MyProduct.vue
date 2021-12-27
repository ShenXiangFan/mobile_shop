<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled/>
      <van-dropdown-item title="价格" v-model="priceVal" :options="priceOrder" @change="priceChange"/>
      <van-dropdown-item title="分类" v-model="categoryVal" :options="filterCategory" @change="categoryChange"/>
    </van-dropdown-menu>
    <Production v-if="goodsList.length!=0" :goodsList="goodsList"></Production>
    <van-empty v-else image="search" description="搜索产品不存在" />
  </div>
</template>

<script>
export default {
  name:'MyProduct',
  props:['filterCategory','goodsList'],
  data(){
    return{
      priceVal: 0,
      //分类下来列表的当前项
      categoryVal: 1005000,
      priceOrder: [
        { text: '价格升序', value: 'asc'},
        { text: '价格降序', value: 'desc' },
      ],
    }
  },
  mounted(){
    this.filterCategory.filter(item=>{
      if(item.checked===true){
        this.categoryVal=item.value
      }
    })
  },
  methods:{
    categoryChange(value){
      this.$emit('categoryChange',value)
    },
    priceChange(value){
      this.$emit('priceChange',value)
    }
  }
}
</script>

<style>

</style>