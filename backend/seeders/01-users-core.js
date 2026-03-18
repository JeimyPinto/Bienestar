const bcrypt = require("bcrypt");
const { createUser } = require("./factories/user-factory");

module.exports = {
  up: async (queryInterface) => {
    const users = [];

    // --- USUARIOS ESTÁTICOS ---
    users.push({
      firstName: "Jeimy Tatiana",
      lastName: "Pinto Tapia",
      documentType: "CC",
      documentNumber: "1053872476",
      phone: "3058122481",
      email: "jeimytatianapinto@gmail.com",
      password: bcrypt.hashSync("jeimytatianapinto@gmail.com", 10),
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
      password: bcrypt.hashSync("bienestarregionalcaldascpic@gmail.com", 10),
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
