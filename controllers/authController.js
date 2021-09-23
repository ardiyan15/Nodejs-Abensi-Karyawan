const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.getLogin = (req, res, next) => {
  res.render("auth/login");
};

exports.postLogin = async (req, res, next) => {
  const { username, password } = req.body;

  console.log(username);

  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(422).render("auth/login");
    }
    const result = await bcrypt.compare(password, user.password);
    console.log(result);
    if (result) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      await req.session.save();
      return res.redirect("/");
    }
  } catch (err) {
    throw err;
  }
};

exports.logout = async (req, res, next) => {
  await req.session.destroy();
  return res.redirect("/login");
};
