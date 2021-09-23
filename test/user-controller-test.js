const expect = require("chai").expect;
const sequelize = require("../config/DB");

const { User } = require("../models/Users");
const UserController = require("../controllers/userController");

sequelize.sync();

const req = {
  body: {
    fullname: "test",
    username: "test",
    password: "123456",
    role: "user",
  },
};

const res = {
  statusCode: 200,
  status: function (code) {
    this.statusCode = code;
    return this;
  },
};

describe("CRUD Users", function () {
  it("should send status with code 200 - Created", function (done) {
    UserController.save(req, res, () => {}).then(() => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("Shoud be send status with code 200 - Deleted", function (done) {
    const dataId = {
      body: {
        id: 1,
      },
    };

    UserController.save(req, res, () => {}).then(() => {
      UserController.delete(dataId, res, () => {}).then(() => {
        expect(res.statusCode).to.equal(200);
        done();
      });
      done();
    });
  });

  it("Should be send status with code 200 - Update", function (done) {
    const req = {
      body: {
        fullname: "test",
        username: "test",
        password: "123456",
        role: "user",
        id: 1,
      },
    };

    UserController.save(req, res, () => {}).then(() => {
      UserController.update(req, res, () => {}).then(() => {
        expect(res.statusCode).to.equal(200);
        done();
      });
      done();
    });
  });
  User.drop();
});
