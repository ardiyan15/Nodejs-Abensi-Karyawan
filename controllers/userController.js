const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../models");

exports.index = async (req, res, next) => {
  let message = req.flash() || "";
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      where: {
        deleted: false,
      },
      order: [["id", "DESC"]],
      raw: true,
    });
    res.render("user/index", {
      title: "List User",
      active: "user",
      users,
      message,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.addUser = (req, res, next) => {
  res.render("user/add", {
    title: "Add User",
    user: "",
    active: "user",
  });
};

exports.save = async (req, res, next) => {
  const { fullname, username, password } = req.body;
  console.log(req.body);
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      await User.create({
        fullname,
        username,
        password: hash,
      });
      res.status(200);
      req.flash("info", {
        type: "add",
        added: true,
      });
      res.redirect("/users");
    } catch (err) {
      req.flash("info", {
        type: "add",
        added: false,
      });
      res.redirect("/users");
    }
  });
};

exports.delete = async (req, res, next) => {
  const { id } = req.body;
  try {
    await User.update(
      { deleted: true },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200);
    req.flash("info", {
      type: "deleted",
      deleted: true,
    });
    res.redirect("/users");
  } catch (err) {
    req.flash("info", {
      type: "deleted",
      deleted: false,
    });
    res.redirect("/users");
  }
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const roles = [
    {
      value: "admin",
      name: "admin",
    },
    {
      value: "user",
      name: "user",
    },
  ];
  try {
    const user = await User.findByPk(id);
    res.render("user/add", {
      title: "Edit User",
      user,
      roles,
    });
  } catch (err) {
    res.send("error");
  }
};

exports.update = async (req, res, next) => {
  let { id, password, fullname, username, role } = req.body;

  let passwordHashed;
  if (password !== "") {
    passwordHashed = await bcrypt.hash(password, saltRounds);
  }

  try {
    await User.update(
      {
        username,
        password: passwordHashed,
        fullname,
        role,
      },
      { where: { id: id } }
    );
    res.status(200);
    req.flash("info", {
      type: "updated",
      updated: true,
    });
    res.redirect("/users");
  } catch (err) {
    res.send("error");
  }
};
