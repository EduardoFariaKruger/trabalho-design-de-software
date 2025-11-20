import { Router, Request, Response } from "express";
import axios from "axios";
import { Op } from "sequelize";
import Event from "../models/Event";
import sequelize from "../database";
import { fetchHtml, mapPartners, mapContacts } from "../utils/scraper";
import Category from "../models/Category";
import { QueryTypes } from "sequelize";

const router = Router();

const EVENTS_SCHEMA = process.env.DB_SCHEMA || "events_schema";
const EVENTS_TABLE = process.env.EVENTS_TABLE || "events";
const CATEGORY_COLUMN = process.env.EVENTS_CATEGORY_COLUMN || "category_english"; // default: category_english


router.post("/searchbycategory", async (req: Request, res: Response) => {
  try {
    const { category: categoryEnglish = "", city = "", upcoming = false } = req.body;

    if (!categoryEnglish.trim()) {
      return res.status(400).json({ error: "category is required" });
    }

    const isUpcoming = String(upcoming).toLowerCase() === "true";

    const categories = categoryEnglish
      .split(/\s+/)
      .map((c: string) => c.trim())
      .filter(Boolean);

    if (categories.length === 0) {
      return res.status(400).json({ error: "No valid categories provided" });
    }

    // Monta as condições dinâmicas com AND (categorias)
    const categoryConditions = categories
      .map((_: string, idx: number) => `${CATEGORY_COLUMN} ILIKE :cat${idx}`)
      .join(" AND ");

    let whereClause = `(${categoryConditions})`;

    // Filtro opcional por cidade
    if (city && city.trim() !== "") {
      whereClause += ` AND city ILIKE :city`;
    }

    if (isUpcoming) {
      whereClause += ` AND init_date >= CURRENT_DATE`;
    }

    const query = `
      SELECT 
        category_english AS category,
        city,
        name,
        date,
        location,
        init_date,
        ending_date,
        event_website
      FROM ${EVENTS_SCHEMA}.${EVENTS_TABLE}
      WHERE ${whereClause}
      LIMIT 100;
    `;

    // Preenche replacements dinamicamente
    const replacements: Record<string, string> = {};
    categories.forEach((cat: string, idx: number) => {
      replacements[`cat${idx}`] = `%${cat}%`;
    });

    if (city && city.trim() !== "") {
      replacements["city"] = `%${city.trim()}%`;
    }

    const events = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    if (events.length === 0) {
      return res.status(404).json({ error: "No events found for this category/city" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error in searching events by category:", error);
    res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
});




router.post("/search", async (req: Request, res: Response) => {
  try {
    const { event_name = "", upcoming = false } = req.body;

    const search = event_name.trim();
    const isUpcoming = String(upcoming).toLowerCase() === "true";

    let whereClause = "";
    if (search) {
      whereClause += `name % :search`;
    } else {
        res.status(400).json({ error: "event_name not defined" })
    }

    if (isUpcoming) {
      whereClause += ` AND init_date >= CURRENT_DATE`;
    }

    const query = `
      SELECT *
      FROM events_schema.events
      WHERE ${whereClause}
      ${search ? `ORDER BY similarity(name, :search) DESC` : ""}
      LIMIT 100;
    `;

    const events = await sequelize.query(query, {
      replacements: { search },
      type: QueryTypes.SELECT,
    });

    if (events.length === 0) {
      return res.status(404).json({ error: "no events found" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error in searching for events:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: (error as Error).message });
  }
});



router.post("/searchlocation", async (req: Request, res: Response) => {
  try {
    const { city, upcoming } = req.body;

    if (!city || typeof upcoming === "undefined") {
      return res.status(400).json({ error: "city and upcoming are required" });
    }

    const isUpcoming = String(upcoming).toLowerCase() === "true";

    let whereClause = `LOWER(city) = LOWER(:city)`;
    if (isUpcoming) {
      whereClause += ` AND init_date >= CURRENT_DATE`;
    }

    const query = `
      SELECT *
      FROM events_schema.events
      WHERE ${whereClause}
      ORDER BY init_date ASC
      LIMIT 100;
    `;

    const events = await sequelize.query(query, {
      replacements: { city },
      type: QueryTypes.SELECT,
    });

    if (events.length === 0) {
      return res.status(404).json({ error: "no events found for this city" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Could not find events by location:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: (error as Error).message });
  }
});

router.post("/funders", async (req: Request, res: Response) => {
  try {
    const url = String(req.body.url || "").trim();

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const html = await fetchHtml(url);

    const result = await mapPartners(html);

    if (!result)
    {
        return res.status(404).json({ result: "could not find any funders" });
    }
    console.log(result);
    res.status(200).json(result);
    
  } catch (error) {
    console.error("Url prvided did not respond:", error);
    res.status(500).json({
      error: "Error in fetchin url",
      details: (error as Error).message,
    });
  }
});

router.post("/contacts", async (req: Request, res: Response) => {
  try {
    const url = String(req.body.url || "").trim();

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const html = await fetchHtml(url);
    const result = await mapContacts(html);

    if (!result || (
        Array.isArray(result.linkedin) && result.linkedin.length === 0 &&
        Array.isArray(result.email) && result.email.length === 0 &&
        Array.isArray(result.phone) && result.phone.length === 0
      )) {
      return res.status(404).json({ result: "could not find any contacts" });
    }

    console.log(result);
    res.status(200).json(result);

  } catch (error) {
    console.error("Error fetching or parsing contact info:", error);
    res.status(500).json({
      error: "Error fetching url or extracting contacts",
      details: (error as Error).message,
    });
  }
});

export default router;
