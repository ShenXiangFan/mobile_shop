<template>
    <div class="channel">
      <van-grid :column-num="5">
        <van-grid-item
          :text="item.name"
          :icon="item.icon_url"
          v-for="item in channel"
          :key="item.id"
        >
        </van-grid-item>
      </van-grid>
    </div>
</template>

<script>
export default {
  name: "Channel",
  props: ["channel"],
};
</script>

<style scoped lang="less">
</style>