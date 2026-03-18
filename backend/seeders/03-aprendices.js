const { createUser } = require("./factories/user-factory");

module.exports = {
  up: async (queryInterface) => {
    // Obtener todas las fichas existentes
    const groups = await queryInterface.sequelize.query(
      "SELECT id FROM `Groups`;",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!groups.length) {
      throw new Error("No hay fichas (grupos) en la base de datos.");
    }

    const aprendices = [];
    // Crear 500 aprendices
    for (let i = 0; i < 500; i++) {
      const randomGroup = groups[Math.floor(Math.random() * groups.length)];
      aprendices.push(createUser({ 
        role: "user",
        groupId: randomGroup.id 
      }));
    }

    // Agregar usuario aprendiz estático de pruebas
    aprendices.push({
      firstName: "Usuario Pruebas",
      lastName: "Aprendiz",
      documentType: "CC",
      documentNumber: "2",
      phone: "3058122481",
      email: "jeimytatianapinto@hotmail.com",
      password: require("bcrypt").hashSync("jeimytatianapinto@hotmail.com", 10),
      role: "user",
      status: "activo",
      groupId: groups[0].id, // Primer grupo
      createdAt: new Date(),
      updatedAt: new Date(),
      mustChangePassword: false
    });

    await queryInterface.bulkInsert("Users", aprendices);
    console.log(`${aprendices.length} aprendices creados y asignados a fichas.`);
  },

  down: async (queryInterface) => {
    // Solo borramos los usuarios que son 'user' (aprendices), para no borrar admins/instructores
    // Aunque usualmente se limpia todo en cascada.
    await queryInterface.bulkDelete("Users", { role: "user" }, {});
  },
};
