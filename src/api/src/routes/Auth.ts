
import { Router, Request, Response } from "express";
import ADM from "../models/ADM";
import sequelize from "../database";
import { QueryTypes } from "sequelize";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ error: "Login e senha são obrigatórios." });
    }

    const adm = await ADM.findOne({
      where: {
        login: login,
      },
    });

    if (!adm) {
      return res.status(401).json({ error: "Login não encontrado." });
    }

    if (adm.getDataValue('senha') !== senha) {
      return res.status(401).json({ error: "Senha incorreta. " });
    }
    
    const admData = {
        id_adm: adm.getDataValue('id_adm'),
        login: adm.getDataValue('login'),
    };

    return res.status(200).json({
        message: "Login bem-sucedido.",
        user: admData,
        token: "fake_jwt_token_for_dona_maria_reservas",
    });

  } catch (error) {
    console.error("Erro ao tentar login:", error);
    res.status(500).json({
      error: "Erro interno do servidor durante a autenticação.",
      details: (error as Error).message,
    });
  }
});

export default router;
