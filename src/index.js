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
function verifyIfExistAccountCPF(request, response, next) {
    const { cpf } = request.headers;
    // customer = cliente
    const customer = customers.find(customer => customer.cpf === cpf);
    if (!customer) {
        return response.status(400).json({ error: "Cliente não encontrado / customer not found" }); // customer not found
    }
    // deixando visivel o customer, para todos os caras que recebem o rmiddleware.
    request.customer = customer;

    return next();
};

// rotas

// app.use(verifyIfExistAccountCPF); // tudas as rotas abaixo usa ele

app.get("/bankStatement", verifyIfExistAccountCPF, (request, response) => {
    // só essa rota usa ele. caso queira todas pode tirar daqui.

    /** recuperando o customer */  const { customer } = /** de onde?? */ request

    /** retornando o resultado desta funcao */return response.json(customer.statement);

}); // search = buscar -- bank statement = extrato bancário

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
        statement: [],
    });
    return response.status(201).send();
}); // create = criar -- account = conta

app.post("/deposit", verifyIfExistAccountCPF, (request, response) => {
    const { description, amount /** descrição, quantia */ } = request.body;
        /** recuperar o customer de dentro do request */ const { customer } = request;
    // criando a operação     

    const statementOperation /**declaração Operação */ = {
        description,
        amount,
        created_at: /**criado em */ new Date(),
        type:/** tipo */ "credit"/** credito */,
    };
    // inserindo a operação dentro do cliente
    customer.statement.push(statementOperation);
    // se tudo der certo, retorna um 201 e um send.
    return response.status(201).send();
}); // depositar

app.get("/bankStatement/date", verifyIfExistAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date);

    // const text =;
    const statement = customer.statement.filter(
        (statement) =>
            statement.created_at.toDateString() ===
            new Date(dateFormat).toDateString()
    );

    return response.json(statement);

}); // buscar por data

// portas
const port = 3333
app.listen(port);

// localhost:3333
