'use strict'

const Schema = use('Schema')

class RawMaterialsSchema extends Schema {
  up () {
    this.create('raw_materials', (table) => {
      table.increments()
      table.string('code', 254).notNullable()
      table.string('name', 254).notNullable()
      table.string('lot', 254).notNullable().unique()
      table.integer('quantity')
      table.integer('unit')
      table.string('description', 254)
      table.integer('supplier')
      table.boolean('vat')
      table.date('purchaseDate')
      table.string('purchaseOrderNo', 254)
      table.float('unitCost', 2)
      table.float('totalAmount', 2)
      table.string('SKU', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('raw_materials')
  }
}

module.exports = RawMaterialsSchema
