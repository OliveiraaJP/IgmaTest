<p align="center">
  <h1 align="center">
    Igma Teste João Paulo
  </h1>
</p>

## 🖥️ Descrição do Projeto

Projeto de uma API para cadastro de clientes fornecendo CPF / Nome / Data de nascimento:

- Criação de usuários.

- Validação para impedir criação de usuários já criados.
- Validação de CPF por formato (com ou sem máscara) e seguindo as regras nacionais, que foram baseadas neste <a href= "https://www.macoratti.net/alg_cpf.htm#:~:text=O" target="_blank"> link</a>.
- Validação de data de aniversário seguindo padrão DD/MM/YYYY
- Visualização de todos os usuários cadastrados usando páginação e limite de usuários por página.
- Visualização de 1 usuário sendo fornecido seu respectivo CPF.
- Deletar usuário sendo fornecido seu respectivo CPF.
- Atualizar usuários sendo fornecido seu CPF e CPF não pode ser alterado.
- Projeto dockerizado para facilitar sua instalação.
- Testes feitos e mostrados como rodar localmente na parte de [`💁🏻‍♂️ Instalação Manual`](#💁🏻‍♂️-instalação-manual)

## 🗒️ Índice

- [💻 Tecnologias e Ferramentas](#💻-tecnologias-e-ferramentas)
- [👨🏻‍💻 Instalação Docker](#👨🏻‍💻-instalação-docker)
- [💁🏻‍♂️ Instalação Manual](#💁🏻‍♂️-instalação-manual)
- [⚙ Rodando os testes](#⚙-rodando-os-testes)
- [🚀 API](#🚀-api)

## 💻 Tecnologias e Ferramentas

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
 <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
 <img src="https://img.shields.io/badge/typeorm-E0884E?style=for-the-badge&logo&logoColor=white">
 <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
">

---

## 👨🏻‍💻 Instalação Docker

- Clone o projeto usando um desses 2 comandos

```bash
#Clone via https
$ git clone https://github.com/OliveiraaJP/IgmaTest.git

OU
#Clone via ssh
$ git clone git@github.com:OliveiraaJP/IgmaTest.git
```

- Criar um arquivo .env seguindo o documento .env-docker.example da raíz do projeto
- As variáveis fornecidas lá coincidem com as do container docker que será criado seguindo os comandos abaixo, caso queira alterar o nome de alguma variável tem também que alterar no arquivo docker-compose.yml
- Rode os seguintes comandos dentro da pasta do projeto clonado

```bash
$ docker-compose build

$ docker-compose up
```

- Accesse em seu navegador o link localhost:3000 ou 127.0.0.1:3000
- Agora a aplicação está rodando na sua máquina e se tudo correu bem deve estar vendo um "Hello World" no seu navegador

---

## 💁🏻‍♂️ Instalação Manual

- Clone o projeto usando um desses 2 comandos

```bash
#Clone via https
$ git clone https://github.com/OliveiraaJP/IgmaTest.git

OU
#Clone via ssh
$ git clone git@github.com:OliveiraaJP/IgmaTest.git
```

- Criar um arquivo .env seguindo o documento .env.example da raíz do projeto

- Crie um banco de dados local postgres com o mesmo nome que tenha usado na variável da chave `DB_DATABASE`

- Caso queira testar usando outro banco de dados relacional tem que acessar o arquivo `src/app.module.ts` e alterar o `type: 'postgres'` para o banco relacional de sua preferência fazendo as devidas alterações para conexão no .env previamente criado

- Rode os seguintes comandos dentro da pasta do projeto clonado

```bash
$ npm i

$ npm start
```

- Accesse em seu navegador o link localhost:3000 ou 127.0.0.1:3000
- Agora a aplicação está rodando na sua máquina e se tudo correu bem deve estar vendo um "Hello World" no seu navegador


---
## ⚙ Rodando os testes
- Primeiramente tenha feito o clone do projeto
- Em seguida para rodar os testes abra um terminal na pasta raíz do projeto e rode um dos seguintes comandos

```bash
# Para puramente rodar os testes
$ npm run test

# Para rodar com porcentagem da cobertura dos testes
$ npm run test:cov

# Para rodar relativos ao user service
$ npm run test -t src/app/user/user.service.spec.ts

# Para rodar relativos ao user controller
$ npm run test -t src/app/user/user.controller.spec.ts

## Para rodar testes em futuras pastas distintas 
## basta trocar o caminho relativo da pasta fonte
## e substituir após flag -t
```
---

## 🚀 API:

```yml
POST /api/v1/user
    - Rota para cadastro de usuários
    - headers: {}
    - body: {
        "name": String
        "cpf": String - formato= xxxxxxxxxxx OU xxx.xxx.xxx-xx
        "birthday": String - formato= DD/MM/YYYY 
    }
```

```yml
GET /api/v1/user
GET /api/v1/user?page=0&take=5
    - Rota que retorna todos os usuários cadastrados com páginação e limite
    - headers: {}
    - params: {
        page = Qual o número da página (default=0)
        take = A quantidade de usuários retornados por página (default=5)
    }
    - body: {}
```

```yml
GET /api/v1/user/:cpf
    - Rota que retorna 1 usuário cadastrados pelo CPF
    - headers: {}
    - query: {
        cpf = cpf do usuário cadastrado no banco de dados
    }
    - body: {}
```

```yml
DELETE /api/v1/user/:cpf
    - Rota que retorna deleta usuários cadastrados naquele CPF
    - headers: {}
    - query: {
        cpf = cpf do usuário cadastrado no banco de dados
    }
    - body: {}
```

```yml
PUT /api/v1/user/:cpf
    - Rota para atualizar 1 usuário
    - Cpf não pode ser alterado
    - headers: {}
    - query: {
        cpf = cpf do usuário cadastrado no banco de dados
    }
    - body: {
        "name": String
        "birthday": String - formato= DD/MM/YYYY 
    }
```

```yml
GET /
    - Rota que retorna o Hello World da sorte
    - headers: {}
    - body: {}
```


