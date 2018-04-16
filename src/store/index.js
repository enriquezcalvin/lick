import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import RawMaterials from './RawMaterials'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    RawMaterials
  }
})

export default store
