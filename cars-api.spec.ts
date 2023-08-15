import request from 'supertest';
import app from './index'

test('car value based on model and year', async () => {
   //Arrange
    const carDetails = { "model": "Civic", "year": 2014 };
    //Action - calling a function, API or webpage
    const data = await request(app)
        .post('/suggested-car')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(carDetails));
    //Assert
    expect(data.status).toBe(200);
});