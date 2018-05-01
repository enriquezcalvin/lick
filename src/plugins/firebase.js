import firebase from 'firebase'
require('firebase/firestore')

var config = {
  apiKey: 'AIzaSyCmiCdcvjXkQzUzOvNTgGtenTDEW5lE8rE',
  authDomain: 'lick-584a2.firebaseapp.com',
  databaseURL: 'https://lick-584a2.firebaseio.com',
  projectId: 'lick-584a2',
  storageBucket: 'lick-584a2.appspot.com',
  messagingSenderId: '704041504686'
}

export const fireApp = firebase.initializeApp(config)

export const DB = fireApp.database()
export const AUTH = fireApp.auth()
export const STORAGE = fireApp.storage()
export const FIRESTORE = fireApp.firestore()

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$auth = AUTH
  Vue.prototype.$db = DB
  Vue.prototype.$storage = STORAGE
  Vue.prototype.$firestore = FIRESTORE
}
