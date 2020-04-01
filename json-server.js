const jsonServer = require('json-server')

const routes = require('./routes.json')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const recommendationMock = require('./src/mocks/recommendation.json')
const recommendationMockMobile = require('./src/mocks/recommendation-mobile.json')
const objectiveMock = require('./src/mocks/objective.json')
const objectivesMock = require('./src/mocks/objectives.json')

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.use(jsonServer.rewriter(routes))

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
    return res.jsonp(recommendationMock)
  }
  if (req.originalUrl.startsWith('/api/goal/goals')) {
    if (req.method === 'GET') {
      if (!req.originalUrl.endsWith('/api/goal/goals') && !req.originalUrl.includes('bytype')) {
        return res.jsonp({ ...objectiveMock, id: req.query.id })
      } else if (!req.originalUrl.includes('bytype')) {
        return res.jsonp(objectivesMock)
      }
    }

    if (req.method === 'POST') {
      return res.jsonp(objectiveMock)
    }
    if (req.method === 'DELETE') {
      return res.status(204).jsonp({})
    }
  }

  return res.jsonp(res.locals.data)
}

server.use(router)

server.listen(5000, () => {
  console.log('JSON Server is running')
})
