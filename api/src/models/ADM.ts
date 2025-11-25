import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

// 1️⃣ Interface com os atributos da tabela
interface ADMAttributes {
  id_adm?: number;
  nome: string;
  cpf: number;
  datanasc?: string; // opcional, pois pode ser NULL
}

// 2️⃣ Classe que estende Model e implementa os atributos
class ADM extends Model<ADMAttributes> implements ADMAttributes {
  public id_adm?: number;
  public nome!: string;
  public cpf!: number;
  public datanasc?: string;
}

// 3️⃣ Inicialização do model
ADM.init(
  {
    id_adm: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cpf: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    datanasc: {
      type: DataTypes.DATEONLY
    }
  },
  {
    sequelize,
    tableName: "adm",
    schema: "dona_maria_schema",
    timestamps: false
  }
);

export default ADM;
