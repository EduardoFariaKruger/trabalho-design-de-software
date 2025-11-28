"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
// 2️⃣ Classe que estende Model
class Espaco extends sequelize_1.Model {
}
// 3️⃣ Inicialização do model
Espaco.init({
    id_espaco: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: sequelize_1.DataTypes.TEXT
    },
    descricao: {
        type: sequelize_1.DataTypes.TEXT
    },
    capacidade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    preco: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    tipo: {
        type: sequelize_1.DataTypes.TEXT
    },
    diasindisponiveis: {
        field: "diasindisponiveis", // coluna real no banco
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.DATEONLY)
    }
}, {
    sequelize: database_1.default,
    tableName: "espaco",
    schema: "dona_maria_schema",
    timestamps: false
});
exports.default = Espaco;
