// Run 'yarn localAPI'
const express = require('express')
const app = express()
const request = require('request')
const cors = require('cors')

// Login url
const host = 'https://apihml.portoseguro.brasil:8443/seguranca/v1'
// const host = 'https://apihml.portoseguro.com.br/portais/autenticacao/v1'
const pathLogin = '/clientes/login'

app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(express.json())
app.use(cors())

app.post(
  '/api/auth2/clientes/login',
  (
    {
      body: {
        username,
        password,
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret,
      },
    },
    res
  ) => {
    request
      .post({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Hint: 'login_cliente',
          Accept: '*/*',
        },
        url: `${host}${pathLogin}`,
        body: `grant_type=${grantType}&client_id=${clientId}&client_secret=${clientSecret}&username=${username}&password=${password}`,
      })
      .pipe(res)
  }
)

app.listen(8080)
