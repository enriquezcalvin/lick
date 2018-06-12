export const groupByNameAndCode = (materials) => {
  let result = []
  let prevElement = {}
  let sorted = materials.sort((a, b) => a.code > b.code)
  sorted.forEach(element => {
    if (prevElement.name === element.name && prevElement.code === element.code) { // if same
      result[(result.length - 1)].totalQuantity += parseFloat(element.quantity)
      result[(result.length - 1)].items.push(element)
    } else { // if not the same
      result.push({
        name: element.name,
        code: element.code,
        SKU: element.SKU,
        totalQuantity: parseFloat(element.quantity),
        items: []
      })
      result[(result.length - 1)].items.push(element)
      prevElement.name = element.name
      prevElement.code = element.code
    }
  })
  return result
}

export const groupByNameAndCodeGoods = (materials) => {
  let result = []
  let prevElement = {}
  let sorted = materials.sort((a, b) => a.code > b.code)
  sorted.forEach(element => {
    if (prevElement.name === element.name && prevElement.code === element.code) { // if same
      result[(result.length - 1)].totalQuantity += parseFloat(element.quantity)
      result[(result.length - 1)].items.push(element)
    } else { // if not the same
      result.push({
        name: element.name,
        code: element.code,
        item_sku: element.item_sku,
        box_sku: element.box_sku,
        unit: element.unit,
        unitCost: element.unitCost,
        totalQuantity: parseFloat(element.quantity),
        items: []
      })
      result[(result.length - 1)].items.push(element)
      prevElement.name = element.name
      prevElement.code = element.code
    }
  })
  return result
}
