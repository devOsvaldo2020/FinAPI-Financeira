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

    const id = uuidv4();

    customers.push({
        cpf,
        name,
        id,
        statement: []
    });
    return response.status(201).send();
});


// portas
const port = 3333
app.listen(port);

// localhost:3333
