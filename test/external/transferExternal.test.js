// Libs
const request = require('supertest');
const sinon = require('sinon')
const { expect } = require('chai');

//tests
describe('Transfer', ()=>{
    describe('POST /transfers', ()=>{
        it('Quando informo remetente e destinatários inexistentes recebo 400', async ()=> {
            const response = await request('http://localhost:3000')
                .post('/transfer')
                .send({                  
                    from: "Julio",
                    to: "Matheus",
                    amount: 10000
            });

            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
        })
    })
})