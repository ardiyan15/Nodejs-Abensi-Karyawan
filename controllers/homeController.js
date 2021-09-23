exports.index = (req, res, next) => {
  res.render("home/index", {
    title: "Dashboard",
    active: "dashboard",
  });
};
