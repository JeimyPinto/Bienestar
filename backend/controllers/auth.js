//Modelos
const db = require("../models");
const User = db.User;
//Librerías
const bcrypt = require("bcrypt");
//Modulos de Herramientas
const createToken = require("../utils/createToken");

class AuthController {
  async login(req, res, next) {
    try {
      // Ya validado y verificado por middlewares
      const { email, password } = req.body;

      //Lógica de inicio de sesión
      const user = await User.findOne({
        where: { email },
        include: [
          { association: "services", required: false },
          { association: "requests", required: false },
        ],
      });

      if (!user) {
        throw new ErrorController(
          401,
          "Correo electrónico o contraseña incorrectos",
          { field: "email" }
        );
      }
      if (!await bcrypt.compare(password, user.password)) {
        throw new ErrorController(
          401,
          "Correo electrónico o contraseña incorrectos",
          { field: "password" }
        );
      }
      const token = createToken(user);

      let response = {
        message: `Inicio de sesión exitoso para el usuario ${user.firstName}.
                Hora de inicio de sesión: ${new Date().toLocaleTimeString()}`
      };

      if (process.env.NODE_ENV === "production") {
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: 60 * 60 * 1000,
        });
      } else {
        response.token = token;
      }

      res.status(200).json(response);
    } catch(error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
