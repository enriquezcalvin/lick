import firebase from 'firebase'

export const createItem = ({commit}, payload) => {
  const item = {
    type: payload.type,
    SKU: payload.SKU,
    description: payload.description
  }
  firebase.database().ref('items').push(item)
    .then((data) => {
      console.log(data)
      commit('addItem', item)
    })
    .catch((error) => console.log(error))
}

export const loadItems = ({commit}) => {
  firebase.database().ref('items').once('value')
    .then((data) => {
      const items = []
      const obj = data.val()
      for (let key in obj) {
        items.push({
          id: key,
          type: obj[key].type,
          description: obj[key].description,
          SKU: obj[key].SKU
        })
      }
      commit('loadItems', items)
    })
}
