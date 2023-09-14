import chai from "chai";
import supertest from "supertest";
import env from "../config.js";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Test login and Current", () => {
  let cookieName;
  let cookieValue;
  const mockUser = {
    email: env.adminName,
    password: env.adminPassword,
  };

  it("Must login user and return a cookie", async () => {
    const result = await requester.post("/api/sessions/login").send({
      email: mockUser.email,
      password: mockUser.password,
    });

    const cookie = result.headers["set-cookie"][0];
    expect(cookie).to.be.ok;

    cookieName = cookie.split("=")[0];
    cookieValue = cookie.split("=")[1];

    expect(cookieName).to.be.ok.and.eql("connect.sid");
    expect(cookieValue).to.be.ok;
  });

  it("Send request to current with cookie", async () => {
    const { _body } = await requester
      .get("/api/sessions/current")
      .set("Cookie", [`${cookieName}=${cookieValue}`]);

    expect(_body.data.email).to.be.eql(mockUser.email);
  });
});
