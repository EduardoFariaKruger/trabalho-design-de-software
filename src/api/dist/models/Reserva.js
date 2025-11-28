"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const Cliente_1 = __importDefault(require("./Cliente"));
const Espaco_1 = __importDefault(require("./Espaco"));
const ADM_1 = __importDefault(require("./ADM"));
// 2️⃣ Classe que estende Model
class Reserva extends sequelize_1.Model {
}
// 3️⃣ Inicialização do model
Reserva.init({
    id_reserva: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_espaco: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    id_adm: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: database_1.default,
    tableName: "reserva",
    schema: "dona_maria_schema",
    timestamps: false
});
// 4️⃣ Relacionamentos
Reserva.belongsTo(Cliente_1.default, { foreignKey: "id_cliente" });
Reserva.belongsTo(Espaco_1.default, { foreignKey: "id_espaco" });
Reserva.belongsTo(ADM_1.default, { foreignKey: "id_adm" });
exports.default = Reserva;
