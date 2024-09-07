const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bienestar",
  dialect: "mysql",
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
};

export { dbConfig };
