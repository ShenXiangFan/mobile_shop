<template>
  <div class="popup">
    <!-- 弹出层页面 -->
    <form action="/">
      <van-search v-model="iptValue" show-action :placeholder="iptPlaceholder" @search="onSearch" @cancel="onCancel" @input="searchHandler"/>
      <HistoryAndHot  v-if="blockShow === 1"   @inputDefault="getInputInfo"></HistoryAndHot>
      <MyList v-else-if="blockShow===2" :arr="searchArr"></MyList>
      <MyProduct v-else :goodsList="popupInfo.goodsList" 
      :filterCategory="popupInfo.filterCategory" @categoryChange="changeCategory" @priceChange="changePrice"></MyProduct>
    </form>
  </div>
</template>

<script>
import {mapState } from "vuex";
import HistoryAndHot from "./HistoryAndHot.vue";
import MyProduct from "./MyProduct";
import MyList from "./MyList";
export default {
  name: "Popup",
  components: {
    HistoryAndHot,
    MyProduct,
    MyList
  },
  data() {
    return {
      iptPlaceholder: "",
      //1表示历史记录与热门搜索区域
      //2代表列表区块
      //3代表列表区
      blockShow: 1,
      //输入框输入的关键字
      iptValue: "",
      page:1,
      size:20,
      order:'desc',
      categoryId:'0',
      sort:'id',
      searchArr:[]
    };
  },
  methods: {
    //输入框的搜索方法
    onSearch() {
      this.$store.dispatch("getInputValue", {
        keyword:this.iptValue,
        page:this.page,
        size:this.size,
        order:this.order,
        categoryId:this.categoryId,
        sort:this.sort
        });
      this.blockShow=3
    },
    onCancel() {
      this.$router.go(-1);
    },
    getInputInfo(value) {
      this.iptPlaceholder = value;
    },
    changeCategory(value){
      this.categoryId=value
      console.log(value)
      this.onSearch()
    },
    changePrice(value){
      this.order=value
      this.sort='price'
      console.log(value)
      this.onSearch()
    },
    //输入框获取焦点
    async searchHandler(value){
      this.blockShow=2
      const result = await this.$API.reqIntimeSearchData({keyword:value})
      this.searchArr=result.data
    }
  },
  computed: {
    ...mapState({
      popupInfo: function(state){
        return state.myPopup.searchInfo;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.popup {
  height: 100%;
  width: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
  background: #efefef;
}
</style>