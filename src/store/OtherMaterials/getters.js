import { groupByNameAndCode } from '../../helpers/groupBy'

export const getOtherMaterials = (state) => {
  return groupByNameAndCode(state.otherMaterials)
}
