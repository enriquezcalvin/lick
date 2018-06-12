import { groupByNameAndCode } from '../../helpers/groupBy'

export const getRawMaterials = (state) => {
  return groupByNameAndCode(state.rawMaterials)
}

export const getRawMaterialList = (state) => {
  return state.rawMaterials.map(item => {
    return {
      label: item.name,
      code: item.code,
      value: item.id
    }
  })
}
