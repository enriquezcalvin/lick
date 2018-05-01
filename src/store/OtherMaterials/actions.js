import Vue from 'vue'

export const createOtherMaterial = ({commit}, payload) => {
  Vue.prototype.$firestore.collection('other-materials').add(payload)
    .catch((error) => {
      console.log(error)
    })
    .then((docRef) => {
      commit('addOtherMaterial', {id: docRef.id, ...payload})
    })
}

export const loadOtherMaterials = async ({commit}, payload) => {
  Vue.prototype.$firestore.collection('other-materials').get()
    .then((data) => {
      const materials = []
      data.forEach(function (doc) {
        materials.push({
          id: doc.id,
          ...doc.data()
        })
      })
      commit('setOtherMaterials', materials)
    })
    .catch((error) => {
      console.log(error)
    })
}
