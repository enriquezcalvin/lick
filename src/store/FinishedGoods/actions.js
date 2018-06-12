import Vue from 'vue'
import {date} from 'quasar'
export const createFinishedGoods = ({commit}, payload) => {
  Vue.prototype.$firestore.collection('finished-goods').add(payload)
    .catch((error) => {
      console.log(error)
    })
    .then((docRef) => {
      commit('addFinishedGood', {id: docRef.id, ...payload})
    })
}

export const updateFinishedGoods = ({commit}, payload) => {
  let currentMaterial = Vue.prototype.$firestore.collection('finished-goods').doc(payload.id)
  let {id, dateUpdated, ...item} = payload
  currentMaterial.update({
    ...item,
    dateUpdated: Date.now()
  })
    .catch((error) => {
      console.log(error)
    })
    .then((docRef) => {
      commit('editFinishedGood', payload)
    })
}

export const loadFinishedGoods = async ({commit}, payload) => {
  Vue.prototype.$firestore.collection('finished-goods').get()
    .then((data) => {
      const items = []
      data.forEach(function (doc) {
        let {expiryDate, deliveryDate, ...item} = doc.data()
        let itemExpiryDate = date.formatDate(doc.data().expiryDate, 'MMM-DD-YYYY')
        let itemDeliveryDate = date.formatDate(doc.data().deliveryDate, 'MMM-DD-YYYY')
        console.log(item)
        items.push({
          id: doc.id,
          ...item,
          expiryDate: itemExpiryDate,
          deliveryDate: itemDeliveryDate
        })
      })
      console.log(items)
      commit('setFinishedGoods', items)
    })
    .catch((error) => {
      console.log(error)
    })
}

export const deleteFinishedGoods = async ({commit}, payload) => {
  Vue.prototype.$firestore.collection('finished-goods').doc(payload).delete()
    .then((data) => {
      commit('deleteFinishedGood', payload)
    })
    .catch((error) => {
      console.log(error)
    })
}
