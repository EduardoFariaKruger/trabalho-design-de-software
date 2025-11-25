import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

// 1️⃣ Interface com os atributos da tabela
interface EspacoAttributes {
  id_espaco?: number;
  nome?: string;
  descricao?: string;
  capacidade: number;
  preco: number;
  tipo?: string;
  diasindisponiveis?: string[]; // array de datas
}

// 2️⃣ Classe que estende Model
class Espaco extends Model<EspacoAttributes> implements EspacoAttributes {
  public id_espaco!: number;
  public nome?: string;
  public descricao?: string;
  public capacidade!: number;
  public preco!: number;
  public tipo?: string;
  public diasindisponiveis?: string[];
}

// 3️⃣ Inicialização do model
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
      field: "diasindisponiveis", // coluna real no banco
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
