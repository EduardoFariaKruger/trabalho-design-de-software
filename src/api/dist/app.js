"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const adminController_1 = __importDefault(require("./routes/adminController"));
const clienteController_1 = __importDefault(require("./routes/clienteController"));
const espacoController_1 = __importDefault(require("./routes/espacoController"));
const reservaController_1 = __importDefault(require("./routes/reservaController"));
const pagamentoController_1 = __importDefault(require("./routes/pagamentoController"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Libera todas as origens (mais simples)
app.use((0, cors_1.default)());
// ou para liberar só o front-end:
app.use((0, cors_1.default)({
    origin: "http://localhost:4000", // seu frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
const swaggerPath = path_1.default.join(process.cwd(), "swagger.yaml");
const swaggerDocument = js_yaml_1.default.load(fs_1.default.readFileSync(swaggerPath, "utf8"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
console.log(swaggerDocument);
// Middleware for JSON parsing
app.use(express_1.default.json());
app.use("/adm", adminController_1.default);
app.use("/clientes", clienteController_1.default);
app.use("/espacos", espacoController_1.default);
app.use("/reservas", reservaController_1.default);
app.use("/pagamentos", pagamentoController_1.default);
// Test database connection
database_1.default
    .authenticate()
    .then(() => console.log("Database successfully connected"))
    .catch((err) => console.error("Database connection error:", err));
app.get("/", (_req, res) => {
    res.status(200).json({ mensagem: "deu boa a conexão, confia" });
});
exports.default = app;
