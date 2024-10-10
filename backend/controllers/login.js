const { Usuario } = require("../models");
const { userSchema } = require("../schema");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const validation = userSchema.safeParse({ email, password });

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  try {
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.contrasena);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { loginController };
