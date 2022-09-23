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

// rotas
app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );
    if (customerAlreadyExists) {
        return response.status(400).json({ error: "Cliente já existe" }); //Customer Already exists
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });
    return response.status(201).send();
}); // create = criar -- account = conta

app.get("/bankStatement/:cpf", (request, response) => {
    const { cpf } = request.params;
    // customer = cliente
    const customer = customers.find(customer => customer.cpf === cpf);
    return response.json(customer.statement)
}); // search = buscar -- bank statement = extrato bancário |

// portas
const port = 3333
app.listen(port);

// localhost:3333
