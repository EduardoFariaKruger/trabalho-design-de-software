import { Request, Response, NextFunction } from "express";
import Reserva from "../models/Reserva";
import Espaco from "../models/Espaco";
import { Op } from "sequelize";

export async function verificarDisponibilidade(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id_espaco, data } = req.body;
    const id_reserva = req.params.id; // <-- usar params

    if (!id_espaco || !data) {
      return res.status(400).json({ error: "id_espaco e data são obrigatórios." });
    }

    const espaco = await Espaco.findByPk(id_espaco);
    if (!espaco) {
      return res.status(404).json({ error: "Espaço não encontrado." });
    }

    // Busca reserva conflitante ignorando a própria reserva
    const reservaExistente = await Reserva.findOne({
      where: { id_espaco, data, ...(id_reserva ? { id_reserva: { [Op.ne]: id_reserva } } : {}) },
    });

    if (reservaExistente) {
      return res.status(409).json({
        error: "Espaço indisponível nesta data.",
        dataConflitante: data,
      });
    }

    const diasInd = espaco.diasindisponiveis || [];
    if (diasInd.includes(data)) {
      return res.status(409).json({
        error: "Espaço indisponível nesta data.",
        dataConflitante: data,
      });
    }

    next();
  } catch (error: any) {
    console.error("Erro no middleware verificarDisponibilidade:", error);
    return res.status(500).json({
      error: "Erro interno no middleware",
      details: error.message,
    });
  }
}