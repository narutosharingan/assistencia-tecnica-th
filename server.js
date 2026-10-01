const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "thallesytofc@gmail.com";

const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || "";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "assistencia-tecnica-th-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }
  })
);

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Arquivos do site
app.use(express.static(__dirname));

// Login do administrador
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body || {};

  if (
    email === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD
  ) {
    req.session.admin = true;

    return res.json({
      ok: true
    });
  }

  res.status(401).json({
    ok: false,
    message: "E-mail ou senha incorretos."
  });
});

// Verificar login
app.get("/api/admin/status", (req, res) => {
  res.json({
    admin: !!req.session.admin
  });
});

// Sair
app.post("/api/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

// Agendamentos
const bookings = [];

app.post("/api/bookings", (req, res) => {
  const booking = {
    id: Date.now(),
    ...req.body,
    status: "Pendente",
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);

  console.log("NOVO AGENDAMENTO:");
  console.log(booking);

  res.json({
    ok: true,
    booking
  });
});

// Painel administrativo
app.get("/api/bookings", (req, res) => {
  if (!req.session.admin) {
    return res.status(401).json({
      ok: false
    });
  }

  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(
    `Assistência Técnica TH funcionando na porta ${PORT}`
  );
});
