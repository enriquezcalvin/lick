import firebase from 'firebase'

export const createRawMaterial = ({commit}, payload) => {
  firebase.database().ref('raw-materials').push(payload)
    .catch((error) => {
      console.log(error)
    })
    .then((data) => {
      console.log(data)
    })
}

export const loadRawMaterials = ({commit}, payload) => {
  firebase.database().ref('raw-materials').once('value')
    .then((data) => {
      const materials = []
      const obj = data.val()
      for (let key in obj) {
        materials.push({
          id: key,
          code: obj[key].code,
          name: obj[key].name,
          lot: obj[key].lot,
          quantity: obj[key].quantity,
          unit: obj[key].unit,
          supplier: obj[key].supplier,
          vat: obj[key].vat,
          purchaseDate: obj[key].purchaseDate,
          purchaseOrderNo: obj[key].purchaseOrderNo,
          unitCost: obj[key].unitCost,
          totalAmount: obj[key].totalAmount
        })
      }
      commit('setRawMaterials', materials)
    })
    .catch((error) => {
      console.log(error)
    })
}
