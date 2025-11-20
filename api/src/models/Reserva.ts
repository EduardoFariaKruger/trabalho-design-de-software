import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Cliente from "./Cliente.js";
import Espaco from "./Espaco.js";
import ADM from "./ADM.js";

const Reserva = sequelize.define("Reserva", {
  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_espaco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  id_adm: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: "Reserva",
  schema: "dona_maria_schema",
  timestamps: false
});

//relacionamentos
Reserva.belongsTo(Cliente, { foreignKey: "id_cliente" });
Reserva.belongsTo(Espaco, { foreignKey: "id_espaco" });
Reserva.belongsTo(ADM, { foreignKey: "id_adm" });

export default Reserva;
