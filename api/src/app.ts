import express from "express";
import sequelize from "./database";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from 'fs';
import path from "path";

import ADMRoutes from "./routes/adminController";
import ClienteRoutes from "./routes/clienteController" 
import EspacoRoutes from "./routes/espacoController";
import ReservaRoutes from "./routes/reservaController" 
import PagamentoRoutes from "./routes/pagamentoController";


const app = express();


const swaggerPath = path.join(process.cwd(), "swagger.yaml");
const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, "utf8")) as Record<string, any>;


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log(swaggerDocument);

// Middleware for JSON parsing
app.use(express.json());
app.use("/adm", ADMRoutes);
app.use("/clientes", ClienteRoutes);
app.use("/espacos", EspacoRoutes);
app.use("/reservas", ReservaRoutes);
app.use("/pagamentos", PagamentoRoutes);

// Test database connection

sequelize
  .authenticate()
  .then(() => console.log("Database successfully connected"))
  .catch((err) => console.error("Database connection error:", err));





app.get("/", (_req, res) => {
	res.status(200).json({ mensagem: "deu boa a conexão, confia" })
})

export default app;
