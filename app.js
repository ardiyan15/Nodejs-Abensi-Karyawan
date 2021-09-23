const path = require("path");
const express = require("express");
const csrf = require("csurf");
const session = require("express-session");
const flash = require("express-flash");

const { sequelize } = require("./models");
const csrfProtection = csrf({});

const app = express();

app.use(express.urlencoded({ extended: false }));

const homeRoutes = require("./routes/Home");
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const employeeRoutes = require("./routes/Employee");
const absensiRoutes = require("./routes/Absensi");
const authRoutes = require("./routes/Auth");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public/assets")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(homeRoutes);
app.use(userRoutes);
app.use(profileRoutes);
app.use(employeeRoutes);
app.use(absensiRoutes);
app.use(authRoutes);

sequelize
  .authenticate()
  .then(() => {
    app.listen(8000, () => console.log("Server is running on port 8000"));
  })
  .catch((err) => console.log(err));
