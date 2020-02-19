const jsonServer = require('json-server')

const routes = require('./routes.json')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const recommendationMock = require('./src/mocks/recommendation.json')

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.use(jsonServer.rewriter(routes))

router.render = (req, res) => {
  if (
    req.originalUrl.startsWith('/conquistaapi/investimento/v1/notificacao/lida')
  ) {
    const allNotifications = [
      ...res.locals.data.anteriores,
      ...res.locals.data.novas,
    ]
    const notificacao = allNotifications.find(
      item => +item.idNotificacao === +req.query.id
    )

    const { tipoNotificacao, ...rest } = notificacao
    res.jsonp({ ...rest, lida: true })
  }
  if (
    req.originalUrl.startsWith('/conquistaapi/investimento/v1/recommendation')
  ) {
    res.jsonp(recommendationMock)
  } else {
    res.jsonp(res.locals.data)
  }
}

server.use(router)

server.listen(5000, () => {
  console.log('JSON Server is running')
})
