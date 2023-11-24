const User = require("../models/user");
const { validationResult, matchedData } = require("express-validator");

const validation_result = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

const validate = (req, res, next) => {
  const errors = validation_result(req).mapped();
  if (Object.keys(errors).length) {
    return res.status(422).json({
      status: 422,
      errors,
    });
  }
  next();
};

const fetchByUsername = async (data) => {
  const row = await User.find({ username: data }).exec();
  return row;
};
const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (e) {
    if (e.code == 11000) {
      //Duplicated
      res.status(404).send(e);
    } else {
      res.status(404).send(e);
    }
  }
};

module.exports = {
  signup,
  fetchByUsername,
  validate,
};
