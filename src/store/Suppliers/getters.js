export const getSuppliers = (state) => {
  return state.suppliers
}

export const getSupplierList = (state) => {
  return state.suppliers.map(item => {
    return {
      label: item.name,
      value: item.id
    }
  })
}
