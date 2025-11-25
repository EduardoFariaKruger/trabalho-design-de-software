import { DataTypes } from "sequelize";
import sequelize from "../database";
import Reserva from "./Reserva";

const Pagamento = sequelize.define("Pagamento", {
  id_pagamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valortotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  valorpago: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tipopagamento: {
    type: DataTypes.TEXT
  },
  id_reserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
}, {
  tableName: "pagamento",
  schema: "dona_maria_schema",
  timestamps: false
});

//relacionamentos
Pagamento.belongsTo(Reserva, { foreignKey: "id_reserva" });
Reserva.hasOne(Pagamento, { foreignKey: "id_reserva" });

export default Pagamento;
