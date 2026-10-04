import assert from "node:assert";
import app from "./src/app.js";

// describe("Array", function () {
//   describe("#indexOf()", function () {
//     it("should return -1 when the value is not present", function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

describe("API Tests", () => {


  it("should return API working message", async () => {
    const response = await request(app).get("/api");
    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.body, { message: "API is working" });
  });
});