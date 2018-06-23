import Vue from 'vue'
import {date} from 'quasar'

// axios version
export const createRawMaterial = ({commit}, payload) => {
  Vue.prototype.$axios.post('/api/inventory/rawMaterials', payload)
    .catch((error) => {
      console.log(error)
    })
    .then((result) => {
      commit('addRawMaterial', {id: result.id, ...payload})
    })
}

// firebase version
// export const createRawMaterial = ({commit}, payload) => {
//   Vue.prototype.$firestore.collection('raw-materials').add(payload)
//     .catch((error) => {
//       console.log(error)
//     })
//     .then((docRef) => {
//       commit('addRawMaterial', {id: docRef.id, ...payload})
//     })
// }

export const updateRawMaterial = ({commit}, payload) => {
  Vue.prototype.$axios.put('/api/inventory/rawMaterials/' + payload.id, payload)
    .catch((error) => {
      console.log(error)
    })
    .then((docRef) => {
      commit('editRawMaterial', payload)
    })
  // let currentMaterial = Vue.prototype.$firestore.collection('raw-materials').doc(payload.id)
  // let {id, dateUpdated, ...item} = payload
  // currentMaterial.update({
  //   ...item,
  //   dateUpdated: Date.now()
  // })
  //
}

export const loadRawMaterials = async ({commit}, payload) => {
  Vue.prototype.$axios.get('/api/inventory/rawMaterials')
    .catch((error) => {
      console.log(error)
    })
    .then((result) => {
      const materials = []
      result.data.forEach(function (doc) {
        let {purchaseDate, ...material} = doc
        let materialPurchaseDate = date.formatDate(purchaseDate, 'MMM-DD-YYYY')
        materials.push({
          ...material,
          purchaseDate: materialPurchaseDate
        })
      })
      commit('setRawMaterials', materials)
    })
  // firebase
  // Vue.prototype.$firestore.collection('raw-materials').get()
  //   .then((data) => {
  //     const materials = []
  //     data.forEach(function (doc) {
  //       let {purchaseDate, ...material} = doc.data()
  //       let materialPurchaseDate = date.formatDate(doc.data().purchaseDate, 'MMM-DD-YYYY')
  //       materials.push({
  //         id: doc.id,
  //         ...material,
  //         purchaseDate: materialPurchaseDate
  //       })
  //     })
  //     commit('setRawMaterials', materials)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
}

export const deleteRawMaterial = async ({commit}, payload) => {
  Vue.prototype.$axios.delete('/api/inventory/rawMaterials/' + payload)
    .then((data) => {
      commit('deleteRawMaterial', payload)
    })
    .catch((error) => {
      console.log(error)
    })
  // Vue.prototype.$firestore.collection('raw-materials').doc(payload).delete()
  //   .then((data) => {
  //     commit('deleteRawMaterial', payload)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
}
