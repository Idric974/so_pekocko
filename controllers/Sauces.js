/****Implémentation des routes CRUD (Create, Read, Update, Delete)****/

const Sauces = require("../models/Sauces");
const fs = require("fs");
const { post } = require("../routes/User");

/****Create : créer une nouvelle sauce****/
exports.createSauces = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce);

  const sauces = new Sauces({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  console.log(sauces.imageUrl);
  sauces.save(function (err, b) {
    if (err) {
      console.log("#########", err);
      res.status(400).json({
        error: err,
      });
    } else {
      console.log(b);
      res.status(201).json({
        message: "Sauces crée!",
      });
    }
  });
};
/*****************************************/

/****Read : afficher la fiche produit d'une sauce****/
exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id,
  })
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
/*****************************************/

/****Update : mettre à jour la fiche produit d’une sauce****/
exports.modifySauces = (req, res, next) => {
  const saucesObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauces.updateOne(
    { _id: req.params.id },
    { ...saucesObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};
/*****************************************/

/****Delete : supprimer la fiche produit d’une sauce****/
exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      const filename = sauces.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
/*****************************************/

/****Afficher toutes le sauces****/
exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

/*****************************************/

/****Create : Cré un like****/
exports.likeSauces = (req, res, next) => {
  console.log("############----OK1----############");

  Sauces.Update()

    .then(() => res.status(200).json({ message: "Like ajouté" }))
    .catch((error) => res.status(400).json({ error }));
};
/*****************************************/
