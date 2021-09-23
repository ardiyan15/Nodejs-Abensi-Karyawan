const { Employee } = require("../models");

exports.index = async (req, res, next) => {
  const employees = await Employee.findAll({
    where: {
      deleted: false,
    },
    order: [["id", "DESC"]],
    raw: true,
  });

  res.render("employee/index", {
    title: "List Karyawan",
    active: "Karyawan",
    employees,
  });
};

exports.add = (req, res, next) => {
  res.render("employee/form", {
    title: "Add Employee",
    active: "Karyawan",
    employee: "",
  });
};

exports.save = async (req, res, next) => {
  const { nik, fullname, division } = req.body;

  try {
    await Employee.create({
      nik,
      fullname,
      division,
    });
    res.status(200);
    req.flash("info", {
      type: "add",
      added: true,
    });
    res.redirect("/employee");
  } catch (err) {
    throw err;
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.body;

  try {
    await Employee.update(
      {
        deleted: true,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200);
    res.redirect("/employee");
  } catch (err) {
    throw err;
  }
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findByPk(id);

  try {
    res.render("employee/form", {
      employee,
      title: "Edit Karyawan",
      active: "karyawan",
    });
  } catch (err) {
    throw err;
  }
};

exports.update = async (req, res, next) => {
  const { id, nik, fullname, division } = req.body;

  try {
    await Employee.update(
      {
        nik,
        fullname,
        division,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200);
    res.redirect("/employee");
  } catch (err) {
    throw err;
  }
};
