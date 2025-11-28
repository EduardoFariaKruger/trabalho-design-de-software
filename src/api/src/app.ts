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
import auth from "./routes/Auth";
import cors from "cors";


const app = express();


// Libera todas as origens (mais simples pra nao ter que definir endereco a endereco)
//app.use(cors());

app.use(cors({
  origin: "http://localhost:4000",   //o front
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

const swaggerPath = path.join(process.cwd(), "swagger.yaml");
const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, "utf8")) as Record<string, any>;


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log(swaggerDocument);

// Chama cada controller, entao o app recebe, repassa a requisicao pras funcoes e rotas corretas e depois devolve
app.use(express.json());
app.use("/adm", ADMRoutes);
app.use("/clientes", ClienteRoutes);
app.use("/espacos", EspacoRoutes);
app.use("/reservas", ReservaRoutes);
app.use("/pagamentos", PagamentoRoutes);
app.use("/auth", auth);

// Testa a conexao com o banco e retorna se nao conseguir pra nem iniciar o back

sequelize
  .authenticate()
  .then(() => console.log("Database successfully connected"))
  .catch((err) => console.error("Database connection error:", err));




//aqui eh pq deu boa mesmo, tem que avisar
app.get("/", (_req, res) => {
	res.status(200).json({ mensagem: "deu boa a conexão, confia" })
})

export default app;
