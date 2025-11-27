import express from "express";
import Reserva from "../models/Reserva";
import Cliente from "../models/Cliente";
import Espaco from "../models/Espaco";
import ADM from "../models/ADM";

const router = express.Router();

/* ============================================================
   LISTAR TODAS AS RESERVAS
   GET /reservas
============================================================ */
router.get("/", async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        { model: Cliente },
        { model: Espaco },
        { model: ADM }
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
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar reservas", details: err });
  }
});

/* ============================================================
   OBTER UMA RESERVA ESPECÍFICA
   GET /reservas/:id
============================================================ */
router.get("/:id", async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id, {
      include: [
        { model: Cliente },
        { model: Espaco },
        { model: ADM }
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
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar reserva", details: err });
  }
});

/* ============================================================
   CRIAR UMA RESERVA
   POST /reservas
============================================================ */
router.post("/", async (req, res) => {
  try {
    const reserva = await Reserva.create(req.body);

    res.status(201).json({
      ...reserva.toJSON(),
      _links: {
        self: { href: `/reservas/${reserva.id_reserva}` },
        all: { href: "/reservas" }
      }
    });
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar reserva", details: err });
  }
});

/* ============================================================
   ATUALIZAR RESERVA
   PUT /reservas/:id
============================================================ */
router.put("/:id", async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id);

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
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar reserva", details: err });
  }
});

/* ============================================================
   DELETAR UMA RESERVA
   DELETE /reservas/:id
============================================================ */
router.delete("/:id", async (req, res) => {
  try {
    const rows = await Reserva.destroy({
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
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar reserva", details: err });
  }
});

export default router;
