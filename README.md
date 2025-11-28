README - Instrucoes de Execucao do Projeto

Sistema Dona Maria - Guia de Execucao

Este documento explica como configurar e executar o projeto localmente (desenvolvimento) e
via Docker (o que seria ambiente de produção).

O projeto possui dois componentes principais:
- API (diretorio: /api) -
- Frontend (diretorio: /frontend-dona-maria)

------------------------------------------------------------
REQUISITOS
------------------------------------------------------------
- Node.js 18+ - NPM - Docker e Docker Compose

------------------------------------------------------------

AMBIENTE DE DESENVOLVIMENTO (NODE + NPM tanto pro back quanto pro front)

1. Rodar a API localmente

cd /api &&  npm install && npm run dev

A API ficara acessivel em: http://localhost:3000

2. Rodar o Frontend localmente

cd ./frontend-dona-maria npm install npm run dev

O frontend ficara acessivel em: http://localhost:4000

---------------------
AMBIENTE COM DOCKER
---------------------

1. Subir apenas o banco de dados (necessario para desenvolvimento)

docker compose up db –build -d

2. Subir toda a stack (API + Frontend + DB)

docker compose up –build -d

Servicos acessiveis em:

API: http://localhost:3000

Frontend: http://localhost:4000





os arquivos SQL estão no diretório entry do postgres, então quando o docker sobe ele já sobe com o banco todo certinho com o DB, schemas, tabelas e registros já configurados
