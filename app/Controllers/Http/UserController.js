/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const data = request.only(['username', 'password', 'email']);

    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController;
