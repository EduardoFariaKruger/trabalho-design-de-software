"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Pagamento_1 = __importDefault(require("../models/Pagamento"));
const Reserva_1 = __importDefault(require("../models/Reserva"));
const router = express_1.default.Router();
/* ============================================================
   LISTAR TODOS OS PAGAMENTOS
   GET /pagamentos
============================================================ */
router.get("/pagamentos", async (req, res) => {
    try {
        const pagamentos = await Pagamento_1.default.findAll({
            include: [{ model: Reserva_1.default }]
        });
        const response = pagamentos.map((p) => ({
            ...p.toJSON(),
            _links: {
                self: { href: `/pagamentos/${p.id_pagamento}` },
                reserva: { href: `/reservas/${p.id_reserva}` }
            }
        }));
        res.json(response);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao listar pagamentos", details: err });
    }
});
/* ============================================================
   OBTER UM PAGAMENTO ESPECÍFICO
   GET /pagamentos/:id
============================================================ */
router.get("/pagamentos/:id", async (req, res) => {
    try {
        const pagamento = await Pagamento_1.default.findByPk(req.params.id, {
            include: [{ model: Reserva_1.default }]
        });
        if (!pagamento) {
            return res.status(404).json({ error: "Pagamento não encontrado" });
        }
        res.json({
            ...pagamento.toJSON(),
            _links: {
                all: { href: "/pagamentos" },
                reserva: { href: `/reservas/${pagamento.id_reserva}` }
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao buscar pagamento", details: err });
    }
});
/* ============================================================
   CRIAR PAGAMENTO
   POST /pagamentos
============================================================ */
router.post("/pagamentos", async (req, res) => {
    try {
        const pagamento = await Pagamento_1.default.create(req.body);
        res.status(201).json({
            ...pagamento.toJSON(),
            _links: {
                self: { href: `/pagamentos/${pagamento.id_pagamento}` },
                all: { href: "/pagamentos" }
            }
        });
    }
    catch (err) {
        res.status(400).json({ error: "Erro ao criar pagamento", details: err });
    }
});
/* ============================================================
   ATUALIZAR UM PAGAMENTO
   PUT /pagamentos/:id
============================================================ */
router.put("/pagamentos/:id", async (req, res) => {
    try {
        const pagamento = await Pagamento_1.default.findByPk(req.params.id);
        if (!pagamento) {
            return res.status(404).json({ error: "Pagamento não encontrado" });
        }
        await pagamento.update(req.body);
        res.json({
            ...pagamento.toJSON(),
            _links: {
                self: { href: `/pagamentos/${pagamento.id_pagamento}` },
                all: { href: "/pagamentos" }
            }
        });
    }
    catch (err) {
        res.status(400).json({ error: "Erro ao atualizar pagamento", details: err });
    }
});
/* ============================================================
   DELETAR UM PAGAMENTO
   DELETE /pagamentos/:id
============================================================ */
router.delete("/pagamentos/:id", async (req, res) => {
    try {
        const rows = await Pagamento_1.default.destroy({
            where: { id_pagamento: req.params.id }
        });
        if (rows === 0) {
            return res.status(404).json({ error: "Pagamento não encontrado" });
        }
        res.json({
            message: "Pagamento removido com sucesso",
            _links: {
                all: { href: "/pagamentos" }
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao deletar pagamento", details: err });
    }
});
exports.default = router;
