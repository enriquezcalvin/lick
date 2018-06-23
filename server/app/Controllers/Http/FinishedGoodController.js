'use strict'

/**
 * Resourceful controller for interacting with finishedgoods
 */
class FinishedGoodController {
  /**
   * Show a list of all finishedgoods.
   * GET finishedgoods
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new finishedgood.
   * GET finishedgoods/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new finishedgood.
   * POST finishedgoods
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single finishedgood.
   * GET finishedgoods/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing finishedgood.
   * GET finishedgoods/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update finishedgood details.
   * PUT or PATCH finishedgoods/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a finishedgood with id.
   * DELETE finishedgoods/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FinishedGoodController
