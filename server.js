// import express from 'express';
// import studentRouter from './routes/studentRoute.js'
// import teacherRouter from './routes/teacherRoute.js'
// import subjectRouter from './routes/subjectRoute.js'
// import gradeRouter from './routes/gradeRoute.js'
// import absenceRouter from './routes/absenceRoute.js'
// import userRouter from './routes/userRoute.js'

// const app = express();

// app.use(express.json())

// const PORT = 3000

// app.use('/api/students', studentRouter);
// app.use("/api/teachers", teacherRouter);
// app.use("/api/subjects", subjectRouter);
// app.use("/api/grades", gradeRouter);
// app.use("/api/absences", absenceRouter);
// app.use("/api/users", userRouter);

// app.listen(PORT, () => {
//   console.log(`Serveur démarré sur http://localhost:${PORT}`);
// });





import express from "express";
import cors from "cors";

import studentRouter from "./routes/studentRoute.js";
import teacherRouter from "./routes/teacherRoute.js";
import subjectRouter from "./routes/subjectRoute.js";
import gradeRouter from "./routes/gradeRoute.js";
import absenceRouter from "./routes/absenceRoute.js";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/students", studentRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/grades", gradeRouter);
app.use("/api/absences", absenceRouter);

// Route d'accueil
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'Application School Management",
  });
});

// Gestion des routes inexistantes
app.use((req, res) => {
  res.status(404).json({
    message: "Route introuvable",
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
