# Pendencias para limpar o projeto depois de aprovado o mock
  - apagar as pastas
    - /localAPI
    - /src/mocks/
    - db.js
    - json-server.js
    - json-server.json
    - routes.json
  - dentro do arquivo 'package.json' na seção de 'scripts' remover as linhas
    - "raise-db": "nodemon json-server.js --delay 1"
    - "localAPI": "cross-env NODE_TLS_REJECT_UNAUTHORIZED='0' node localAPI"

# Rodar servidor SWAGGER somente - Definições API Porto Conquista
- Clonar projeto [https://bitbucket.org/sciensa/conquista-react-front]
- npm i
- npm run swagger:start
- acessar url [http://127.0.0.1:9090/swagger-ui/index.html]

# Rodar servidor MOCK com SWAGGER
 - Clonar projeto [https://bitbucket.org/sciensa/conquista-react-front]
 - npm i
 - npm run mock:start
 - acessar url [http://localhost:3001/static/swagger-ui/index.html]
 
# Projeto Postman
 - Rodar etapa 'Definições API Porto Conquista'
    - Clonar projeto [https://bitbucket.org/sciensa/conquista-react-front]
    - npm i
    - npm run swagger:start
 - dentro do postman, importar o arquivo
   - se estiver rodando somente o SWAGGER [http://127.0.0.1:9090/openapi.yaml]
   - se estiver rodando o MOCK server [http://127.0.0.1:9090/openapi.yaml]
 
 