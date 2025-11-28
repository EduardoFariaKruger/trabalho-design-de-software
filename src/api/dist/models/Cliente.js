"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
// 2️⃣ Classe que estende Model
class Cliente extends sequelize_1.Model {
}
// 3️⃣ Inicialização do model
Cliente.init({
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    cpf: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    datanasc: {
        type: sequelize_1.DataTypes.DATEONLY
    }
}, {
    sequelize: database_1.default,
    tableName: "cliente",
    schema: "dona_maria_schema",
    timestamps: false
});
exports.default = Cliente;
