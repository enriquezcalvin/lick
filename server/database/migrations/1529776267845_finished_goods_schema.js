'use strict'

const Schema = use('Schema')

class FinishedGoodsSchema extends Schema {
  up () {
    this.create('finished_goods', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('finished_goods')
  }
}

module.exports = FinishedGoodsSchema
