import { groupByNameAndCode } from '../../helpers/groupBy'

export const getPackagingMaterials = (state) => {
  return groupByNameAndCode(state.packagingMaterials)
}
