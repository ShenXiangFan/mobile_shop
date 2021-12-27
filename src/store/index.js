import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import myPopup from './myPopup'
import topic from './topic'
import catalog from './catalog'
Vue.use(Vuex)
const store =new Vuex.Store({
  modules:{
    home,
    myPopup,
    topic,
    catalog
  }
})
export default store