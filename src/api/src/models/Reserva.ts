import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Cliente from "./Cliente";
import Espaco from "./Espaco";
import ADM from "./ADM";

// 1️⃣ Interface com os atributos da tabela
interface ReservaAttributes {
  id_reserva: number;
  data: string; // DATEONLY é representado como string no Sequelize
  id_cliente: number;
  id_espaco: number;
  id_adm?: number;
}

// 2️⃣ Classe que estende Model
class Reserva extends Model<ReservaAttributes> implements ReservaAttributes {
  public id_reserva!: number;
  public data!: string;
  public id_cliente!: number;
  public id_espaco!: number;
  public id_adm?: number;
}

// 3️⃣ Inicialização do model
Reserva.init(
  {
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
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "reserva",
    schema: "dona_maria_schema",
    timestamps: false
  }
);

// 4️⃣ Relacionamentos
Reserva.belongsTo(Cliente, { foreignKey: "id_cliente" });
Reserva.belongsTo(Espaco, { foreignKey: "id_espaco" });
Reserva.belongsTo(ADM, { foreignKey: "id_adm" });

export default Reserva;
