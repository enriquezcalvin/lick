import Vue from 'vue'
import {date} from 'quasar'
export const loadDummy = ({commit}, payload) => {
  const materials = [
    {
      code: 'ABC',
      name: 'sugar',
      totalQuantity: '21',
      items: [
        {
          lot: 'omg',
          quantity: '10',
          unit: 'kg',
          supplier: 'supplier 1',
          vat: true,
          purchaseDate: 'Jan 1 1923',
          purchaseOrderNo: 'PO123',
          unitCost: '10.5',
          totalAmount: '105'
        },
        {
          lot: 'omg1',
          quantity: '11',
          unit: 'kg',
          supplier: 'supplier 2',
          vat: true,
          purchaseDate: 'Jan 1 1944',
          purchaseOrderNo: 'PO124',
          unitCost: '11',
          totalAmount: '121'
        }
      ]
    }
  ]
  console.log(materials)
  commit('setRawMaterials', materials)
}

export const createRawMaterial = ({commit}, payload) => {
  Vue.prototype.$firestore.collection('raw-materials').add(payload)
    .catch((error) => {
      console.log(error)
    })
    .then((docRef) => {
      commit('addRawMaterial', {id: docRef.id, ...payload})
    })
}

export const loadRawMaterials = async ({commit}, payload) => {
  Vue.prototype.$firestore.collection('raw-materials').get()
    .then((data) => {
      const materials = []
      data.forEach(function (doc) {
        let {purchaseDate, ...material} = doc.data()
        let materialPurchaseDate = date.formatDate(doc.data().purchaseDate, 'MMM-DD-YYYY')
        console.log(material, materialPurchaseDate)
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
