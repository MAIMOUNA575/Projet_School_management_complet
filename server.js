import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import studentRouter from './routes/studentRoute.js'
import teacherRouter from './routes/teacherRoute.js'
import subjectRouter from './routes/subjectRoute.js'
import gradeRouter from './routes/gradeRoute.js'
import absenceRouter from './routes/absenceRoute.js'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import statistiqueSimpleRoute from './routes/statistiqueSimpleRoute.js'


const app = express();
app.use(cors());
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.redirect('/index.html')
});

app.get('/connexion', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.get('/acceuil', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/dashboard.html'));
});

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/users.html'));
});

app.get('/students', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/students.html'));
});

app.get('/teacher', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/teacher.html'));
});

app.get('/subjects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/subjects.html'));
});

app.get('/grades', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/grades.html'));
});

app.get('/absences', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/absences.html'));
});

app.get('/statistiques', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/statistiques.html'));
});

app.get('/profil', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/profil.html'));
});


const PORT = 3000

app.use('/api/students', studentRouter);
app.use('/api/auth', authRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/grades", gradeRouter);
app.use("/api/absences", absenceRouter);
app.use("/api/users", userRouter);
app.use("/api/statistiques", statistiqueSimpleRoute);


app.use((req, res) => {
  res.status(404).json({
    message: "Route introuvable"
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Erreur interne du serveur"
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}/connexion`);
});