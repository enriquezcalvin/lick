export const setRawMaterials = (state, payload) => {
  state.rawMaterials = payload
}

export const addRawMaterial = (state, payload) => {
  state.rawMaterials.push(payload)
}

export const deleteRawMaterial = (state, payload) => {
  let index = state.rawMaterials.findIndex((a) => a.id === payload)
  state.rawMaterials.splice(index, 1)
}
