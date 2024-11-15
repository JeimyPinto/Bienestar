const { z } = require("zod");
const db = require("../models");
const Usuario = db.Usuario;

const isDocumentoUnique = async (documento) => {
  const usuario = await Usuario.findOne({ where: { documento } });
  return !usuario;
};

const usuarioSchema = z.object({
  nombre: z.string().nonempty("El nombre es requerido"),
  apellido: z.string().nonempty("El apellido es requerido"),
  documento: z.string().nonempty("El documento es requerido").refine(async (documento) => {
    return await isDocumentoUnique(documento);
  }, {
    message: "El documento ya está en uso",
  }),
  telefono: z.string().nonempty("El teléfono es requerido"),
  email: z.string().email("El email no es válido"),
  contrasena: z.string().nonempty("La contraseña es requerida"),
});

module.exports = usuarioSchema;