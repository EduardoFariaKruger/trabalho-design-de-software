import { Router, Request, Response } from "express";
import sequelize from "../database";
import ADM from "../models/ADM";
import { QueryTypes } from "sequelize";

const router = Router();

const ADM_SCHEMA = "dona_maria_schema";
const ADM_TABLE = "ADM";

/* ================================
   CREATE – POST /adm/create
================================ */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ error: "login e senha são necessários para criação de um ADM" });
    }

	const adm = await ADM.create({ login, senha });


    return res.status(201).json(adm);
  } catch (error) {
    console.error("Error creating ADM:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   READ ALL – GET /adm
================================ */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const query = `
      SELECT *
      FROM ${ADM_SCHEMA}.${ADM_TABLE}
      ORDER BY id_adm ASC;
    `;

    const adms = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    if (adms.length === 0) {
      return res.status(404).json({ error: "No ADM records found" });
    }

    res.status(200).json(adms);
  } catch (error) {
    console.error("Error fetching ADM records:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   READ ONE – GET /adm/:id
================================ */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const adm = await ADM.findByPk(id);

    if (!adm) {
      return res.status(404).json({ error: "ADM not found" });
    }

    res.status(200).json(adm);
  } catch (error) {
    console.error("Error fetching ADM:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   UPDATE – PUT /adm/:id
================================ */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { login, senha } = req.body;

    const adm = await ADM.findByPk(id);

    if (!adm) {
      return res.status(404).json({ error: "ADM not found" });
    }

    await adm.update({ login, senha });

    res.status(200).json(adm);
  } catch (error) {
    console.error("Error updating ADM:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   DELETE – DELETE /adm/:id
================================ */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const adm = await ADM.findByPk(id);

    if (!adm) {
      return res.status(404).json({ error: "ADM not found" });
    }

    await adm.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting ADM:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

export default router;
