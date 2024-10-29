import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const apiKey = "e92f490b788dbe1436345f2fc32bd64e";
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/weather", async (req, res) => {
    const location = req.query.location;

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        res.json(response.data)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Could not retrieve weather data. Please try again." })
    }

});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});