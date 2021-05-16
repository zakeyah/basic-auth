'use strict';
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server').app;
const mockServer = supergoose(server);

const newUser={
    "username":"zakeyah",
    "password":"12345"
}

describe('router test ', () => {
    it('should create a new User on POST /signup', async () => {
      const response = await mockServer.post('/signup').send({
            "username":"zakeyah",
            "password":"12345"
      });
      expect(response.status).toEqual(200);
      expect(response.body.username).toEqual('zakeyah');
    });

    // it('should singin on POST /signin', async () => {
    //     const response = await mockServer.post('/signup').send(newUser);
    //   console.log(newUser.password)
    //     // mockServer.headers.authorization = value; 
    //     req.setRequestHeader('Authorization', 'Basic [base64 encoded password here]' );
    //     const response2 = await (await mockServer.post('/signin')).req.setRequestHeader('Authorization', 'Basic [base64 encoded password here]' );
    //     expect(response2.body.username).toEqual('zakeyah');
    //   });
})
