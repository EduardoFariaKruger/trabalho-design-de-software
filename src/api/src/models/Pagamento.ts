import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Reserva from "./Reserva";

interface PagamentoAttributes {
  id_pagamento: number;
  valorTotal: number;
  valorPago: number;
  tipoPagamento?: string;
  id_reserva: number;
}

class Pagamento extends Model<PagamentoAttributes> implements PagamentoAttributes {
  public id_pagamento!: number;
  public valorTotal!: number;
  public valorPago!: number;
  public tipoPagamento?: string;
  public id_reserva!: number;
}

Pagamento.init(
  {
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
  },
  {
    sequelize,
    tableName: "pagamento",
    schema: "dona_maria_schema",
    timestamps: false
  }
);

Pagamento.belongsTo(Reserva, { foreignKey: "id_reserva" });
Reserva.hasOne(Pagamento, { foreignKey: "id_reserva" });

export default Pagamento;
