'use strict'

const Schema = use('Schema')

class OtherMaterialsSchema extends Schema {
  up () {
    this.create('other_materials', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('other_materials')
  }
}

module.exports = OtherMaterialsSchema
