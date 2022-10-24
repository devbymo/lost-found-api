import supertest from 'supertest'
import app from '../app'

// create a request object
const request = supertest(app)

describe('USERS ENDPOINTS', () => {
  it('POST /api/v1/users/signup', () => {
    request
      .post('/api/v1/users/signup')
      .send({
        name: 'Mohamed Yasser',
        phoneNumber: '01000000000',
        password: '123456',
        city: 'Cairo', // optional
        country: 'Egypt', // optional
      })
      .then((res) => {
        expect(res.status).toBe(99999)
      })
  })
})
