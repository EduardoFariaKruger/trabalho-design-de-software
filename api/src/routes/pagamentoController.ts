import express from "express";
import Pagamento from "../models/Pagamento";
import Reserva from "../models/Reserva";

const router = express.Router();

/* ============================================================
   LISTAR TODOS OS PAGAMENTOS
   GET /pagamentos
============================================================ */
router.get("/", async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({
      include: [{ model: Reserva }]
    });

    const response = pagamentos.map((p) => ({
      ...p.toJSON(),
      _links: {
        self: { href: `/pagamentos/${p.id_pagamento}` },
        reserva: { href: `/reservas/${p.id_reserva}` }
      }
    }));

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar pagamentos", details: err });
  }
});

/* ============================================================
   OBTER UM PAGAMENTO ESPECÍFICO
   GET /pagamentos/:id
============================================================ */
router.get("/:id", async (req, res) => {
  try {
    const pagamento = await Pagamento.findByPk(req.params.id, {
      include: [{ model: Reserva }]
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
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pagamento", details: err });
  }
});

/* ============================================================
   CRIAR PAGAMENTO
   POST /pagamentos
============================================================ */
router.post("/", async (req, res) => {
  try {
    const pagamento = await Pagamento.create(req.body);

    res.status(201).json({
      ...pagamento.toJSON(),
      _links: {
        self: { href: `/pagamentos/${pagamento.id_pagamento}` },
        all: { href: "/pagamentos" }
      }
    });
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar pagamento", details: err });
  }
});

/* ============================================================
   ATUALIZAR UM PAGAMENTO
   PUT /pagamentos/:id
============================================================ */
router.put("/:id", async (req, res) => {
  try {
    const pagamento = await Pagamento.findByPk(req.params.id);

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
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar pagamento", details: err });
  }
});

/* ============================================================
   DELETAR UM PAGAMENTO
   DELETE /pagamentos/:id
============================================================ */
router.delete("/:id", async (req, res) => {
  try {
    const rows = await Pagamento.destroy({
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
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar pagamento", details: err });
  }
});

export default router;
