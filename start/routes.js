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

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'mmd-api' }
})

Route.group(() => {
  Route.post('auth/register', 'UserController.register')
  Route.post('auth/login', 'UserController.login')

  Route.get('movies/watched', 'MovieController.watched').middleware('auth')
  Route.get('movies/plan-to-watch', 'MovieController.planToWatch').middleware('auth')
  Route.post('movies', 'MovieController.create').middleware('auth')
  Route.patch('movies/:id', 'MovieController.update').middleware('auth')
  Route.delete('movies/:id', 'MovieController.destroy').middleware('auth')

  Route.get('search/:query', 'SearchController.search').middleware('auth')
}).prefix('api');
