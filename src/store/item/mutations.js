export const addItem = (state, payload) => {
  state.items.push(payload)
}

export const loadItems = (state, payload) => {
  state.items = payload
}
