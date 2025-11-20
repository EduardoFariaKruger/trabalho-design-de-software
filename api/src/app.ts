import express from "express";
import sequelize from "./database";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";


const app = express();

const swaggerDocument = YAML.load("swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware for JSON parsing
app.use(express.json());

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log("Database successfully connected"))
  .catch((err) => console.error("Database connection error:", err));

// Aqui a gente 
//app.use("/locations", locationRoutes);


app.get("/", (_req, res) => {
	res.status(200).json({ mensagem: "deu boa a conexão, confia" })
})

export default app;
