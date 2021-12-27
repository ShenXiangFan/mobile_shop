import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push方法
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    originPush.call(this, location, reslove, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
//重写replace方法
VueRouter.prototype.replace = function (location, reslove, reject) {
  if (reslove && reject) {
    originReplace.call(this, location, reslove, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}
const router = new VueRouter({
  routes: [
    // home组件
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: () => import('@/views/Home/index.vue'),
      children:[{path:'popup',name:'MyPopup',component:()=>import('@/views/MyPopup/index.vue')}],meta:{num:0,showTab:true}
    },
    {path:'/topic',name:'topic',component:()=>import('@/views/Topic/index.vue'),meta:{num:1,showTab:true}},
    {path:'/category',name:'category',component:()=>import('@/views/Category/index.vue'),meta:{num:2,showTab:true}},
    {path:'/cart',name:'cart',component:()=>import('@/views/Cart/index.vue'),meta:{num:3,showTab:true}},
    {path:'/user',name:'user',component:()=>import('@/views/User/index.vue'),meta:{num:4,showTab:true}},
    {path:'/productdetail/:goodsId',name:'ProductDetail',component:()=>import('@/views/ProductDetail/'),meta:{num:4}}
  ]
})
// 设置拦截器
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  let token = sessionStorage.getItem('token')
  if(to.path==='/cart'){
    if(!token){
      //token不存在
      Vue.prototype.$toast('请登录')
      setTimeout(()=>{
        next('/home')
      },1000)
    }else{
      next()
    }
  }else{
    next()
  }
})
export default router