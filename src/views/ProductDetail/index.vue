<template>
  <div>
    <!-- 轮播图区域 -->
    <van-swipe :autoplay="3000" indicator-color="darkred">
      <van-swipe-item v-for="image in goodsData.gallery" :key="image.id">
        <img :src="image.img_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品退换信息区域 -->
    <Tips></Tips>
    <div class="info">
      <h3>{{ info.name }}</h3>
      <p>{{ info.goods_brief }}</p>
      <div>{{ info.retail_price | filterMoney }}</div>
    </div>
    <van-cell title="展示内容" is-link class="showSku" @click="showGoodsInfo" />
    <!-- 商品参数区域 -->
    <div class="goodsAttribute">
      <h3>商品参数</h3>
      <ul>
        <li v-for="(item, index) in attribute" :key="index">
          <van-row>
            <van-col span="4">{{ item.name }}</van-col>
            <van-col span="1"></van-col>
            <van-col span="19">{{ item.value }}</van-col>
          </van-row>
        </li>
      </ul>
    </div>
    <!-- 商品图片区域 -->
    <div class="box" v-html="info.goods_desc">
      <div class="title">
        <span>常见问题</span>
      </div>
      <ul class="issue">
        <li v-for="item in issue" :key="item.id">
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </li>
      </ul>
    </div>

    <div class="box">
      <div class="title">
        <span>大家都在看</span>
        <Production :goodsList="goodsList" />
      </div>
    </div>
    <!-- sku区域 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      ref="sku"
    />
    <MyGoodsAction @addCart="addCart"></MyGoodsAction>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",
  data() {
    return {
      goodsData: {},
      gallery: {},
      info: {},
      attribute: [],
      issue: [],
      goodsList: [],
      show:false,
      productId:'',
      sku:{
        tree:[],
        hide_stock:false,
        price:'',
        stock_num:0
      },
      goods:{
        picture:'',
      },
      productList:[]
    };
  },
  methods: {
    async getGoodsDetailInfo() {
      let id = this.$route.params.goodsId;
      const result = await this.$API.reqGoodsDetail({ id });
      if (result.errno === 0) {
        console.log(result.data);
        this.goodsData = result.data;
        let { gallery, info, attribute, issue,productList } = result.data;
        this.gallery = gallery;
        this.info = info;
        this.attribute = attribute;
        this.issue = issue;
        this.goods.picture=info.list_pic_url;
        this.sku.price=info.retail_price
        this.sku.stock_num=info.goods_number
        this.productId=info.category_id
        this.productList=productList
      }
    },
    //获取相关产品
    async relativeGoods() {
      let id = this.$route.params.goodsId;
      const result = await this.$API.reqRelativeGoods({ id });
      if (result.errno === 0) {
        this.goodsList = result.data.goodsList;
        console.log("relativeGoods", this.goodsList);
      }
    },
    // 展示商品信息
    showGoodsInfo(){
      this.show=true
    },
    // 添加购物车
    async addCart(){
      if(this.show===true){
        this.$toast('添加购物车')
        let num = this.$refs.sku.getSkuData().selectedNum
        let result = await this.$API.reqAddCart({goodsId:this.$route.params.goodsId,
        productId:this.productList[0].id,number:num
        })
        console.log(result.data.cartTotal.goodsCount)
        this.$bus.$emit('changeCartNumber',result.data.cartTotal.goodsCount)
        //sku栏取消
        this.$refs.sku.resetSelectedSku()
        this.show=false
        setTimeout(()=>{
          this.$router.push('/cart')
        },1000)
      }else{
        this.show=true
      }
    }
  },
  mounted() {
    this.getGoodsDetailInfo();
    // 相关产品列表
    this.relativeGoods();
  },
};
</script>

<style lang="less">
img {
  width: 100%;
  display: block;
}
.info {
  padding: 15px;
  text-align: center;
  background-color: #fff;
  h3 {
    font-weight: normal;
    font-size: 20px;
    margin: 5px auto;
    line-height: 50px;
  }
  p {
    color: #999;
    font-size: 12px;
    line-height: 30px;
  }
  div {
    color: darkred;
    font-size: 10px;
    line-height: 30px;
  }
}
.showSku {
  margin-bottom: 20px;
  border-top: #333 1px solid;
}
.goodsAttribute {
  background-color: #fff;
  h3 {
    font-weight: normal;
    font-size: 20px;
    line-height: 50px;
  }
  ul {
    li {
      width: 90%;
      background-color: rgb(240, 225, 225);
      line-height: 30px;
      text-align: center;
      margin: 0 auto 20px;
      border-radius: 5px;
      .van-col {
        font-size: 10px;
        color: #333;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:last-child {
          text-align: left;
          font-size: 15px;
          color: rgb(24, 18, 18);
        }
      }
    }
  }
}
.box {
  width: 100%;
  display: block;
}
.title {
  width: 100%;
  background: #fff;
  height: 50px;
  position: relative;
  &::before {
    content: "";
    width: 50%;
    height: 2px;
    background: #ccc;
    // 指定位置
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25%;
  }
  span {
    width: 30%;
    height: 50px;
    line-height: 50px;
    position: relative;
    display: block;
    text-align: center;
    margin: 0 auto;
    background-color: #fff;
  }
}
.issue {
  background-color: #fff;
  padding: 0 4%;
  h3 {
    font-weight: normal;
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    position: relative;
    padding-left: 20px;
    &::before {
      content: "";
      height: 4px;
      width: 4px;
      background: darkred;
      display: inline-block;
      text-align: center;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -2px;
    }
  }
  p {
    font-size: 8px;
    color: rgb(172, 168, 168);
    padding-left: 20px;
  }
}
.van-goods-action{
  z-index: 9999;
}
.van-sku-container{
  min-height: auto;
}
</style>   