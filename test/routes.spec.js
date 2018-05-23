const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, db } = require('../server');

chai.use(chaiHttp);

describe('client routes', () => {
  it('should deliver the homepage', (done) => {
    chai.request(app)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });

  it('should deliver 404 status on invalid request', (done) => {
    chai.request(app)
      .get('/cyborgs')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      })
  })
});

describe('api endpoints', () => {

  
})