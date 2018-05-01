import { groupByNameAndCode } from '../../helpers/groupBy'

export const getRawMaterials = (state) => {
  return groupByNameAndCode(state.rawMaterials)
}
