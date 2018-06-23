'use strict'

const Schema = use('Schema')

class PackagingMaterialsSchema extends Schema {
  up () {
    this.create('packaging_materials', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('packaging_materials')
  }
}

module.exports = PackagingMaterialsSchema
