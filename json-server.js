const jsonServer = require('json-server')

const routes = require('./routes.json')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const recommendationMock = require('./src/mocks/recommendation.json')
const recommendationMockMobile = require('./src/mocks/recommendation-mobile.json')
const recommendationRecalculatedFunds = require('./src/mocks/recommendationRecalculatedFunds.json')
const objectiveMock = require('./src/mocks/objective.json')
const objectiveMock2 = require('./src/mocks/objective2.json')
const objectivesMock = require('./src/mocks/objectives.json')
const otherObjectivesMock = require('./src/mocks/otherObjectives.json')
const financialApplicationMock = require('./src/mocks/financialApplication.json')
const withdrawPOSTMock = require('./src/mocks/withdrawPOST.json')
const redeemPOSTMock = require('./src/mocks/redeemPOST.json')
const fundDetails = require('./src/mocks/fundDetails.json')

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.use(jsonServer.rewriter(routes))

// Adicionar um sleep pra simular demora da requisição
server.use((req, res, next) => {
  const delay = Math.random() * (4000 - 500) + 500
  setTimeout(next, delay)
})

router.render = (req, res) => {
  if (req.originalUrl.startsWith('/api/loyalty/optemais/auth/tokenorg')) {
    return res.jsonp({
      access_token: '0122333444455555',
    })
  }
  if (req.originalUrl.startsWith('/api/loyalty/optemais/auth/tokencatalogo')) {
    return res.jsonp({
      token: '1905199724134E2F73647183664C0A15',
      msg: 'OK',
      CodRetorno: 0,
    })
  }
  if (req.originalUrl.startsWith('/api/notificacao/lida')) {
    const allNotifications = [
      ...res.locals.data.anteriores,
      ...res.locals.data.novas,
    ]
    const notificacao = allNotifications.find(
      item => +item.idNotificacao === +req.query.id
    )
    const { tipoNotificacao, ...rest } = notificacao
    return res.jsonp({ ...rest, lida: true })
  }
  if (req.originalUrl.startsWith('/api/recommendation/recommendations')) {
    if (req.originalUrl.includes('mobile')) {
      return res.jsonp(recommendationMockMobile)
    }
    if (req.originalUrl.endsWith('/recalculate-funds')) {
      if (req.method === 'POST') {
        return res.jsonp(recommendationRecalculatedFunds.income)
      }
      return res.status(404)
    }
    if (req.method === 'PUT') {
      console.log(req.body)
      return res.jsonp({
        ...recommendationMock,
        ...req.body,
      })
    }

    return res.jsonp({
      ...recommendationMock,
      answer: {
        ...recommendationMock.answer,
        ...req.body,
        initial_value:
          req.body.initial_value || recommendationMock.answer.initial_value,
        monthly_value:
          req.body.monthly_value || recommendationMock.answer.monthly_value,
        target_value:
          req.body.target_value || recommendationMock.answer.target_value,
      },
    })
  }
  if (req.originalUrl.startsWith('/api/goal/goals/1/funds')) {
    if (req.method === 'POST') {
      return res.jsonp(objectiveMock2)
    }
  }
  if (req.originalUrl.startsWith('/api/goal/goals')) {
    if (req.method === 'GET') {
      if (req.originalUrl.includes('bytype')) {
        // get other objectives
        return res.jsonp({ ...otherObjectivesMock })
      }
      if (!req.originalUrl.endsWith('/api/goal/goals')) {
        // get specific objective
        return res.jsonp({ ...objectiveMock, id: req.query.id })
      }

      // list all objectives
      return res.jsonp(objectivesMock)
    }

    if (req.method === 'POST') {
      return res.jsonp({ ...objectiveMock, ...req.body.answer })
    }
    if (req.method === 'DELETE') {
      return res.status(204).jsonp({})
    }
  }
  if (req.originalUrl.endsWith('/teclado-virtual')) {
    if (req.method === 'POST') {
      return res
        .status(200)
        .jsonp('[{"a":"6,7"},{"b":"2,1"},{"c":"4,9"},{"d":"8,3"},{"e":"0,5"}]]')
    }
  }
  if (req.originalUrl.endsWith('/cotista/aplicacoes')) {
    if (req.method === 'POST') {
      return res.jsonp({ ...financialApplicationMock })
    }
  }

  if (req.originalUrl.endsWith('/cotista/retiradas')) {
    if (req.method === 'POST') {
      return res.jsonp({ ...withdrawPOSTMock })
    }
  }

  if (req.originalUrl.endsWith('/cotista/resgates')) {
    if (req.method === 'POST') {
      return res.jsonp({ ...redeemPOSTMock })
    }
  }

  if (req.originalUrl.endsWith('/otp')) {
    if (req.method === 'PUT') {
      return res.status(200).jsonp('{}')

      // test error toast with response message and NotFoundException at 2FAToken>validateToken
      // return res.status(404).jsonp({ msg: 'Token inválido' })
    }
  }

  if (req.originalUrl.endsWith('/teclado-virtual')) {
    if (req.method === 'PUT') {
      // test success screen on token/signature flow
      return res.status(200).jsonp('{}')

      // test error screen on token/signature flow (retries = 0 / status 400)
      // return res.status(400).jsonp({
      //   msg: 'Assinatura eletrônica incorreta',
      //   retries: 0,
      // })
    }
  }

  if (
    req.originalUrl.includes('/api/invest/fundos/') &&
    req.originalUrl.endsWith('codigoCanal=0')
  ) {
    const idFund = req.originalUrl
      .replace('/api/invest/fundos/', '')
      .replace('?', '')
      .replace('codigoCanal=0', '')

    return res.status(200).jsonp({
      ...fundDetails.fundo_detalhe,
      id_carteira: idFund,
    })
  }

  return res.jsonp(res.locals.data)
}

server.use(router)

server.listen(5000, () => {
  console.log('JSON Server is running')
})
