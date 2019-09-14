"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("users", "UserController.store");
Route.post("sessions", "SessionController.store");

Route.post("forgot", "ForgotPasswordController.store");
Route.post("reset", "ResetPasswordController.store");

Route.post("files/:id", "FileController.show");

Route.group(() => {
Route.post("files", "FileController.store");
