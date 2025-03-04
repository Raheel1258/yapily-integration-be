import express from "express";
import routes from "./routes/routes.js";

const app = express();

const port = process.env.PORT || 5000;

app.use(routes)

app.get('/', (req, res) => {
    res.send("hello world!")
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})