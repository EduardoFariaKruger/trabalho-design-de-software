import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Reserva from "./Reserva";

// 1️⃣ Interface com os atributos da tabela
interface PagamentoAttributes {
  id_pagamento: number;
  valortotal: number;
  valorpago: number;
  tipopagamento?: string;
  id_reserva: number;
}

// 2️⃣ Classe que estende Model
class Pagamento extends Model<PagamentoAttributes> implements PagamentoAttributes {
  public id_pagamento!: number;
  public valortotal!: number;
  public valorpago!: number;
  public tipopagamento?: string;
  public id_reserva!: number;
}

// 3️⃣ Inicialização do model
Pagamento.init(
  {
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
  },
  {
    sequelize,
    tableName: "pagamento",
    schema: "dona_maria_schema",
    timestamps: false
  }
);

// 4️⃣ Relacionamentos
Pagamento.belongsTo(Reserva, { foreignKey: "id_reserva" });
Reserva.hasOne(Pagamento, { foreignKey: "id_reserva" });

export default Pagamento;
