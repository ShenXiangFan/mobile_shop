<template>
  <div class="brandList">
    <div class="brandListFont">
      <span>品牌制造商直供</span>
    </div>
    <van-grid :column-num="2" :gutter="5">
      <van-grid-item v-for="item in brandList" :key="item.id" :text="item.name">
        <van-image :src="item.app_list_pic_url"/>
        <div class="fontStyle">
          <p>{{item.name}}</p>
          <p style="color:red;">{{item.floor_price | filterMoney}}</p>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name:'Manufacturer',
  props:['brandList']
}
</script>

<style scoped lang="less">
.brandList{
  margin-top: 20px;
  text-align: center;
  background-color: #fff;
  .brandListFont{
    line-height: 40px;
  }
  .fontStyle{
    text-align: left;
    font-size: 12px;
    position: absolute;
    left: 0px;
    top: 0px;
  }
}
</style>