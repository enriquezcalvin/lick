import { groupByNameAndCodeGoods } from '../../helpers/groupBy'

export const getFinishedGoods = (state) => {
  return groupByNameAndCodeGoods(state.finishedGoods)
}
