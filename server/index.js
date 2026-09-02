// ── SECTION: Securing your backend API ───────────────────────────────────
// Minimal server wiring — just enough to demonstrate requireAuth on a
// real route. Run alongside the Next.js dev server: `npm run dev` in
// /server, `npm run dev` in the project root, two terminals.
import "dotenv/config";
import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(adminRouter);

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`Backend API listening on http://localhost:${port}`);
});
