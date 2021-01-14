/****Création d'un schéma pour l'enregistrement des utilisateurs dans la base de données en utilisant le plugin mongoose-unique-validator*/ //
/*Ce plugin évite l'enregistrement de plusieurs d'utilisateur avec le même logging.****/

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
