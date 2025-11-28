"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Reserva_1 = __importDefault(require("../models/Reserva"));
const Cliente_1 = __importDefault(require("../models/Cliente"));
const Espaco_1 = __importDefault(require("../models/Espaco"));
const ADM_1 = __importDefault(require("../models/ADM"));
const router = express_1.default.Router();
/* ============================================================
   LISTAR TODAS AS RESERVAS
   GET /reservas
============================================================ */
router.get("/reservas", async (req, res) => {
    try {
        const reservas = await Reserva_1.default.findAll({
            include: [
                { model: Cliente_1.default },
                { model: Espaco_1.default },
                { model: ADM_1.default }
            ]
        });
        const response = reservas.map((r) => ({
            ...r.toJSON(),
            _links: {
                self: { href: `/reservas/${r.id_reserva}` },
                cliente: { href: `/clientes/${r.id_cliente}` },
                espaco: { href: `/espacos/${r.id_espaco}` },
                adm: r.id_adm ? { href: `/adm/${r.id_adm}` } : null
            }
        }));
        res.json(response);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao listar reservas", details: err });
    }
});
/* ============================================================
   OBTER UMA RESERVA ESPECÍFICA
   GET /reservas/:id
============================================================ */
router.get("/reservas/:id", async (req, res) => {
    try {
        const reserva = await Reserva_1.default.findByPk(req.params.id, {
            include: [
                { model: Cliente_1.default },
                { model: Espaco_1.default },
                { model: ADM_1.default }
            ]
        });
        if (!reserva) {
            return res.status(404).json({ error: "Reserva não encontrada" });
        }
        res.json({
            ...reserva.toJSON(),
            _links: {
                all: { href: "/reservas" },
                cliente: { href: `/clientes/${reserva.id_cliente}` },
                espaco: { href: `/espacos/${reserva.id_espaco}` },
                adm: reserva.id_adm ? { href: `/adm/${reserva.id_adm}` } : null
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao buscar reserva", details: err });
    }
});
/* ============================================================
   CRIAR UMA RESERVA
   POST /reservas
============================================================ */
router.post("/reservas", async (req, res) => {
    try {
        const reserva = await Reserva_1.default.create(req.body);
        res.status(201).json({
            ...reserva.toJSON(),
            _links: {
                self: { href: `/reservas/${reserva.id_reserva}` },
                all: { href: "/reservas" }
            }
        });
    }
    catch (err) {
        res.status(400).json({ error: "Erro ao criar reserva", details: err });
    }
});
/* ============================================================
   ATUALIZAR RESERVA
   PUT /reservas/:id
============================================================ */
router.put("/reservas/:id", async (req, res) => {
    try {
        const reserva = await Reserva_1.default.findByPk(req.params.id);
        if (!reserva) {
            return res.status(404).json({ error: "Reserva não encontrada" });
        }
        await reserva.update(req.body);
        res.json({
            ...reserva.toJSON(),
            _links: {
                self: { href: `/reservas/${reserva.id_reserva}` },
                all: { href: "/reservas" }
            }
        });
    }
    catch (err) {
        res.status(400).json({ error: "Erro ao atualizar reserva", details: err });
    }
});
/* ============================================================
   DELETAR UMA RESERVA
   DELETE /reservas/:id
============================================================ */
router.delete("/reservas/:id", async (req, res) => {
    try {
        const rows = await Reserva_1.default.destroy({
            where: { id_reserva: req.params.id }
        });
        if (rows === 0) {
            return res.status(404).json({ error: "Reserva não encontrada" });
        }
        res.json({
            message: "Reserva removida com sucesso",
            _links: {
                all: { href: "/reservas" }
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao deletar reserva", details: err });
    }
});
exports.default = router;
