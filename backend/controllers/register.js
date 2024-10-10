const { Usuario } = require("../models");
const { userSchema } = require("../schema");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { nombre, apellido, documento, telefono, email, contrasena } = req.body;
  const validation = userSchema.safeParse({
    nombre,
    apellido,
    documento,
    telefono,
    email,
    contrasena,
  });

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const newUser = await Usuario.create({
      nombre,
      apellido,
      documento,
      telefono,
      email,
      contrasena: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerController };
