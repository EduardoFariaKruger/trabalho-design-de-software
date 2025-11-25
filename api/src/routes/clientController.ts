import { Router, Request, Response } from "express";
import Cliente from "../models/Cliente";

const router = Router();

/* ================================
   CREATE – POST /clientes/create
================================ */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const { nome, cpf, datanasc } = req.body;

    if (!nome || !cpf) {
      return res.status(400).json({ error: "nome and cpf are required" });
    }

    const cliente = await Cliente.create({ nome, cpf, datanasc });

    return res.status(201).json(cliente);
  } catch (error) {
    console.error("Error creating Cliente:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   READ ALL – GET /clientes/all
================================ */
router.get("/all", async (_req: Request, res: Response) => {
  try {
    const clientes = await Cliente.findAll();

    if (clientes.length === 0) {
      return res.status(404).json({ error: "No Cliente records found" });
    }

    return res.status(200).json(clientes);
  } catch (error) {
    console.error("Error fetching Cliente records:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   READ ONE – GET /clientes/:id
================================ */
router.get("getOne/:id", async (req: Request, res: Response) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente not found" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.error("Error fetching Cliente:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   UPDATE – PUT /clientes/:id
================================ */
router.put("update/:id", async (req: Request, res: Response) => {
  try {
    const { nome, cpf, datanasc } = req.body;
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente not found" });
    }

    await cliente.update({ nome, cpf, datanasc });

    return res.status(200).json(cliente);
  } catch (error) {
    console.error("Error updating Cliente:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

/* ================================
   DELETE – DELETE /clientes/:id
================================ */
router.delete("delete/:id", async (req: Request, res: Response) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente not found" });
    }

    await cliente.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting Cliente:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});

export default router;
