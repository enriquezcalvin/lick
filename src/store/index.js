import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import RawMaterials from './RawMaterials'
import PackagingMaterials from './PackagingMaterials'
import OtherMaterials from './OtherMaterials'
import Suppliers from './Suppliers'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    RawMaterials,
    PackagingMaterials,
    OtherMaterials,
    Suppliers
  }
})

export default store
