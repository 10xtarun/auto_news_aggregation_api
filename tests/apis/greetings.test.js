const { request, expect } = require("../../test.config")

describe("Greetings API", function () {

    // afterAll(async () => {
    //     await new Promise(resolve => setTimeout(() => resolve(), 3000)); // avoid jest open handle error
    // });

    it("should return greetings message from the API", function (done) {
        request
            .get("/greetings")
            .end((err, res) => {
                console.log(err, res.body)
                expect(res.statusCode).equal(200)
                expect(res.body.message).equal("Hello World!")
                done(err)
            })
    })
})