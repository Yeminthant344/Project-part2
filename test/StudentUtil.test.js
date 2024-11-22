const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let baseUrl;

describe('Student API', () => {
    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address == '::' ? 'localhost' : address}:${port}`;
    });

    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });

    let studentId;  // Declare studentId to store added student's ID

    describe('GET /view-Student', () => {
        it('should return all students', (done) => {
            chai.request(baseUrl)
                .get('/view-Student')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('POST /add-Student', () => {
        it('should return 400 for validation errors', (done) => {
            chai.request(baseUrl)
                .post('/add-Student')
                .send({ 
                    name: 'John Doe', 
                    address: '123 Main St', 
                    gender: 'invalid' 
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal('Validation error');
                    done();
                });
        });

        it('should add a new student', (done) => {
            chai.request(baseUrl)
                .post('/add-Student')
                .send({ 
                    name: 'John Doe', 
                    address: '123 Main St', 
                    gender: 'Male' 
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.greaterThan(0);
                    
                    // Store the ID of the newly added student
                    studentId = res.body[res.body.length - 1].id;  // Adjust based on your actual response structure
                    
                    done();
                });
        });
    });

    describe('PUT /update-Student/:id', () => {
        it('should update an existing student', (done) => {
            chai.request(baseUrl)
                .put(`/update-Student/${studentId}`)
                .send({ 
                    name: 'Updated Name', 
                    address: 'New Address', 
                    gender: 'Female' 
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Student updated successfully!');
                    done();
                });
        });
    });

    describe('DELETE /delete-Student/:id', () => {
        it('should delete an existing student', (done) => {
            chai.request(baseUrl)
                .delete(`/delete-Student/${studentId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Student deleted successfully!');
                    done();
                });
        });
    });
});