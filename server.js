const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "thallesytofc@gmail.com";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SESSION_SECRET || "CHANGE_THIS",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  }
}));

const bookings = [];

app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (email !== ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
    return res.status(401).json({ ok: false });
  }

  const ok = await bcrypt.compare(
    password || "",
    ADMIN_PASSWORD_HASH
  );

  if (!ok) {
    return res.status(401).json({ ok: false });
  }

  req.session.admin = true;

  res.json({ ok: true });
});

app.post("/api/bookings", (req, res) => {
  const booking = {
    ...req.body,
    id: Date.now(),
    status: "Pendente"
  };

  bookings.push(booking);

  console.log("Novo agendamento:", booking);

  res.json({
    ok: true,
    id: booking.id
  });
});

app.get("/api/bookings", (req, res) => {
  if (!req.session.admin) {
    return res.status(401).json({ ok: false });
  }

  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`Assistência Técnica TH rodando na porta ${PORT}`);
});
