import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing router products", () => {
  it("the endpoint should return an array of products", async () => {
    const { statusCode, _body } = await requester.get("/api/products");

    expect(statusCode).to.eql(200);
    expect(_body.docs).to.be.an("array");
    // to test its effectively returning a Product
    expect(_body.docs[0]).to.include({ owner: "admin" });
  });
});
