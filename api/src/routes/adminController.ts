import { Request, Response } from "express";
import ADM from "../models/ADM.js";

export const getAllADM = async (req: Request, res: Response) => {
  try {
    const admins = await ADM.findAll();
    return res.json(admins);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar administradores" });
  }
};

export const getADMById = async (req: Request, res: Response) => {
  try {
    const adm = await ADM.findByPk(req.params.id);

    if (!adm) {
      return res.status(404).json({ error: "Administrador não encontrado" });
    }

    return res.json(adm);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar administrador" });
  }
};

export const createADM = async (req: Request, res: Response) => {
  const { nome, cpf, dataNasc } = req.body;

  try {
    const novoADM = await ADM.create({ nome, cpf, dataNasc });
    return res.status(201).json(novoADM);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar administrador" });
  }
};

export const updateADM = async (req: Request, res: Response) => {
  const { nome, cpf, dataNasc } = req.body;

  try {
    const adm = await ADM.findByPk(req.params.id);

    if (!adm) {
      return res.status(404).json({ error: "Administrador não encontrado" });
    }

    await adm.update({ nome, cpf, dataNasc });

    return res.json(adm);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar administrador" });
  }
};

export const deleteADM = async (req: Request, res: Response) => {
  try {
    const adm = await ADM.findByPk(req.params.id);

    if (!adm) {
      return res.status(404).json({ error: "Administrador não encontrado" });
    }

    await adm.destroy();
    return res.json({ message: "Administrador removido com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao remover administrador" });
  }
};
