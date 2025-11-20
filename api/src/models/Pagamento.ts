import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Reserva from "./Reserva.js";

const Pagamento = sequelize.define("Pagamento", {
  id_pagamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valorTotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  valorPago: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tipoPagamento: {
    type: DataTypes.TEXT
  },
  id_reserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
}, {
  tableName: "Pagamento",
  schema: "dona_maria_schema",
  timestamps: false
});

//relacionamentos
Pagamento.belongsTo(Reserva, { foreignKey: "id_reserva" });
Reserva.hasOne(Pagamento, { foreignKey: "id_reserva" });

export default Pagamento;
