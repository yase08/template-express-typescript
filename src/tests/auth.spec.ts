import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { faker } from "@faker-js/faker";
import { Express } from "express";
import { App } from "../server";

// Berfungsi untuk testing api

chai.use(chaiHttp);
const expect = chai.expect;

describe("Testing - auth", () => {
  let app: Express;

  before(() => {
    app = new App().app;
  });

  it("should be login incorect password", function (done) {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .set("Content-Type", "application/json")
      .send({ email: "user@gmail.com", password: "user" })
      .end((err, res) => {
        expect(res.body.statusCode).to.be.equal(400);
        expect(res.body.statusMessage).to.be.equal(
          "Incorect email or password"
        );
        done();
      });
  });

  it("should be login success", function (done) {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .set("Content-Type", "application/json")
      .send({ email: "user@gmail.com", password: "user123" })
      .end((err, res) => {
        expect(res.body.statusCode).to.be.equal(200);
        expect(res.body.statusMessage).to.be.equal("Login success");
        done();
      });
  });

  it("should be register email already taken", function (done) {
    chai
      .request(app)
      .post("/api/v1/auth/register")
      .set("Content-Type", "application/json")
      .send({
        email: "user@gmail.com",
        password: "user123",
      })
      .end((err, res) => {
        expect(res.body.statusCode).to.be.equal(400);
        expect(res.body.statusMessage).to.be.equal("Email already taken");
        done();
      });
  });

  it("should be register success", function (done) {
    chai
      .request(app)
      .post("/api/v1/auth/register")
      .set("Content-Type", "application/json")
      .send({
        email: faker.internet.email(),
        password: "user12345",
      })
      .end((err, res) => {
        expect(res.body.statusCode).to.be.equal(200);
        expect(res.body.statusMessage).to.be.equal(
          "Create new account success"
        );
        done();
      });
  });
});
