import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import myPopup from './myPopup'
Vue.use(Vuex)
const store =new Vuex.Store({
  modules:{
    home,
    myPopup
  }
})
export default store