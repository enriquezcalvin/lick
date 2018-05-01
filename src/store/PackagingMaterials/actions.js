import Vue from 'vue'

export const createPackagingMaterial = ({commit}, payload) => {
  Vue.prototype.$firestore.collection('packaging-materials').add(payload)
    .catch((error) => {
      console.log(error)
    })
    .then((docRef) => {
      commit('addPackagingMaterial', {id: docRef.id, ...payload})
    })
}

export const loadPackagingMaterials = async ({commit}, payload) => {
  Vue.prototype.$firestore.collection('packaging-materials').get()
    .then((data) => {
      const materials = []
      data.forEach(function (doc) {
        materials.push({
          id: doc.id,
          ...doc.data()
        })
      })
      commit('setPackagingMaterials', materials)
    })
    .catch((error) => {
      console.log(error)
    })
}
