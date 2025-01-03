const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let baseUrl;

describe('Resource API', () => {
    before(async () => {
        try {
            const { address, port } = await server.address();
            baseUrl = `http://${address === '::' ? 'localhost' : address}:${port}`;
        } catch (err) {
            throw new Error('Failed to start server for tests');
        }
    });

    after(() => {
        return new Promise((resolve, reject) => {
            server.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    });

    let count = 0;
    let studentId = '1735871159357';

    describe('GET /view-Student', () => {
        it('should return all students', (done) => {
            chai.request(baseUrl)
                .get('/view-Student')
                .end((err, res) => {
                    count = res.body.length;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe(`DELETE /delete-Student/${studentId}`, () => {
        it('should delete an existing resource', (done) => {
            chai.request(baseUrl)
                .delete(`/delete-Student/${studentId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Student deleted successfully!');
                    count++;
                    done();
                });
        });

        it('should return 404 if student is not found', (done) => {
            chai.request(baseUrl)
                .delete(`/delete-Student/${studentId}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.message).to.equal('Student not found');
                    done();
                });
        });

        it('should return 400 for invalid ID', (done) => {
            chai.request(baseUrl)
                .delete(`/delete-Student/hi`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal('Valid student ID is required');
                    done();
                });
        });
    });

    after(() => {
        console.log(`Total successful deletions during tests: ${count}`);
    });
});
