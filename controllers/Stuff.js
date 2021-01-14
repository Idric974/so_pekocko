const Sauces = require("../models/Sauces");

exports.createSauces = (req, res, next) => {
  const Sauces = new Sauces({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
  });
  console.log(Sauces);
  sauces
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

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

exports.modifySauces = (req, res, next) => {
  const sauces = new Sauces({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  Sauces.updateOne({ _id: req.params.id }, sauces)
    .then(() => {
      res.status(201).json({
        message: "Sauces updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteSauces = (req, res, next) => {
  Sauces.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "sauce supprimée",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllStuff = (req, res, next) => {
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
