import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
