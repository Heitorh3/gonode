

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.only(["email", "password"]);
    const token = auth.attempt(email, password);

    return token;
  }
}

module.exports = SessionController;
