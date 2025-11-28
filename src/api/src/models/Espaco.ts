import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

interface EspacoAttributes {
  id_espaco?: number;
  nome?: string;
  descricao?: string;
  capacidade: number;
  preco: number;
  tipo?: string;
  diasindisponiveis?: string[];
}

class Espaco extends Model<EspacoAttributes> implements EspacoAttributes {
  public id_espaco!: number;
  public nome?: string;
  public descricao?: string;
  public capacidade!: number;
  public preco!: number;
  public tipo?: string;
  public diasindisponiveis?: string[];
}

Espaco.init(
  {
    id_espaco: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.TEXT
    },
    descricao: {
      type: DataTypes.TEXT
    },
    capacidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tipo: {
      type: DataTypes.TEXT
    },
    diasindisponiveis: {
      field: "diasindisponiveis",
      type: DataTypes.ARRAY(DataTypes.DATEONLY)
    }
  },
  {
    sequelize,
    tableName: "espaco",
    schema: "dona_maria_schema",
    timestamps: false
  }
);

export default Espaco;
