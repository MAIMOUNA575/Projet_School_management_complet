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


const app = express();

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.redirect('/index.html')
});

app.get('/acceuil', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.get('/absences', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/absences.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/dashboard.html'));
});

app.get('/grades', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/grades.html'));
});

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/users.html'));
});

app.get('/profil', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/profil.html'));
});

app.get('/teacher', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/teacher.html'));
});

app.get('/students', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/students.html'));
});

app.get('/statistiques', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/statistiques.html'));
});

app.get('/subjects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/subjects.html'));
});

const PORT = 3000











app.use('/api/students', studentRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/grades", gradeRouter);
app.use("/api/absences", absenceRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}/acceuil`);
});