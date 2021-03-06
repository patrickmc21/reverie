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
      });
  });
});

describe('api endpoints', () => {

  beforeEach(() => {
    return db.migrate.rollback()
      .then(() => {
        return db.migrate.latest();
      })
      .then(() => {
        return db.seed.run();
      })
      .catch(error => {
        return error;
      });
  });

  describe('GET /api/v1/hosts', () => {
    it('should return all robots', (done) => {
      chai.request(app)
        .get('/api/v1/hosts')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('date_added');
          response.body[0].date_added.should
            .equal(new Date('5/21/2018').toISOString());
          response.body[0].should.have.property('first_active');
          response.body[0].first_active.should
            .equal(new Date('5/21/2018').toISOString());
          response.body[0].should.have.property('current_name');
          response.body[0].current_name.should.equal('R2-D2');
          response.body[0].should.have.property('height');
          response.body[0].height.should.equal(3.25);
          response.body[0].should.have.property('weight');
          response.body[0].weight.should.equal(200);
          response.body[0].should.have.property('intelligence_metric');
          response.body[0].intelligence_metric.should.equal(18);
          done();
        });
    });
  });

  describe('POST /api/v1/hosts', () => {
    it('should add a new robot to the database', (done) => {
      chai.request(app)
        .post('/api/v1/hosts')
        .send({
          date_added: '5/23/2018',
          first_active: '5/23/2018',
          current_name: "T-1000",
          height: 6.5,
          weight: 400,
          intelligence_metric: 19
        })
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(3);
          response.body.should.have.property('date_added');
          response.body.date_added.should
            .equal(new Date('5/23/2018').toISOString());
          response.body.should.have.property('first_active');
          response.body.first_active.should
            .equal(new Date('5/23/2018').toISOString());
          response.body.should.have.property('current_name');
          response.body.current_name.should.equal('T-1000');
          response.body.should.have.property('height');
          response.body.height.should.equal(6.5);
          response.body.should.have.property('weight');
          response.body.weight.should.equal(400);
          response.body.should.have.property('intelligence_metric');
          response.body.intelligence_metric.should.equal(19);
          done();
        });
    });

    it('should not add robot if invalid body supplied', (done) => {
      chai.request(app)
        .post('/api/v1/hosts')
        .send({
          date_added: '5/23/2018',
          first_active: '5/23/2018',
          height: 6.5,
          weight: 400,
          intelligence_metric: 19
        })
        .end((error, response) => {
          response.should.have.status(405);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should
            .equal('Invalid input, please supply a current_name');
          done();
        });
    });
  });

  describe('GET /api/v1/hosts/:id', () => {
    it('should return a single robot', (done) => {
      chai.request(app)
        .get('/api/v1/hosts/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
          response.body.should.have.property('date_added');
          response.body.date_added.should
            .equal(new Date('5/21/2018').toISOString());
          response.body.should.have.property('first_active');
          response.body.first_active.should
            .equal(new Date('5/21/2018').toISOString());
          response.body.should.have.property('current_name');
          response.body.current_name.should.equal('R2-D2');
          response.body.should.have.property('height');
          response.body.height.should.equal(3.25);
          response.body.should.have.property('weight');
          response.body.weight.should.equal(200);
          response.body.should.have.property('intelligence_metric');
          response.body.intelligence_metric.should.equal(18);
          done();
        });
    });

    it('should return a 404 status on invalid id', (done) => {
      chai.request(app)
        .get('/api/v1/hosts/4')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.have.property('message');
          response.body.message.should.equal('Entry not found');
          done();
        });
    });
  });
  
  describe('PUT /api/v1/hosts/:id', () => {
    it('should update a robot', (done) => {
      chai.request(app)
        .put('/api/v1/hosts/1')
        .send({
          id: 1,
          date_added: '5/21/2018',
          first_active: '5/21/2018',
          current_name: "R2-D2",
          height: 3.25,
          weight: 300,
          intelligence_metric: 18
        })
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
          response.body.should.have.property('date_added');
          response.body.date_added.should
            .equal(new Date('5/21/2018').toISOString());
          response.body.should.have.property('first_active');
          response.body.first_active.should
            .equal(new Date('5/21/2018').toISOString());
          response.body.should.have.property('current_name');
          response.body.current_name.should.equal('R2-D2');
          response.body.should.have.property('height');
          response.body.height.should.equal(3.25);
          response.body.should.have.property('weight');
          response.body.weight.should.equal(300);
          response.body.should.have.property('intelligence_metric');
          response.body.intelligence_metric.should.equal(18);
          done();
        });
    });

    it('should return 404 if entry not found', (done) => {
      chai.request(app)
        .put('/api/v1/hosts/4')
        .send({
          id: 4,
          date_added: '5/21/2018',
          first_active: '5/21/2018',
          current_name: "R2-D2",
          height: 3.25,
          weight: 300,
          intelligence_metric: 18
        })
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('Entry not found');
          done();
        });
    });

    it('should return 405 if invlid input provided', (done) => {
      chai.request(app)
        .put('/api/v1/hosts/1')
        .send({
          id: 1,
          date_added: '5/21/2018',
          first_active: '5/21/2018',
          current_name: "R2-D2",
          weight: 300,
          intelligence_metric: 18
        })
        .end((error, response) => {
          response.should.have.status(405);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should
            .equal('Invalid input, input must include height');
          done();
        });
    });
  });

  describe('DELETE /api/v1/hosts/:id', () => {
    it('should delete a robot entry', (done) => {
      chai.request(app)
        .delete('/api/v1/hosts/2')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.have.property('message');
          response.body.message.should.equal('Robot Data Deleted');        
          done();
        });
    });

    it('should return 404 if no entry found', (done) => {
      chai.request(app)
        .delete('/api/v1/hosts/3')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.have.property('message');
          response.body.message.should.equal('Entry not found');        
          done();
        });
    });
  });
});