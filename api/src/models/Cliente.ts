import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Cliente = sequelize.define("Cliente", {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cpf: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  dataNasc: {
    type: DataTypes.DATEONLY
  }
}, {
  tableName: "Cliente",
  schema: "dona_maria_schema",
  timestamps: false
});

export default Cliente;
