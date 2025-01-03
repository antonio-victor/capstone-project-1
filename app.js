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
app.get("/", async (req, res) => {
    try {
        const drinks = [];

        for (let i = 0; i < 4; i++) {
            const randomDrink = await axios.get(
                "https://thecocktaildb.com/api/json/v1/1/random.php"
            );
            drinks.push(randomDrink.data);
        }
        console.log(drinks[0]);
        res.render("index", { drinks }); // Renderiza o arquivo views/index.ejs
    } catch (error) {
        console.error("Erro ao fazer a chamada:", error.message);
        res.status(500).json({ error: "Erro ao buscar dados" });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
