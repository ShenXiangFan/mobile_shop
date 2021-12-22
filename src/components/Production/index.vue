<template>
  <div>
    <!-- v-for="item in popupInfo" :key="item." -->
    <ul>
      <li v-for="item in goodsList" :key="item.id">
        <img :src="item.list_pic_url">
        <div class="van-ellipsis">{{item.name}}</div>
        <div class="price">{{item.retail_price | filterMoney}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Production',
  props:['goodsList'],
}
</script>

<style scoped lang="less">
  ul{
    padding: 20px 2%;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    li{
      width: 48%;
      margin-bottom: 10px;
      background-color: #fff;
      line-height: 15px;
      text-align: center;
      img{
        width:100%;
      }
      .price{
        color: darkred;
      }
    }
  }
</style>