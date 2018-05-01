export const setPackagingMaterials = (state, payload) => {
  state.packagingMaterials = payload
}

export const addPackagingMaterial = (state, payload) => {
  state.packagingMaterials.push(payload)
}
