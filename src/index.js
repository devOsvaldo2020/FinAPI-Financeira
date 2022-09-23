const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());

const customers = [];
// cpf - string
// name - string 
// id - uuid (install pelo terminal digite>> yarn add uuid)
// statement []
// 
// Middlewares
function verifyIfExistAccountCPF(request, response, next){
    const { cpf } = request.headers;
    // customer = cliente
    const customer = customers.find(customer => customer.cpf === cpf);
    if(!customer){
        return response.status(400).json({ error: "Cliente não encontrado / customer not found"}); // customer not found
    }
    // deixando visivel o customer, para todos os caras que recebem o rmiddleware.
    request.customer = customer;

    return next();
};

// rotas
app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );
    if (customerAlreadyExists) {
        return response.status(400).json({ error: "Cliente já existe - customer already exists" }); //Customer Already exists
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });
    return response.status(201).send();
}); // create = criar -- account = conta

// app.use(verifyIfExistAccountCPF); // tudas as rotas abaixo usa ele
app.get("/bankStatement", verifyIfExistAccountCPF, (request, response) => {  
    // só essa rota usa ele. caso queira todas pode tirar daqui.

    /** recuperando o customer */  const { customer} = /** de onde?? */ request

    /** retornando o resultado desta funcao */return response.json(customer.statement);

}); // search = buscar -- bank statement = extrato bancário




// portas
const port = 3333
app.listen(port);

// localhost:3333
