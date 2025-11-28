import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

interface ClienteAttributes {
  id_cliente?: number;
  nome: string;
  cpf: number;
  datanasc?: string;
}

class Cliente extends Model<ClienteAttributes> implements ClienteAttributes {
  public id_cliente!: number;
  public nome!: string;
  public cpf!: number;
  public datanasc?: string;
}

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
