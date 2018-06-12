import Vue from 'vue'
export const loadDummy = ({commit}, payload) => {
  const suppliers = [
    {
      name: 'Supplier 1',
      address: 'Address of Supplier XXX',
      contact_person: 'Supplier Contact',
      number: [
        '12345678'
      ],
      email: [
        'test@test.com'
      ]
    }
  ]
  commit('setSuppliers', suppliers)
}

export const createSupplier = ({commit}, payload) => {
  Vue.prototype.$firestore.collection('suppliers').add(payload)
    .catch((error) => {
      console.log(error)
    })
    .then((docRef) => {
      commit('addSupplier', {id: docRef.id, ...payload})
    })
}

export const loadSuppliers = async ({commit}, payload) => {
  Vue.prototype.$firestore.collection('suppliers').get()
    .then((data) => {
      const suppliers = []
      data.forEach(function (doc) {
        let supplier = doc.data()
        suppliers.push({
          id: doc.id,
          ...supplier
        })
      })
      commit('setSuppliers', suppliers)
    })
    .catch((error) => {
      console.log(error)
    })
}

export const deleteSuppliers = async ({commit}, payload) => {
  Vue.prototype.$firestore.collection('suppliers').doc(payload).delete()
    .then((data) => {
      commit('deleteSupplier', payload)
    })
    .catch((error) => {
      console.log(error)
    })
}
