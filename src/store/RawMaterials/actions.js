import Vue from 'vue'
import {date} from 'quasar'
export const createRawMaterial = ({commit}, payload) => {
  Vue.prototype.$firestore.collection('raw-materials').add(payload)
    .catch((error) => {
      console.log(error)
    })
    .then((docRef) => {
      commit('addRawMaterial', {id: docRef.id, ...payload})
    })
}

export const updateRawMaterial = ({commit}, payload) => {
  let currentMaterial = Vue.prototype.$firestore.collection('raw-materials').doc(payload.id)
  let {id, dateUpdated, ...item} = payload
  currentMaterial.update({
    ...item,
    dateUpdated: Date.now()
  })
    .catch((error) => {
      console.log(error)
    })
    .then((docRef) => {
      commit('editRawMaterial', payload)
    })
}

export const loadRawMaterials = async ({commit}, payload) => {
  Vue.prototype.$firestore.collection('raw-materials').get()
    .then((data) => {
      const materials = []
      data.forEach(function (doc) {
        let {purchaseDate, ...material} = doc.data()
        let materialPurchaseDate = date.formatDate(doc.data().purchaseDate, 'MMM-DD-YYYY')
        materials.push({
          id: doc.id,
          ...material,
          purchaseDate: materialPurchaseDate
        })
      })
      commit('setRawMaterials', materials)
    })
    .catch((error) => {
      console.log(error)
    })
}

export const deleteRawMaterial = async ({commit}, payload) => {
  Vue.prototype.$firestore.collection('raw-materials').doc(payload).delete()
    .then((data) => {
      commit('deleteRawMaterial', payload)
    })
    .catch((error) => {
      console.log(error)
    })
}
