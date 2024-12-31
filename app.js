import express from "express";
import bodyParser from "body-parser";
import path from "path";
import axios from "axios";

const app = express();
const PORT = 3000;

// Configurar o body-parser para lidar com requisições
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Configurar o diretório público
app.use(express.static(path.join(path.resolve(), "public")));

// Definir o mecanismo de visualização como EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Rota principal
app.get("/", (req, res) => {
    res.render("index"); // Renderiza o arquivo views/index.ejs
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
