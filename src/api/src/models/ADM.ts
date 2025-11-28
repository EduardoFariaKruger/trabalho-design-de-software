import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

interface ADMAttributes {
  id_adm?: number;
  login: string;
  senha:string;
}

class ADM extends Model<ADMAttributes> implements ADMAttributes {
  public id_adm?: number;
  public login!: string;
  public senha!: string;
}

ADM.init(
  {
    id_adm: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    senha: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
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
