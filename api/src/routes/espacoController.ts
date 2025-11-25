import { Router, Request, Response } from "express";
import sequelize from "../database";
import Espaco from "../models/Espaco";
import { QueryTypes } from "sequelize";

const router = Router();

const ESPACO_SCHEMA = "dona_maria_schema";
const ESPACO_TABLE = "espaco";

/* ================================
   CREATE – POST /espacos/create
================================ */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const { nome, descricao, capacidade, preco, tipo, diasindisponiveis } = req.body;

    if (!capacidade || !preco) {
      return res.status(400).json({ error: "capacidade and preco are required" });
    }

    const espaco = await Espaco.create({
      nome,
      descricao,
      capacidade,
      preco,
      tipo,
      diasindisponiveis,
    });

    return res.status(201).json(espaco);
  } catch (error) {
    console.error("Error creating Espaco:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   READ ALL – GET /espacos/all
================================ */
router.get("/all", async (_req: Request, res: Response) => {
  try {
    const query = `
      SELECT *
      FROM ${ESPACO_SCHEMA}.${ESPACO_TABLE}
      ORDER BY id_espaco ASC;
    `;

    const espacos = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    if (espacos.length === 0) {
      return res.status(404).json({ error: "No Espaco records found" });
    }

    res.status(200).json(espacos);
  } catch (error) {
    console.error("Error fetching Espaco records:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   READ ONE – GET /espacos/getOne/:id
================================ */
router.get("/getOne/:id", async (req: Request, res: Response) => {
  try {
    const espaco = await Espaco.findByPk(req.params.id);

    if (!espaco) {
      return res.status(404).json({ error: "Espaco not found" });
    }

    res.status(200).json(espaco);
  } catch (error) {
    console.error("Error fetching Espaco:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   UPDATE – PUT /espacos/update/:id
================================ */
router.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const { nome, descricao, capacidade, preco, tipo, diasindisponiveis } = req.body;

    const espaco = await Espaco.findByPk(req.params.id);

    if (!espaco) {
      return res.status(404).json({ error: "Espaco not found" });
    }

    await espaco.update({
      nome,
      descricao,
      capacidade,
      preco,
      tipo,
      diasindisponiveis,
    });

    res.status(200).json(espaco);
  } catch (error) {
    console.error("Error updating Espaco:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   DELETE – DELETE /espacos/delete/:id
================================ */
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const espaco = await Espaco.findByPk(req.params.id);

    if (!espaco) {
      return res.status(404).json({ error: "Espaco not found" });
    }

    await espaco.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting Espaco:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

export default router;
