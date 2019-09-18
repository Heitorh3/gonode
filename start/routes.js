

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('users', 'UserController.store').validator('User');
Route.post('sessions', 'SessionController.store').validator('Session');

Route.post('forgot', 'ForgotPasswordController.store').validator('Forgot');
Route.post('reset', 'ResetPasswordController.store').validator('Reset');

Route.get('files/:id', 'FileController.show');

Route.group(() => {
  Route.post('files', 'FileController.store');

  Route.resource('projects', 'ProjectController').apiOnly();
  Route.resource('projects.tasks', 'TaskController').apiOnly();
}).middleware(['auth']);
