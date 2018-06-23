'use strict'

const Schema = use('Schema')

class SuppliersSchema extends Schema {
  up () {
    this.create('suppliers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('suppliers')
  }
}

module.exports = SuppliersSchema
