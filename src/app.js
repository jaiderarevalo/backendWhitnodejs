import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/tasks.routes.js";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(morgan("dev")); // para que salga todas las solicitudes  en  la consola del server
app.use(express.json());
app.use(cookieParser()); // es para poder ver  las cookies osea el token en la consola

app.use("/route", authRoutes);
app.use("/route", taskRoutes);

export default app;
