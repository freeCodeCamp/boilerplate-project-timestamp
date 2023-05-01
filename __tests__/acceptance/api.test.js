const supertest = require("supertest");

const app = require("../../index");

describe("API tests", () => {
  it("should return JSON", async () => {
    const response = await supertest(app).get("/api/hello");

    expect(response.body).toMatchObject({
      greeting: expect.any(String),
    });
  });

  it("should have CORS enabled", async () => {
    const response = await supertest(app).get("/api/hello");

    expect(Object.keys(response.headers)).toContain(
      "access-control-allow-origin"
    );
  });

  it("should return status code 200", async () => {
    const response = await supertest(app).get("/api/hello");

    expect(response.statusCode).toBe(200);
  });
});
