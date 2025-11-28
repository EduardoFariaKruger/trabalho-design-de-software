"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
const Espaco_1 = __importDefault(require("../models/Espaco"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
const ESPACO_SCHEMA = "dona_maria_schema";
const ESPACO_TABLE = "espaco";
/* ================================
   CREATE – POST /espacos
================================ */
router.post("/espacos", async (req, res) => {
    try {
        const { nome, descricao, capacidade, preco, tipo, diasindisponiveis } = req.body;
        if (!capacidade || !preco) {
            return res.status(400).json({ error: "capacidade and preco are required" });
        }
        const espaco = await Espaco_1.default.create({
            nome,
            descricao,
            capacidade,
            preco,
            tipo,
            diasindisponiveis,
        });
        return res.status(201).json(espaco);
    }
    catch (error) {
        console.error("Error creating Espaco:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ===============================
   READ ALL – GET /espacos
================================ */
router.get("/espacos", async (_req, res) => {
    try {
        const query = `
      SELECT *
      FROM ${ESPACO_SCHEMA}.${ESPACO_TABLE}
      ORDER BY id_espaco ASC;
    `;
        const espacos = await database_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (espacos.length === 0) {
            return res.status(404).json({ error: "No Espaco records found" });
        }
        res.status(200).json(espacos);
    }
    catch (error) {
        console.error("Error fetching Espaco records:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   READ ONE – GET /espacos/:id
================================ */
router.get("/espacos/:id", async (req, res) => {
    try {
        const espaco = await Espaco_1.default.findByPk(req.params.id);
        if (!espaco) {
            return res.status(404).json({ error: "Espaco not found" });
        }
        res.status(200).json(espaco);
    }
    catch (error) {
        console.error("Error fetching Espaco:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   UPDATE – PUT /espacos/:id
================================ */
router.put("/espacos/:id", async (req, res) => {
    try {
        const { nome, descricao, capacidade, preco, tipo, diasindisponiveis } = req.body;
        const espaco = await Espaco_1.default.findByPk(req.params.id);
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
    }
    catch (error) {
        console.error("Error updating Espaco:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   DELETE – DELETE /espacos/:id
================================ */
router.delete("/espacos/:id", async (req, res) => {
    try {
        const espaco = await Espaco_1.default.findByPk(req.params.id);
        if (!espaco) {
            return res.status(404).json({ error: "Espaco not found" });
        }
        await espaco.destroy();
        return res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting Espaco:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
exports.default = router;
