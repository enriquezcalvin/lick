export const setFinishedGoods = (state, payload) => {
  state.finishedGoods = payload
}

export const addFinishedGood = (state, payload) => {
  state.finishedGoods.push(payload)
}

export const deleteFinishedGood = (state, payload) => {
  let index = state.finshedGoods.findIndex((a) => a.id === payload)
  state.finishedGoods.splice(index, 1)
}

export const editFinishedGood = (state, payload) => {
  let index = state.finshedGoods.findIndex((a) => a.id === payload.id)
  state.finishedGoods[index] = payload
}
