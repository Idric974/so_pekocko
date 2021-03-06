/****Implémentation des routes CRUD (Create, Read, Update, Delete)****/

const Sauces = require("../models/Sauces");
const fs = require("fs");
const { post } = require("../routes/User");

//fonction utilitaire
function supLike(sauceId, userId, res) {
  Sauces.updateOne(
    { _id: sauceId },

    { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
  )
    .then(() => {
      res.status(201).json({ message: "like supprimé" });
    })
    .catch((err) => {
      console.log("Erreur UpDate like", err);
      res.status(400).json({ error: err });
    });
}

function supDislike(sauceId, userId, res) {
  Sauces.updateOne(
    { _id: sauceId },

    { $set: { dislikes: 0 }, $pull: { usersDisliked: userId } }
  )
    .then(() => {
      res.status(201).json({ message: "Dislike supprimé" });
    })
    .catch((err) => {
      console.log("Erreur UpDate Dislike", err);
      res.status(400).json({ error: err });
    });
}
/****************************************************************/

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
/*******************************************************************************/

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
/*******************************************************************************/

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
/*******************************************************************************/

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
/*******************************************************************************/

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

/*******************************************************************************/
/****Create : Créer un LIKE****/

exports.likesSauces = (req, res, next) => {
  req.params.id;
  //console.log("=====> l'ID de la sauce est:", req.params.id);

  req.body.userId;
  //console.log("==========> l'ID de l'user est:", req.body.userId);

  /****Si l'utilisateur aime la sauce*******************************************/
  if (req.body.like == 1) {
    console.log(
      "=====> L'utilisateur aime la sauce ==> Paramètres URL = ",
      req.body.like
    );
    Sauces.updateOne(
      { _id: req.params.id },

      { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
    )
      .then(() => {
        res.status(200).json({ message: "Like ajouté" });
      })
      .catch((err) => {
        console.log("Erreur UpDate Like", err);
        res.status(400).json({ error: err });
      });

    /*Si non l'utilisateur n'aime pas la sauce******************************************/
  } else if (req.body.like == -1) {
    console.log(
      "=====> L'utilisateur n'aime pas la sauce ==> Paramètres URL = ",
      req.body.like
    );
    Sauces.updateOne(
      { _id: req.params.id },

      { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
    )
      .then(() => {
        res.status(200).json({ message: "Dislike ajouté" });
      })
      .catch((err) => {
        console.log("Erreur UpDate Dislike", err);
        res.status(400).json({ error: err });
      });

    /*Si l'utilisateur souhaite annuler son like ou Dislike******************************************************/
  } else {
    Sauces.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (!sauce) {
          return res.status(404).json({ message: "Pas de sauce" });
        }
        if (sauce.usersLiked.includes(req.body.userId)) {
          supLike(req.params.id, req.body.userId, res);
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          supDislike(req.params.id, req.body.userId, res);
          console.log(
            "=====> L'utilisateur annule son Dislike ==> Paramètres URL = ",
            req.body.like
          );
        } else {
          return res.status(400).json({ message: "erreur" });
        }
      })
      .catch((error) => res.status(500).json({ error }));

    /****DISLIKE****/
  }
};

/*************************************************** */
