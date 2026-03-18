const { fakerES: faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const createUser = (overrides = {}) => {
  const documentNumber = overrides.documentNumber || faker.string.numeric(10);
  const password = bcrypt.hashSync(documentNumber.toString(), 10);
  
  // Usamos el número de documento en el email para asegurar unicidad
  const email = overrides.email || `user${documentNumber}@${faker.internet.domainName()}`;

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    documentType: faker.helpers.arrayElement(["CC", "TI", "CE"]),
    documentNumber,
    phone: faker.phone.number({ style: 'international' }).substring(0, 15),
    email,
    password,
    status: "activo",
    role: "user",
    image: null,
    groupId: null,
    mustChangePassword: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
};

module.exports = { createUser };
