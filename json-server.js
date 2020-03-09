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
      if (!req.originalUrl.endsWith('/api/goal/goals')) {
        return res.jsonp(objectiveMock)
      }
      return res.jsonp(objectivesMock)
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
