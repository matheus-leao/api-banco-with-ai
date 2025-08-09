// Libs
const request = require('supertest');
const sinon = require('sinon')
const { expect } = require('chai');

// App
const app = require('../../app');

// Testes
describe('Transfer Controller', ()=>{
    describe('GET /transfers', ()=>{
        it('Buscar todas as transferências existentes', async ()=>{
            const response = await request(app).get('/transfers');
            expect(response.statusCode).to.equal(200)
        })
    })

    describe('POST /transfers', ()=>{
        it('Quando informo remetente e destinatários inexistentes recebo 400', async ()=> {
            const response = await request(app)
                .post('/transfer')
                .send({                  
                    from: "Julio",
                    to: "Matheus",
                    amount: 10000
            });

            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('error', 'Remetente ou destinatário não encontrado')
        })

    })
    
})
