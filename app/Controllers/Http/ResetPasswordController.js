/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token');

const { parseISO, isBefore, subHours } = require('date-fns');

class ResetPasswordController {
  async store({ request, response }) {
    const { token, password } = request.only(['token', 'password']);

    try {
      const userToken = await Token.findByOrFail('token', token);

      if (isBefore(parseISO(userToken.created_at), subHours(new Date(), 2))) {
        return response
          .status(400)
          .json({ error: 'Invalid date range, please try again' });
      }

      const user = await userToken.user().fetch();

      user.password = password;
      await user.save();
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Invalid token' } });
    }
  }
}

module.exports = ResetPasswordController;
