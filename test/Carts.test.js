import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing router carts", () => {
  let cookieName;
  let cookieValue;
  const mockUser = {
    email: "tomasvilla@gmail.com",
    password: "1234",
  };
  let currentUser;

  // First login to get cookie
  before(async () => {
    const result = await requester.post("/api/sessions/login").send({
      email: mockUser.email,
      password: mockUser.password,
    });

    const cookie = result.headers["set-cookie"][0];
    cookieName = cookie.split("=")[0];
    cookieValue = cookie.split("=")[1];

    const { _body } = await requester
      .get("/api/sessions/current")
      .set("Cookie", [`${cookieName}=${cookieValue}`]);

    currentUser = _body.data;
  });

  it("Should return all products of cart", async () => {
    const { statusCode, _body } = await requester.get(
      `/api/carts/${currentUser.cart}`
    );

    expect(statusCode).to.eql(200);
    expect(_body.data).to.be.an("array");
  });

  it("Should add a product to the cart", async () => {
    const { statusCode, _body } = await requester
      .post(
        `/api/carts/${currentUser.cart}/product/${"6483de46fc7349e7c00e5476"}`
      )
      .set("Cookie", [`${cookieName}=${cookieValue}`]);

    expect(statusCode).to.eql(201);
  });
});
