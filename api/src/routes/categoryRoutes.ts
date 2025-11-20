import { Router, Request, Response } from "express";
import Category from "../models/Category";

const router = Router();

// Rota para buscar todas as categorias
router.get("/all", async (req: Request, res: Response) => {
	//logica aqui
});

export default router;
