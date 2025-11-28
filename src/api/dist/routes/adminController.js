"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
const ADM_1 = __importDefault(require("../models/ADM"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
const ADM_SCHEMA = "dona_maria_schema";
const ADM_TABLE = "ADM";
/* ================================
   CREATE – POST /adm/create
================================ */
router.post("/create", async (req, res) => {
    try {
        const { nome, cpf, datanasc } = req.body;
        if (!nome || !cpf) {
            return res.status(400).json({ error: "nome and cpf are required" });
        }
        const adm = await ADM_1.default.create({ nome, cpf, datanasc });
        return res.status(201).json(adm);
    }
    catch (error) {
        console.error("Error creating ADM:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   READ ALL – GET /adm
================================ */
router.get("/all", async (_req, res) => {
    try {
        const query = `
      SELECT *
      FROM ${ADM_SCHEMA}.${ADM_TABLE}
      ORDER BY id_adm ASC;
    `;
        const adms = await database_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (adms.length === 0) {
            return res.status(404).json({ error: "No ADM records found" });
        }
        res.status(200).json(adms);
    }
    catch (error) {
        console.error("Error fetching ADM records:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   READ ONE – GET /adm/:id
================================ */
router.get("/getById/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const adm = await ADM_1.default.findByPk(id);
        if (!adm) {
            return res.status(404).json({ error: "ADM not found" });
        }
        res.status(200).json(adm);
    }
    catch (error) {
        console.error("Error fetching ADM:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   UPDATE – PUT /adm/:id
================================ */
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, cpf, datanasc } = req.body;
        const adm = await ADM_1.default.findByPk(id);
        if (!adm) {
            return res.status(404).json({ error: "ADM not found" });
        }
        await adm.update({ nome, cpf, datanasc });
        res.status(200).json(adm);
    }
    catch (error) {
        console.error("Error updating ADM:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   DELETE – DELETE /adm/:id
================================ */
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const adm = await ADM_1.default.findByPk(id);
        if (!adm) {
            return res.status(404).json({ error: "ADM not found" });
        }
        await adm.destroy();
        return res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting ADM:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
exports.default = router;
