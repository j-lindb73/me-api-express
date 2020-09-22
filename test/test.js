process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const db = require("../db/database.js");
const { before } = require('mocha');

chai.should();

chai.use(chaiHttp);

describe('app', () => {
    // before(() => {
    //     return new Promise((resolve) => {

    //     })
    // });
    describe('GET /', () => {
        it('200 HAPPY PATH getting base', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
        it('GET register', (done) => {
            chai.request(server)
                .get("/register")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
        it('GET login', (done) => {
            chai.request(server)
                .get("/login")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
        it('GET invalid route', (done) => {
            chai.request(server)
                .get("/invalid")
                .end((err, res) => {
                    res.should.have.status(404);

                    done();
                });
        });
    });
    describe('POST', () => {
        it('POST register new user should work', (done) => {
            let user= {
                email: "test@test.se",
                password: "test123"
            };
            
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        })
        it('POST register new user shold not work (no email)', (done) => {
            let user= {
                // email: "test@test.se",
                password: "test123"
            };

            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        })
        it('POST login user should work', (done) => {
            let user= {
                email: "test@test.se",
                password: "test123"
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        })
    });
    describe('DELETE', () => {
        it('DELETE registered user should work', (done) => {
            let user= {
                email: "test@test.se"
            };
            
            chai.request(server)
                .delete("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        })

    });
});