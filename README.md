## FinAPI - Financeira

---

### Requisitos
<!-- get -->
- [x] Deve ser possivel criar uma conta
<!-- post -->
- [x] Deve ser possivel buscar o extrato bancario do cliente

- [] Deve ser possivel realizar um deposito
- [] Deve ser possivel realizar um saque
- [] Deve ser possivel buscar o extrato bancário do cliente por data
- [] Deve ser possivel atualizar dados da conta do cliente
- [] Deve ser possivel obter dados da conta do cliente
- [] Deve ser possivel deletar uma conta

---

## Regras de negócio
<!-- get -->
- [x] Não deve ser possivel cadastrar uma conta com CPF já existente
<!-- post -->
- [x] Não deve ser possivel fazer depósito em uma conta não existente

- [] Não deve ser possivel buscar extrato em uma conta não exixtente
- [] Não deve ser possivel fazer saque em uma conta não existente
- [] Não deve ser possivel excluir uma conta não existente
- [] Não deve ser possivel fazer saque quando o saldo for insuficiente

