"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cliente_1 = __importDefault(require("../models/Cliente"));
const router = (0, express_1.Router)();
/* ================================
   CREATE – POST /clientes
================================ */
router.post("/clientes", async (req, res) => {
    try {
        const { nome, cpf, datanasc } = req.body;
        if (!nome || !cpf) {
            return res.status(400).json({ error: "nome and cpf are required" });
        }
        const cliente = await Cliente_1.default.create({ nome, cpf, datanasc });
        return res.status(201).json(cliente);
    }
    catch (error) {
        console.error("Error creating Cliente:", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   READ ALL – GET /clientes
================================ */
router.get("/clientes", async (_req, res) => {
    try {
        const clientes = await Cliente_1.default.findAll();
        if (clientes.length === 0) {
            return res.status(404).json({ error: "No Cliente records found" });
        }
        return res.status(200).json(clientes);
    }
    catch (error) {
        console.error("Error fetching Cliente records:", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   READ ONE – GET /clientes/:id
================================ */
router.get("/clientes/:id", async (req, res) => {
    try {
        const cliente = await Cliente_1.default.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: "Cliente not found" });
        }
        return res.status(200).json(cliente);
    }
    catch (error) {
        console.error("Error fetching Cliente:", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   UPDATE – PUT /clientes/:id
================================ */
router.put("/clientes/:id", async (req, res) => {
    try {
        const { nome, cpf, datanasc } = req.body;
        const { id } = req.params;
        const cliente = await Cliente_1.default.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: "Cliente not found" });
        }
        await cliente.update({ nome, cpf, datanasc });
        return res.status(200).json(cliente);
    }
    catch (error) {
        console.error("Error updating Cliente:", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
/* ================================
   DELETE – DELETE /clientes/:id
================================ */
router.delete("/clientes/:id", async (req, res) => {
    try {
        const cliente = await Cliente_1.default.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: "Cliente not found" });
        }
        await cliente.destroy();
        return res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting Cliente:", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});
exports.default = router;
