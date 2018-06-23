'use strict'

/**
 * Resourceful controller for interacting with packagingmaterials
 */
class PackagingMaterialController {
  /**
   * Show a list of all packagingmaterials.
   * GET packagingmaterials
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new packagingmaterial.
   * GET packagingmaterials/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new packagingmaterial.
   * POST packagingmaterials
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single packagingmaterial.
   * GET packagingmaterials/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing packagingmaterial.
   * GET packagingmaterials/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update packagingmaterial details.
   * PUT or PATCH packagingmaterials/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a packagingmaterial with id.
   * DELETE packagingmaterials/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PackagingMaterialController
