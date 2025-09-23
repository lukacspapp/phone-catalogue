import { Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/", (_req, res) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

export default healthRoutes;