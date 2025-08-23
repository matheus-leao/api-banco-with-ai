// Libs
const request = require('supertest');
const sinon = require('sinon')
const { expect } = require('chai');

// App
const app = require('../../app');
// Mock
const transferService = require('../../service/transferService')

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
                    amount: 100
            });

            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
        })
        it('Usando mocks: Quando informo remetente e destinatários inexistentes recebo 400', async ()=> {
            // Criando mock
            const transferServiceMock = sinon.stub(transferService, "createTransfer")
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'))

            const response = await request(app)
                .post('/transfer')
                .send({                  
                    from: "Julio",
                    to: "Matheus",
                    amount: 100
            });

            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado')
        })

        it('Usando mocks: Quando informo valores válidos recebo 201', async ()=> {
            // Criando mock
            const transferServiceMock = sinon.stub(transferService, "createTransfer")
            transferServiceMock.returns({
                    from: "julio",
                    to: "matheus",
                    amount: 100,
                    date: new Date().toISOString()
            })

            const response = await request(app)
                .post('/transfer')
                .send({                  
                    from: "julio",
                    to: "matheus",
                    amount: 100
            });

            
            const responseExpected = require('../fixture/answers/quandoInformoValoresValidos.json');
            delete response.body.date
            delete responseExpected.date
            expect(response.statusCode).to.equal(201)
            expect(response.body).to.deep.equal(responseExpected)
        })
    })
    
    afterEach(()=>{
        sinon.restore()
    })
})
