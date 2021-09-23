exports.index = (req, res, next) => {
  res.render("absensi/index", {
    active: "absensi",
    title: "Absensi Karyawan",
  });
};
