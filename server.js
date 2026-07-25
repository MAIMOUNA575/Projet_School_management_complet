import express from 'express';
import studentRouter from './routes/studentRoute.js'
import teacherRouter from './routes/teacherRoute.js'
import subjectRouter from './routes/subjectRoute.js'
import gradeRouter from './routes/gradeRoute.js'
import absenceRouter from './routes/absenceRoute.js'
import userRouter from './routes/userRoute.js'


const app = express();

app.use(express.json())

const PORT = 3000

app.use('/api/students', studentRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/grades", gradeRouter);
app.use("/api/absences", absenceRouter);
app.use("/api/users", userRouter);


app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});