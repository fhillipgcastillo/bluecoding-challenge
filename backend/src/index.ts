import express from 'express';
import cors from "cors";
import shortenerRouter from './routes/shortener';
import "./db"
import "./services/job"

const app = express();
const port = process.env.PORT || 8080;

//cors
const options = {
  origin: 'http://localhost:3000',
}
app.use(cors(options))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', shortenerRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;

