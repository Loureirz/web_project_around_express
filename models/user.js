const { Schema, model } = require("mongoose");

const linkValid = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\/?.*$/i;

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    required: true,
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator: function (v) {
        console.log("Validando URL:", v);
        return linkValid.test(v);
      },
      message: (props) => `"${props.value}" não é um link válido.`,
    }
  },
});

const User = model("User", userSchema);

module.exports = User;