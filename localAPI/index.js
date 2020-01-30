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
const grantType = 'password'
const clientID = '4867ef4e-9f57-4524-ba92-e018daba0de2'
const clientSecret = '44b61d86-077e-4ec9-a75e-68b6afe4540a'
const social = '13213'

app.use(bodyParser.json())
app.use(cors())

app.post('/api/auth/login', (req, res) => {
  request
    .post({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Hint: 'login_cliente',
        Accept: '*/*',
      },
      url: `${host}${pathLogin}`,
      body: `grant_type=${grantType}&client_id=${clientID}&client_secret=${clientSecret}&username=${req.body.username}&password=${req.body.password}&social=${social}`,
    })
    .pipe(res)
})

app.post('/api/auth/logout', (req, res) => {
  request
    .post({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: '*/*',
      },
      url: `${host}${pathLogout}`,
      body: `token_type_hint=access_token&client_id=${clientID}&client_secret=${clientSecret}&token=${req.body.token}`,
    })
    .pipe(res)
})

app.listen(8080)
