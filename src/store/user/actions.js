import firebase from 'firebase'

export const signUserIn = ({commit}, payload) => {
  firebase.auth().signInWithEmailAndPassword(payload.username, payload.password)
    .then(
      user => {
        const newUser = {
          id: user.uid
        }
        commit('user/setUser', newUser)
      }
    )
    .catch(error => console.log(error))
}
