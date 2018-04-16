import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import item from './item'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    item
  }
})

export default store
