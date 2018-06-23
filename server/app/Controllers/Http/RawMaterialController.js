'use strict'

const RawMaterial = use('App/Models/RawMaterial')

/**
 * Resourceful controller for interacting with rawmaterials
 */
class RawMaterialController {
  /**
   * Show a list of all rawmaterials.
   * GET rawmaterials
   */
  async index ({ request, response, view }) {
    return await RawMaterial.all()
  }

  /**
   * Render a form to be used for creating a new rawmaterial.
   * GET rawmaterials/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new rawmaterial.
   * POST rawmaterials
   */
  async store ({ request, response }) {
    return await RawMaterial.create(request.all())
  }

  /**
   * Display a single rawmaterial.
   * GET rawmaterials/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing rawmaterial.
   * GET rawmaterials/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update rawmaterial details.
   * PUT or PATCH rawmaterials/:id
   */
  async update ({ params, request, response }) {
    let { id } = params
    let material = await RawMaterial.find(id)
    //console.log(request.all())
    //request.only(['code', 'name', 'lot', 'quantity', 'unit', 'description', 'supplier', 'vat', 'purchaseOrderNo', 'unitCost', 'totalAmount', 'SKU', 'purchaseDate'])
    await material.merge(request.only(['code', 'name', 'lot', 'quantity', 'unit', 'description', 'supplier', 'vat', 'purchaseOrderNo', 'unitCost', 'totalAmount', 'SKU', 'purchaseDate']))
    return await material.save()
    
  }

  /**
   * Delete a rawmaterial with id.
   * DELETE rawmaterials/:id
   */
  async destroy ({ params, request, response }) {
    let { id } = params
    let material = await RawMaterial.find(id)
    return await material.delete()
  }
}

module.exports = RawMaterialController
