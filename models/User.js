/****Création d'un schéma pour l'enregistrement des utilisateurs dans la base de données en utilisant le plugin mongoose-unique-validator*/ //
/*Ce plugin évite l'enregistrement de plusieurs d'utilisateur avec le même logging.****/

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLength: 6,
    },

    likes: [String],
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
