import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class City extends Model {
  public city!: string;
  public name!: string;
  public date!: string;
  public location!: string;
  public category!: string;
  public link!: string;
  public init_date!: Date | null;
  public ending_date!: Date | null;
}

City.init(
  {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    init_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ending_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: process.env.EVENTS_TABLE, // 
    schema: process.env.DB_SCHEMA,       // 
    timestamps: false
  }
);

export default City;
