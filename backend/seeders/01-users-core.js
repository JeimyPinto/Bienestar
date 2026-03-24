const bcrypt = require("bcrypt");
const { createUser } = require("./factories/user-factory");

// Las contraseñas viven en .env para no exponerse en el código fuente
const SUPERADMIN_PASS = process.env.SEED_SUPERADMIN_PASS;
const ADMIN_PASS      = process.env.SEED_ADMIN_PASS;
const INSTRUCTOR_PASS = process.env.SEED_INSTRUCTOR_PASS;
const APRENDIZ_PASS   = process.env.SEED_APRENDIZ_PASS;

module.exports = {
  up: async (queryInterface) => {
    // Validar que las contraseñas estén definidas en el .env
    if (!SUPERADMIN_PASS || !ADMIN_PASS) {
      throw new Error("Faltan variables SEED_SUPERADMIN_PASS o SEED_ADMIN_PASS en el archivo .env");
    }

    const users = [];

    // --- USUARIOS ESTÁTICOS ---
    users.push({
      firstName: "Jeimy Tatiana",
      lastName: "Pinto Tapia",
      documentType: "CC",
      documentNumber: "1053872476",
      phone: "3058122481",
      email: "jeimytatianapinto@gmail.com",
      password: bcrypt.hashSync(SUPERADMIN_PASS, 10),
      role: "superadmin",
      status: "activo",
      createdAt: new Date(),
      updatedAt: new Date(),
      mustChangePassword: false
    });

    users.push({
      firstName: "Usuario Pruebas",
      lastName: "Administrador",
      documentType: "CC",
      documentNumber: "0",
      phone: "3058122481",
      email: "bienestarregionalcaldascpic@gmail.com",
      password: bcrypt.hashSync(ADMIN_PASS, 10),
      role: "admin",
      status: "activo",
      createdAt: new Date(),
      updatedAt: new Date(),
      mustChangePassword: false
    });

    // --- 5 ADMIN FICTICIOS ---
    for (let i = 0; i < 5; i++) {
      users.push(createUser({ role: "admin" }));
    }

    // --- 20 INSTRUCTORES FICTICIOS ---
    for (let i = 0; i < 20; i++) {
      users.push(createUser({ role: "instructor" }));
    }

    await queryInterface.bulkInsert("Users", users);
    console.log("Usuarios núcleo creados (Static + Admins + Instructores).");
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
