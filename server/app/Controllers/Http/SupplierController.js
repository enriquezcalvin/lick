'use strict'

/**
 * Resourceful controller for interacting with suppliers
 */
class SupplierController {
  /**
   * Show a list of all suppliers.
   * GET suppliers
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new supplier.
   * GET suppliers/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new supplier.
   * POST suppliers
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single supplier.
   * GET suppliers/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing supplier.
   * GET suppliers/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update supplier details.
   * PUT or PATCH suppliers/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a supplier with id.
   * DELETE suppliers/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SupplierController
