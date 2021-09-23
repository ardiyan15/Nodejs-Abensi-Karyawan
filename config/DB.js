const Sequelize = require("sequelize");
require("dotenv").config();

const env = process.env.NODE_ENV || "development";

if (env == "test") {
  process.env.DB_NAME = "test_absensi_karyawan";
} else {
  process.env.DB_NAME = "absensi_karyawan";
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    logging: false,
    timezone: "+07:00",
    dialect: "postgres",
    host: process.env.DB_HOST,
  }
);

module.exports = sequelize;
