import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

// 1️⃣ Interface com os atributos da tabela
interface ClienteAttributes {
  id_cliente?: number;
  nome: string;
  cpf: number;
  datanasc?: string; // opcional, formato DATEONLY
}

// 2️⃣ Classe que estende Model
class Cliente extends Model<ClienteAttributes> implements ClienteAttributes {
  public id_cliente!: number;
  public nome!: string;
  public cpf!: number;
  public datanasc?: string;
}

// 3️⃣ Inicialização do model
Cliente.init(
  {
    id_cliente: {
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
    tableName: "cliente",
    schema: "dona_maria_schema",
    timestamps: false
  }
);

export default Cliente;
