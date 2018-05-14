export const setSuppliers = (state, payload) => {
  state.suppliers = payload
}

export const addSupplier = (state, payload) => {
  state.suppliers.push(payload)
}

export const deleteSupplier = (state, payload) => {
  let index = state.suppliers.findIndex((a) => a.id === payload)
  state.suppliers.splice(index, 1)
}
