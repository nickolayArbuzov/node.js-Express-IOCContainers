import request from 'supertest'
import { app } from '..'

describe('/video', () => {

    beforeAll(async () => {
        await request(app).delete('')
    })

    it('should return', async () => {
        await request(app)
            .get('/videos')
            .expect(200, [])
    })

    it('should return', async () => {
        await request(app)
            .post('/videos')
            .expect(200, [])
    })

    it('should return', async () => {
        await request(app)
            .put('/videos')
            .expect(200, [])
    })

    it('should return', async () => {
        await request(app)
            .delete('/videos')
            .expect(200, [])
    })

})