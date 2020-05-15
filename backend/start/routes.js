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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')



Route.group(() => {
    Route.get('posts', 'PostController.index')
    Route.post('post', 'PostController.store')
    Route.put('post/:id', 'PostController.update')
    Route.delete('post/:id', 'PostController.delete')
}).prefix('api')
