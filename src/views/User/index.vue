<template>
  <div>
    <van-row>
      <van-col span="6">
        <img :src="avatarSrc" alt="" />
      </van-col>
      <van-col span="10" @click="clickLogin">{{nickName}}</van-col>
      <van-col span="8">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <!-- 弹出层 -->
    <van-popup v-model="showLoginBox">
      <van-form @submit="onSubmit">
        <van-field  v-model="username"  name="用户名"  label="用户名"  placeholder="用户名"  
        :rules="[{ required: true, message: '请填写用户名' }]"/>
        <van-field v-model="password"  type="password"  name="密码"
          label="密码"  placeholder="密码"  :rules="[{ required: true, message: '请填写密码' }]"/>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
    <!-- 宫格区域 -->
    <van-grid>
      <van-grid-item icon="photo-o" text="功能1" />
      <van-grid-item icon="photo-o" text="功能2" />
      <van-grid-item icon="photo-o" text="功能3" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      avatarSrc:require('@/assets/头像.jpg'),
      username:'',
      password:'',
      showLoginBox: false,
      nickName:'请登录'
    };
  },
  methods: {
    clickLogin() {
      let token = sessionStorage.getItem('token')
      if(token){
        return 
      }else{
        this.showLoginBox = true;
      }
    },
    async onSubmit(values){
     const result = await this.$API.reqUserLogin({username:values["用户名"],pwd:values["密码"]})
     if(result.errno === 0){
      let {token,userInfo} = result.data
      let newUserInfo = JSON.stringify(userInfo)
      sessionStorage.setItem('token',token)
      sessionStorage.setItem('userInfo',newUserInfo)
      this.nickName=userInfo.nickname
      this.showLoginBox=false
     }
    }
  },
  watch:{
    nickName:{
      immediate:true,
      handler(){
        let token =sessionStorage.getItem('token')
        if(token){
          let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
          this.nickName = userInfo.nickname
          this.avatarSrc=userInfo.avatar
        }
      }
    }
  }, 
};
</script>

<style lang="less" scoped>
.van-row {
  padding: 0.2rem 20px;
  background-color: #333;
  color: #fff;
  .van-col {
    line-height: 80px;
    img {
      width: 80px;
      border-radius: 50%;
      display: block;
    }
    &:last-child {
      text-align: right;
    }
  }
}
.van-popup{
  width: 80%;
}
</style>