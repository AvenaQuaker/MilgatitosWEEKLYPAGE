import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: (origin, callback) => {
            const ACCEPTED_ORIGINS = [
                "http://localhost:5500",
                "http://localhost:8080",
                "http://localhost:1234",
                "https://milgatitosweeklypage.onrender.com",
            ];

            if (ACCEPTED_ORIGINS.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("No permitido"), false);
            }
        },
    })
);

const PORT = process.env.PORT ?? 1234;

app.post("/Guardar", (req, res) => {
    const eventos = req.body;
    const file = path.join(process.cwd(), "Datos.json");
    const tempFile = path.join(process.cwd(), "Datos.tmp.json");

    fs.writeFile(tempFile, JSON.stringify(eventos), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al guardar los eventos");
        } else {
            fs.rename(tempFile, file, (renameErr) => {
                if (renameErr) {
                    console.error(renameErr);
                    res.status(500).send("Error al renombrar el archivo");
                } else {
                    res.send("Eventos guardados correctamente");
                }
            });
        }
    });
});

app.get("/Cargar", (req, res) => {
    const file = path.join(process.cwd(), "Datos.json");

    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al cargar los eventos");
        } else {
            const eventos = JSON.parse(data);
            res.send(eventos);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
