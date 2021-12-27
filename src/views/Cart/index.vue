<template>
  <div>
    <Tips></Tips>
    <!-- 购物车中间商品信息 -->
    <van-checkbox-group v-model="result" :disabled="isClick">
      <van-checkbox
        @click="changeCheck(item)"
        :name="item.product_id"
        v-for="item in cartList"
        :key="item.id"
      >
        <van-swipe-cell>
          <van-card
            :num="item.number"
            :price="item.market_price.toFixed(2)"
            :title="item.goods_name"
            :thumb="item.list_pic_url"
          />
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="deleteButton(item)"
            />
          </template>
        </van-swipe-cell>
        <!-- 步进器 -->
        <van-stepper
          @change="UpdataComputedMath(item)"
          v-model="item.number"
          v-show="isClick ? true : false"
        />
      </van-checkbox>
    </van-checkbox-group>
    <!-- 底部 -->
    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll" :disabled="isClick">全选</van-checkbox>
      <template #tip>
        累计共{{ cartTotal.checkedGoodsCount }}件商品,可点击
        <van-button
          :type="isClick ? 'danger' : 'primary'"
          size="mini"
          @click="isClick = !isClick"
          >{{ isClick ? "完成编辑" : "编辑" }}</van-button
        >按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      //种类列表
      cartList: [],
      cartTotal: {},
      //选中的列表
      result: [],
      //所有产品的id
      all_product_id: [],
      isClick: false,
    };
  },
  methods: {
    // 获取购物车数据
    async getCartData() {
      const result = await this.$API.reqGetCartdata();
      if (result.errno === 0) {
        this.cartList = result.data.cartList;
        this.cartTotal = result.data.cartTotal;
        console.log("cartList", this.cartList);
        console.log("cartTotal", this.cartTotal);
        this.result = [];
        this.cartList.forEach((item) => {
          //为全选做准备
          this.all_product_id.push(item.product_id);
          if (item.checked === 1) {
            this.result.push(item.product_id);
          }
        });
      }
    },
    //购物车提交
    onClickEditAddress() {},
    onSubmit() {},
    // 改变选中栏目的状态
    async changeCheck(item) {
      //修改选中栏目的状态
      if (this.isClick === true) {
        return (item.checked = item.checked);
      } else {
        const result = await this.$API.reqChangeChecked({
          isChecked: item.checked === 1 ? 0 : 1,
          productIds: item.product_id.toString(),
        });
        if (result.errno === 0) {
          console.log(result.data);
          this.$toast("修改成功");
          this.getCartData();
        }
      }
    },
    async UpdataComputedMath(item) {
      let result = await this.$API.reqUpdataComputedMath({
        goodsId: item.goods_id,
        id: item.id,
        number: item.number,
        productId: item.product_id,
      });
      if (result.errno === 0) {
        this.$toast("修改成功");
        this.getCartData();
      }
    },
    async deleteButton(item){
      let result = await this.$API.reqDeleteCartList({productIds:item.product_id.toString()})
      if(result.errno === 0 ){
        this.$toast.success('删除成功')
        this.getCartData()
      }
    }
  },
  computed: {
    checkedAll: {
      get() {
        return this.result.length === this.cartList.length ? true : false;
      },
      async set(val) {
        let all_product_id_str = this.all_product_id.join(",");
        let result = await this.$API.reqChangeChecked({
          isChecked: val === true ? 1 : 0,
          productIds: all_product_id_str,
        });
        if (result.errno === 0) {
          this.$toast("修改成功");
          this.getCartData();
        }
      },
    },
  },
  mounted() {
    this.getCartData();
  },
};
</script>

<style scoped lang="less">
.van-checkbox {
  padding: 10px 4%;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  /deep/.van-checkbox__label {
    flex: 1;
  }
}
.van-submit-bar {
  bottom: 50px;
}
.van-stepper {
  text-align: right;
}
.van-button--normal{
  height: 100%;
}
</style>