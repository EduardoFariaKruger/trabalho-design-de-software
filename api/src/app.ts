import express from "express";
import sequelize from "./database";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import ADMRoutes from "./routes/adminController";
import ClientRoutes from "./routes/clientController" 
import EspacoRoutes from "./routes/espacoController";
import ReservaRoutes from "./routes/reservaController" 
import PagamentoRoutes from "./routes/pagamentoController";


const app = express();

const swaggerDocument = YAML.load("swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware for JSON parsing
app.use(express.json());
app.use("/adm", ADMRoutes);
app.use("/clients", ClientRoutes);
app.use("/espaco", EspacoRoutes);
app.use("/reserva", ReservaRoutes);
app.use("/pagamento", PagamentoRoutes);

// Test database connection

sequelize
  .authenticate()
  .then(() => console.log("Database successfully connected"))
  .catch((err) => console.error("Database connection error:", err));





app.get("/", (_req, res) => {
	res.status(200).json({ mensagem: "deu boa a conexão, confia" })
})

export default app;
