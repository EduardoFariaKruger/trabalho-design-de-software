import { DataTypes } from "sequelize";
import sequelize from "../database";

const Espaco = sequelize.define("Espaco", {
  id_espaco: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.TEXT
  },
  descricao: {
    type: DataTypes.TEXT
  },
  capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tipo: {
    type: DataTypes.TEXT
  },
  diasindisponiveis: {
    field: "diasindisponiveis",  // nome da coluna real no banco
    type: DataTypes.ARRAY(DataTypes.DATEONLY)
  }
}, {
  tableName: "espaco",
  schema: "dona_maria_schema",
  timestamps: false
});

export default Espaco;
