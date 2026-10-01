const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "assistencia-th-secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  })
);

// Arquivos do site
app.use(express.static(path.join(__dirname)));

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Teste do servidor
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Rota de login
app.post("/login", (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Nome e e-mail são obrigatórios."
    });
  }

  // Login do administrador
  if (email.toLowerCase() === "thallesytofc@gmail.com") {
    return res.json({
      sucesso: true,
      admin: true,
      mensagem: "Administrador identificado."
    });
  }

  // Login normal do cliente
  return res.json({
    sucesso: true,
    admin: false,
    mensagem: "Cliente identificado."
  });
});

// Inicialização
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando na porta ${PORT}`);
  console.log(`Servidor disponível em 0.0.0.0:${PORT}`);
});
