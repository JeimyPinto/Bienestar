const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface) => {
    const users = [];

    // Usuario fijo
    users.push({
      firstName: "Jeimy Tatiana",
      lastName: "Pinto Tapia",
      documentType: "CC",
      documentNumber: 1053872476,
      phone: "3058122481",
      email: "jeimytatianapinto@gmail.com",
      password: bcrypt.hashSync("jeimytatianapinto@gmail.com", 10),
      role: "superadmin",
      status: "activo",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    users.push({
      firstName: "Usuario Pruebas",
      lastName: "Administrador",
      documentType: "CC",
      documentNumber: 0,
      phone: "3058122481",
      email: "bienestarregionalcaldascpic@gmail.com",
      password: bcrypt.hashSync("bienestarregionalcaldascpic@gmail.com", 10),
      role: "admin",
      status: "activo",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    users.push({
      firstName: "Usuario Pruebas",
      lastName: "Instructor",
      documentType: "CC",
      documentNumber: 1,
      phone: "3058122481",
      email: "contactojeimypinto@gmail.com",
      password: bcrypt.hashSync("contactojeimypinto@gmail.com", 10),
      role: "instructor",
      status: "activo",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    users.push({
      firstName: "Usuario Pruebas",
      lastName: "Aprendiz",
      documentType: "CC",
      documentNumber: 2,
      phone: "3058122481",
      email: "jeimytatianapinto@hotmail.com",
      password: bcrypt.hashSync("jeimytatianapinto@hotmail.com", 10),
      role: "user",
      status: "activo",
      createdAt: new Date(),
      updatedAt: new Date(),
    });


    await queryInterface.bulkInsert("Users", users);
    console.log("Usuarios creados exitosamente.");
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", null, {});
    console.log("Usuarios eliminados exitosamente.");
  },
};