'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.post('api/login', 'UserController.login')
Route.post('api/createUser', 'UserController.create')
Route.get('api/users', 'UserController.index')
// this section is for inventory
Route.group(() => {  
  // this section is api for the raw materials part
  // return raw materials
  Route.get('rawMaterials', 'RawMaterialController.index')
  Route.post('rawMaterials', 'RawMaterialController.store')
  Route.put('rawMaterials/:id', 'RawMaterialController.update')
  Route.delete('rawMaterials/:id', 'RawMaterialController.destroy')
  // this section is api for packaging materials

  // this section is api for other materials

  // this section is api for finished goods

  // this section is api for bad orders

  // this section is api for expired goods
  
  // this section is for suppliers

  // this section is for 

})
  .prefix('api/inventory')

