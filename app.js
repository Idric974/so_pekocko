const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const stuffRoutes = require("./routes/Stuff");
const userRoutes = require("./routes/User");

/****Permet la connexion à la base de données  MongodB **********/
mongoose
  .connect(
    "mongodb+srv://idric:QTuFKc2h8PQwEYL9@clusterocr.5mhqb.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
/****************************************************************/

const app = express();

/****Middleware généraliste qui permet la connexion entre l'application et l'API  et évite les erreurs CORS*****/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/****Transforme le corps de la requête en objet JSON*****/
app.use(bodyParser.json());
/********************************************************/

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
