"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const Reserva_1 = __importDefault(require("./Reserva"));
// 2️⃣ Classe que estende Model
class Pagamento extends sequelize_1.Model {
}
// 3️⃣ Inicialização do model
Pagamento.init({
    id_pagamento: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valorTotal: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    valorPago: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    tipoPagamento: {
        type: sequelize_1.DataTypes.TEXT
    },
    id_reserva: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: database_1.default,
    tableName: "pagamento",
    schema: "dona_maria_schema",
    timestamps: false
});
// 4️⃣ Relacionamentos
Pagamento.belongsTo(Reserva_1.default, { foreignKey: "id_reserva" });
Reserva_1.default.hasOne(Pagamento, { foreignKey: "id_reserva" });
exports.default = Pagamento;
