export const setOtherMaterials = (state, payload) => {
  state.otherMaterials = payload
}

export const addOtherMaterial = (state, payload) => {
  state.otherMaterials.push(payload)
}
