# Funcional-Health-Tech

Collection do postman para teste:
https://www.getpostman.com/collections/7c13c9c069345dfbf59b

Tecnologias utilizadas

* NestJS
* NodeJS
* Docker
* MongoDB

Instruções para instalação do banco de dados:

1 - Instalação do docker no link: https://docs.docker.com/docker-for-windows/install/

2 - Docker: Criando servidor MongoDB
    O primeiro passo será baixar a imagem do mongoDB, caso você faça uma pesquisa no Docker Hub, irá encontrar muitas imagens, mas eu particularmente gosto de utilizar a tutum/mongod. Para baixar essa imagem é bem simples, com o docker instalado no seu computador, execute o comando abaixo no seu terminal:

    1) Executar o comando docker pull tutum/mongodb

    2) Com a imagem do docker no seu host, vamos criar um container de servidor de banco de dados. Para isso, você     pode escolher uma das duas instruções abaixo:

     Criação de servidor sem senha, recomendado para ambiente de desenvolvimento
      1 - docker run -d -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb
      2 - O próximo passo será subir o seu servidor mongo. Para isso, execute os passos abaixo:
        - docker ps -a
      3 Esse comando irá listar os seus containers que não estão em execução, copie o containerID do mongo e execute o comando abaixo no seu terminal:
        - docker start 77b903780b83

3 - Tudo certo, agora você já possui um container rodando na sua maquina!

URL API para CRUD de produtos: http://localhost:3000/v1/products

OBS: A conexão com o banco de dados fica na variável de ambiente dentro do projeto: nodemon.json, abaixo json de configuração.

{
    "watch": [
      "src"
    ],
    "ext": "ts",
    "ignore": [
      "src/**/*.spec.ts"
    ],
    "exec": "ts-node -r tsconfig-paths/register src/main.ts",
    "env": {
      "NODE_ENV": "development",
      "CONNECTION_STRING": "mongodb://localhost:27017/funcionalDB"
    }
  }

4 - Comandos para rodar a aplicação

	1 - npm i -g @nestjs/cli
    2 - npm install
    3 - npm run start:dev
