const jsonServer = require('json-server')

const routes = require('./routes.json')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const recommendationMock = require('./src/mocks/recommendation.json')
const objectiveMock = require('./src/mocks/objective.json')

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
  if (req.originalUrl.startsWith('/api/goal/recommendations')) {
    return res.jsonp(recommendationMock)
  }
  if (req.originalUrl.startsWith('/api/goal/goals')) {
    return res.jsonp(objectiveMock)
  }

  // if (
  //   req.originalUrl.startsWith(
  //     '/api/invest/portopar/v1/cotista/perfil/investidor'
  //   )
  // ) {
  //   return res.status(204).jsonp()
  // }

  return res.jsonp(res.locals.data)
}

server.use(router)

server.listen(5000, () => {
  console.log('JSON Server is running')
})
