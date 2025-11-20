import { Router, Request, Response } from "express";
import City from "../models/City";

const router = Router();

router.get("/cities", async (req: Request, res: Response) => {
  try {
    const cities = await City.findAll({
        attributes: [
            'citie_name'
        ],
    });
    res.json(cities);
  } catch (error) {
    console.error("Could not search for cities:", error);
    res.status(500).json({ error: "Error in finding cities, please contact support if the problem persist" });
  }
});

router.get("/countries", async (req: Request, res: Response) => {
  try {
    const cities = await City.findAll({
        attributes: [
            'country'
        ],
    });
    res.json(cities);
  } catch (error) {
    console.error("Could not search for countries:", error);
    res.status(500).json({ error: "Error in finding countries, please contact support if the problem persist" });
  }
});


export default router;
