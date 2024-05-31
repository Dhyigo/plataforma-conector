# Projeto Plataforma Conector Blip x Genesys

## Gerente da plataforma
### Entidade
- id
- nome
- email (único por entidade)
- senha
- data de criação
- data de atualização

### Casos de uso
- [ ] Atualizar dados do Gerente
  - **Permissões**: Gerente
- [ ] Trocar senha
  - **Permissões**: Gerente

## Empresa (Cliente)
### Entidade
- id (único por entidade)
- nome (único por entidade)
- email
- senha
- CNPJ (único por entidade)
- dados de cobrança bancária
  - nome do banco
  - agência
  - número da conta
  - tipo de conta (corrente, poupança, etc.)
- data de criação
- data de atualização

### Casos de uso
- [ ] Criar Empresa
  - **Permissões**: Empresa
- [ ] Atualizar dados da Empresa
  - **Permissões**: Empresa
- [ ] Trocar senha
  - **Permissões**: Empresa
- [ ] add dados de pagamento
  - **Permissões**: Empresa
- [ ] remover dados de pagamento
  - **Permissões**: Empresa

## Admin
### Entidade
- nome
- email (único por entidade)
- senha
- empresaId 
- data de criação
- data de atualização

### Casos de uso
- [ ] Criar Admin
  - **Permissões**: Empresa
- [ ] Editar Admin
  - **Permissões**: Empresa
- [ ] Apagar Admin
  - **Permissões**: Empresa
- [ ] Listar Admins por empresa
  - **Permissões**: Empresa
- [ ] Trocar senha
  - **Permissões**: Admin

## Integração
...
- desconto

### Casos de uso
- [ ] Criar integração no conector
  - **Permissões**: Empresa, Admin
- [ ] Criar novo token de integração
  - **Permissões**: Empresa, Admin
- [ ] Alteração de plano
  - **Permissões**: Empresa
- [ ] Atualizar dados da integração no conector
  - **Permissões**: Empresa
- [ ] Adicionar novo bot na integração
  - **Permissões**: Empresa, Admin
- [ ] Atualizar dados do bot na integração
  - **Permissões**: Empresa, Admin
- [ ] Cadastrar novo router na integração
  - **Permissões**: Empresa, Admin
- [ ] Atualizar dados do router na integração
  - **Permissões**: Empresa, Admin
- [ ] Deletar bot router
  - **Permissões**: Empresa, Admin
- [ ] Deletar bot
  - **Permissões**: Empresa, Admin

## Plano
### Entidade
- id
- nome
- desconto
- número máximo de interações
- número máximo de mensagens trocadas
- forma de pagamento (cobrança bancária)

### Casos de uso
- [ ] Criar Plano
  - **Permissões**: Gerente
- [ ] Editar Plano
  - **Permissões**: Gerente
- [ ] Apagar Plano
  - **Permissões**: Gerente
- [ ] Listar Planos
  - **Permissões**: Gerente

## Mensagem trafegada
### Entidade
- empresa
- data de envio
- plataforma de origem
- plataforma destinatária
- ticket
- ID da Conversa?
- ID da mensagem no BLIP
- ID da mensagem no GENESYS

### Casos de uso
- [ ] Consultar quantidade de mensagem por data
  - **Permissões**: Empresa, Admin
- [ ] Buscar Mensagem em um período de tempo
  - **Permissões**: Empresa, Admin
