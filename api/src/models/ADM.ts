import { DataTypes } from "sequelize";
import sequelize from "../database";

const ADM = sequelize.define("ADM", {
  id_adm: {
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
  tableName: "adm",
  schema: "dona_maria_schema",
  timestamps: false
});

export default ADM;
