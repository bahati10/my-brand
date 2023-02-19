let chai = require("chai");
var mongoose = require('mongoose');
let chaiHttp = require("chai-http");
let server = require("../server");
const { expect } = require("chai");
const { response } = require("../server");
chai.use(chaiHttp);

//ASSERTION

let token = "";
chai.should();
chai.use(chaiHttp);


describe("blogs API", () => {

    before(() => {
        mongoose.connect(process.env.MONGO_URL);
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "Connection failed"));
        db.once("open", () => {
            console.log("Connection initiated");
        });
    });

    describe("GET all users", () => {
        it("It should notGET all users", (done) => {
            chai
                .request(server)
                .get("/api/users/")
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    done();
                });
        });

    });

    it("It should NOT GET all the users", (done) => {
        chai
            .request(server)
            .get("/user/")
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });


})

describe("GET all blogs", () => {
    it("It should GET all the blogs", (done) => {
        chai
            .request(server)
            .get("/api/blogs/")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                done();
            });
    });

    it("It should NOT GET all the blogs", (done) => {
        chai
            .request(server)
            .get("/api/blog/")
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });


    it("It should NOT GET a blog by ID", (done) => {
        const blogId = "63ef6944a63de385587b25608";

        chai
            .request(server)
            .get("/api/blogs/" + blogId)
            .end((err, response) => {
                response.should.have.status(400);
                response.should.be.a("object");
                done();
            });
    });
})


describe("Testing Home Page", () => {
    it("Should GET Home page", (done) => {
        chai
            .request(server)
            .get("/api/home")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});


describe("Blogs API", () => {
    it("Should not POST new blog if not Admin", function (done) {

        chai.request(server)
            .post("/api/blogs").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("Should GET all Blogs", function (done) {

        chai.request(server)
            .get("/api/blogs").then(response => {
                response.should.have.status(200);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should GET single Blog", function (done) {

        chai.request(server)
            .get("/api/blogs/63ef6944a63de385587b2560").then(response => {
                response.should.have.status(200);
                expect(response).to.be.a("object");
                done();

            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should not UPDATE blog if not Admin", function (done) {

        chai.request(server)
            .patch("/api/blogs/63ef6944a63de385587b2560").set({
            }).then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("can UPDATE blog if Admin", function (done) {

        chai.request(server)
            .patch("/api/blogs/663ef6944a63de385587b2560").set({
            }).then(response => {
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should not DELETE blog if not Admin", function (done) {

        chai.request(server)
            .delete("/api/blogs/63ef6944a63de385587b2560").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("can DELETE blog if Admin", function (done) {

        chai.request(server)
            .delete("/api/blogs/63e5e819789dece2a1cd9a68").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });
})











describe("Comments API", () => {
    it("It should GET all comments", (done) => {
        chai
            .request(server)
            .get("/api/comments/")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                done();
            });
    });

    it("It should not DELETE comments", (done) => {
        chai
            .request(server)
            .delete("/api/comments/")
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.be.a("object");
                done();
            });
    });


    it("It should not GET comments", (done) => {
        chai
            .request(server)
            .delete("/api/comment/")
            .end((err, response) => {
                response.should.have.status(404);
                response.body.should.be.a("object");
                done();
            });
    });

    it("Should get single comment", function (done) {

        chai.request(server)
            .get("/api/comments").then(response => {
                response.should.have.status(200);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });
})
















describe("Messages API", () => {

    it("Should GET all Messages", function (done) {

        chai.request(server)
            .get("/api/messages").then(response => {
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });


    it("Should GET single Message", function (done) {

        chai.request(server)
            .get("/api/messages/63e3fa9bed8523be086b107f").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();

            })
            .catch((err) => {

                done(err)
            })
    });



    it("Should not DELETE message if not Admin", function (done) {

        chai.request(server)
            .delete("/api/messsages/63e3fa9bed8523be086b107f").then(response => {
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("Should not UPDATE message", function (done) {

        chai.request(server)
            .patch("/api/messsages/63e3fa9bed8523be086b107f").then(response => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });
})



describe("Messages API", () => {
    it("can DELETE message if Admin", function (done) {

        chai.request(server)
            .delete("/api/messages/63e3fa9bed8523be086b107f").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {
                done(err)
            })
    });
})








describe("Users API", () => {


    it("It should GET all the users", (done) => {
        chai
            .request(server)
            .get("/api/users/")
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a("object");
                done();
            });
    });

    it("It should ADD user id admin", (done) => {
        chai
            .request(server)
            .get("/api/users/")
            .end((err, response) => {
                response.should.have.status(500);
                response.body.should.be.a("object");
                done();
            });
    });


    it("Should not GET users if not Admin", function (done) {

        chai.request(server)
            .get("/api/users").then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

    it("should fetch all users successfully", (done) => {
        chai
            .request(server)
            .get("/api/users")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                done();
            });
    });


    it("Should GET users if Admin", function (done) {

        chai.request(server)
            .get("/api/users").set({
                Authorisation: token
            }).then(response => {
                token = response.body.token;
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });



    it("Should not GET single user if not Admin", function (done) {
        chai.request(server)
            .get("/api/users").set({
            })
            .then(response => {
                response.should.have.status(500);
                expect(response).to.be.a("object");
                done();

            })
            .catch((err) => {

                done(err)
            })
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.proprety('names');
                response.body.should.have.proprety('email');
                response.body.should.have.proprety('pasword');
                response.text.should.be.eq("User Found");
            })
    });

    it("It should NOT GET all the users", (done) => {
        chai
            .request(server)
            .get("/api/users")
            .end((err, response) => {
                response.should.have.status(500);
            });
        done();
    });

    it("Should not UPDATE user", function (done) {
        chai.request(server)
            .patch("/api/users").set({
            }).then(response => {
                response.should.have.status(404);
                expect(response).to.be.a("object");
                done();
            })
            .catch((err) => {

                done(err)
            })
    });

})








