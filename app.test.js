var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./bin/www');

chai.should();
chai.use(chaiHttp);

describe('CURD API FOR TESTING', () => {

    describe('GET/users', () => {
        it('It should be return all the users.', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(4);
                    done();
                })
        })
    })

    describe('GET/users/:id', () => {
        it('It should be return only requested user data.', (done) => {
            chai.request(server)
                .get(`/users/${'i001'}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.should.have.property('message');
                    res.body.data.should.have.property('id').eq('i001');
                    done();
                })
        })
    })

    describe('POST/users/create', () => {
        it('It should be create user.', (done) => {
            let data = {
                "email": "swtbhsm@gmail.com",
                "firstName": "Swetabh",
                "lastname": "Suman"
            }
            chai.request(server)
                .post(`/users/create`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('success').eq(true);

                    done();
                })
        })
    })

    describe('PUT/users/update/:id', () => {
        it('It should be updated user data.', (done) => {
            let data = {
                id: "i001",
                email: "swtbh@gmail.com",
                firstName: "Swetabh",
                lastname: "Suman"
            }
            chai.request(server).put(`/users/update/${data.id}`).send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    done();
                })
        })
    })
    describe('DELETE/users/delete/:id', () => {
        it('It should be deleted user data.', (done) => {
            let data = {
                id: "i001",
                email: "swtbh@gmail.com",
                firstName: "Swetabh",
                lastname: "Suman"
            }
            chai.request(server).delete(`/users/delete/${data.id}`).send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    done();
                })
        })
    })
})