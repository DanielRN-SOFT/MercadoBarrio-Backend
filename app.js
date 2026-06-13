require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("src/db/prisma");

// ── Importar rutas de cada módulo ───────────────────────────────────
const categoriasRoutes = require("src/modules/Categorias/categorias.routes");

const app = express();

// ── Middlewares globales ────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Rutas ────────────────────────────────────────────────────────────
const API = "/api/";
app.use(`${API}/categorias`, categoriasRoutes);

// ── Arrancar servidor ────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await prisma.$connect();
    console.log("✅ Conexión a la BD establecida (Prisma).");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📡 API base: http://localhost:${PORT}${API}`);
    });
  } catch (err) {
    console.error("❌ No se pudo conectar a la BD:", err);
    process.exit(1);
  }
})();

module.exports = app;
