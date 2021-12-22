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
    // {path:'/',redirect:'/home'}, 
    // {
    //   path: '/',
    //   component: () => import('@/views/Layout/index.vue'),
    //   children: [
    //     {
    //       path: '/home',
    //       component: () => import('@/views/Home.vue'),
    //       children:[
    //         {path:'popup',name:'MyPopup',component:()=>import('@/views/MyPopup/index.vue')}
    //       ]
    //     },
    //     { path: '/topic', component: () => import('@/views/Topic.vue') },
    //     { path: '/mine', component: () => import('@/views/Mine.vue') },
    //     { path: '/search', component: () => import('@/views/Search.vue') },
    //   ]
    // },
    // home组件
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: () => import('@/views/Home/index.vue'),
      children:[
        {path:'popup',name:'MyPopup',component:()=>import('@/views/MyPopup/index.vue')}
      ]
    }
  ]
})
export default router