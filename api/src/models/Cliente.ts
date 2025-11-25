import { DataTypes } from "sequelize";
import sequelize from "../database";

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
  datanasc: {
    type: DataTypes.DATEONLY
  }
}, {
  tableName: "cliente",
  schema: "dona_maria_schema",
  timestamps: false
});

export default Cliente;
