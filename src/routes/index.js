import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    //home组件
    {path:'/home',component:()=>import('@/views/Home.vue')},
    {path:'*',redirect:'/home'},
    {path:'/topic',component:()=>import('@/views/Topic.vue')},
    {path:'/mine',component:()=>import('@/views/Mine.vue')},
    {path:'/search',component:()=>import('@/views/Search.vue')},
  ]
})
export default router