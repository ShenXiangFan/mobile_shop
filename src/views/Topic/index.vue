<template>
  <div>
    <van-grid :border="false" :column-num="2" gutter:>
      <van-grid-item v-for="item in topicInfo.data" :key="item.id">
        <van-image :src="item.scene_pic_url" />
        <p>{{item.title}}</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Topic",
  data() {
    return {
      page: 1,
      size: 20,
    };
  },
  methods: {
    getTopicData() {
      this.$store.dispatch("topicData", { page: this.page, size: this.size });
    },
  },
  computed: {
    ...mapState({
      topicInfo: (state) => {
        return state.topic.topicInfo;
      },
    }),
  },
  mounted() {
    //获取专题页面数据
    this.getTopicData();
  },
};
</script>

<style>
</style>