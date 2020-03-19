// Run 'yarn localAPI'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const request = require('request')
const cors = require('cors')

// Login url
const host = 'https://apihml.portoseguro.com.br/portais/autenticacao/v1'
const pathLogin = '/login'
const pathLogout = '/logout'

// Body info

app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(express.json())
app.use(cors())

app.post(
  '/api/auth/login',
  (
    {
      body: {
        username,
        password,
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret,
        social,
      },
    },
    res
  ) => {
    request
      .post({
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded',
          Hint: 'login_cliente',
          Accept: '*/*',
        },
        url: `${host}${pathLogin}`,
        body: `grant_type=${grantType}&client_id=${clientId}&client_secret=${clientSecret}&username=${username}&password=${password}&social=${social}`,
      })
      .pipe(res)
  }
)

app.post(
  '/api/auth/logout',
  (
    {
      body: {
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret,
        social,
      },
    },
    res
  ) => {
    request
      .post({
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: '*/*',
        },
        url: `${host}${pathLogout}`,
        body: `token_type_hint=access_token&client_id=${clientId}&client_secret=${clientSecret}&token=${req.body.token}`,
      })
      .pipe(res)
  }
)

app.listen(8080)
