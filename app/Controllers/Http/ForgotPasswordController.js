"use strict";

/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

const { randomBytes } = require("crypto");
const { promisify } = require("util");

const Mail = use("Mail");
const Env = use("Env");

class ForgotPasswordController {
  async store({ request, response }) {
    const email = request.input("email");

    try {
      const user = await User.findByOrFail("email", email);

      const random = await promisify(randomBytes)(24);
      const token = random.toString("hex");

      await user.tokens().create({
        token,
        type: "forgotpassword"
      });

      const resetPasswordUrl = `${Env.get("FRONT_URL")}/reset?token=${token}`;

      await Mail.send(
        "emails.forgotpassword",
        { name: user.email, resetPasswordUrl },
        message => {
          message
            .to(user.email)
            .from("heitorh3@gmail.com")
            .subject("Welcome to yardstick");
        }
      );
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Invalid email" } });
    }
  }
}

module.exports = ForgotPasswordController;
