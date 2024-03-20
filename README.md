# TFC - Football Matches and Standings API

## Sobre o Projeto

O TFC (Team Football Coverage) é uma plataforma informativa sobre partidas e classificações de futebol, onde os usuários podem encontrar dados atualizados sobre seus times e ligas favoritas. Este projeto foi desenvolvido durante o curso da Trybe, e foca no desenvolvimento de uma API robusta, construída com práticas de TDD (Test Driven Development) e dockerizada para facilitar a integração e o deployment. A API se conecta a um front-end já existente, fornecendo todas as informações necessárias para exibir partidas, resultados e classificações.

### Estrutura do Projeto

O projeto TFC é composto por quatro principais componentes:

1. **Banco de Dados (DB)**: Um serviço MySQL dockerizado, responsável por armazenar todos os dados relacionados a partidas e classificações.
2. **Back-end**: O núcleo da lógica de negócios, implementando endpoints necessários para o consumo do front-end.
3. **Front-end**: Uma interface de usuário já desenvolvida, que consome dados da API do back-end para exibir informações sobre futebol.
4. **Docker**: Utiliza `docker-compose` para integrar e orquestrar os serviços de back-end, front-end e banco de dados.

## Tecnologias Utilizadas

- Node.js
- Sequelize
- MySQL
- Docker e Docker Compose
- Jest (para TDD)

## Como Instalar e Rodar o Projeto

### Pré-requisitos

- Docker e Docker Compose
- Node.js (para execução local sem Docker)

### Instruções

1. Clone o repositório: git clone git@github.com:ciimarques/futebol.git

### Configurando seu ambiente de desenvolvimento

Para contribuir com o desenvolvimento do back-end ou do front-end, confira as Dockerfiles localizadas nas raízes de cada parte do projeto e ajuste conforme necessário para o seu ambiente de desenvolvimento.

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## Contato
 **Cíntia Marques** 
- **Email**:  cintiamarques.mk@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/ciimarques

   
