const jsonServer = require('json-server')

const routes = require('./routes.json')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

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
    const funds = {
      goal: {
        nickname: 'Disney',
        targetDate: '2019-12-30',
        targetValue: 1700,
        initialValue: 0,
        monthlyValue: 0,
        wouldLikeToReceiveBeforeFinalDate: false,
        wouldLikeToReceiveMonthlyIncome: false,
        goalType: '1',
        easyToSavePlannedAmount: false,
        targetDateFlexible: false,
      },
      combo: [
        {
          title: 'Investimentos',
          values: {
            'Investimento Mensal': 'R$ 80.000,00',
            'Investimento Inicial': 'R$ 920.000,00',
          },
          totalValue: 70000,
        },
        {
          title: 'Financiamento de Veículo',
          values: {
            'Valor a Contratar': 'R$ 69.999,00',
          },
          totalValue: 69999,
        },
      ],
      income: {
        pessimistic: [
          {
            month: 'Jan/01',
            value: 1000,
          },
          {
            month: 'Jan/02',
            value: 1100,
          },
          {
            month: 'Jan/03',
            value: 1150,
          },
          {
            month: 'Jan/04',
            value: 1220,
          },
          {
            month: 'Jan/05',
            value: 1280,
          },
          {
            month: 'Jan/06',
            value: 1350,
          },
          {
            month: 'Jan/07',
            value: 1420,
          },
          {
            month: 'Jan/09',
            value: 1500,
          },
        ],
        median: [
          {
            month: 'Jan/01',
            value: 1000,
          },
          {
            month: 'Jan/02',
            value: 1150,
          },
          {
            month: 'Jan/03',
            value: 1200,
          },
          {
            month: 'Jan/04',
            value: 1280,
          },
          {
            month: 'Jan/05',
            value: 1360,
          },
          {
            month: 'Jan/06',
            value: 1420,
          },
          {
            month: 'Jan/07',
            value: 1590,
          },
          {
            month: 'Jan/09',
            value: 1700,
          },
        ],
        optimistic: [
          {
            month: 'Jan/01',
            value: 1000,
          },
          {
            month: 'Jan/02',
            value: 1200,
          },
          {
            month: 'Jan/03',
            value: 1300,
          },
          {
            month: 'Jan/04',
            value: 1400,
          },
          {
            month: 'Jan/05',
            value: 1500,
          },
          {
            month: 'Jan/06',
            value: 1600,
          },
          {
            month: 'Jan/07',
            value: 1700,
          },
          {
            month: 'Jan/09',
            value: 2000,
          },
        ],
      },
      funds: [
        {
          name: 'Kapitalo Kappa FIN FIQ FIM',
          profitability: {
            '12': 8.13,
          },
          quotationApplyDays: 0,
          financialApplyDays: 0,
          quotationRescueDays: 0,
          financialRescueDays: 0,
          initialValue: 450000,
          monthlyValue: 30000,
          categoryName: 'Renda Fixa',
        },
        {
          name: 'Porto Seguro DI Crédito Privado',
          profitability: {
            '12': 7.7,
          },
          quotationApplyDays: 0,
          financialApplyDays: 0,
          quotationRescueDays: 0,
          financialRescueDays: 0,
          initialValue: 222500,
          categoryName: 'Renda Fixa',
          monthlyValue: 20000,
        },
        {
          name: 'Porto Seguro Soberano Referenciado DI',
          profitability: {
            '12': 7.13,
          },
          quotationApplyDays: 0,
          financialApplyDays: 0,
          quotationRescueDays: 0,
          financialRescueDays: 0,
          initialValue: 127500,
          categoryName: 'Ações',
          monthlyValue: 15000,
        },
        {
          name: 'BTG Pactual Tesouro IPCA Longo FI RF REF',
          profitability: {
            '12': 6.11,
          },
          quotationApplyDays: 0,
          financialApplyDays: 0,
          quotationRescueDays: 0,
          financialRescueDays: 0,
          initialValue: 80000,
          categoryName: 'Renda Fixa',
          monthlyValue: 10000,
        },
        {
          name: 'Capitânia Top Crédito Privado FIC FIRF',
          profitability: {
            '12': 5.12,
          },
          quotationApplyDays: 0,
          financialApplyDays: 0,
          quotationRescueDays: 0,
          financialRescueDays: 0,
          initialValue: 40000,
          categoryName: 'Multimercado',
          monthlyValue: 5000,
        },
      ],
      creditProduct: {
        name: 'Financiamento de Veículo',
        values: [
          {
            name: 'Valor a Contratar',
            value: 'R$ 69.999,00',
            checked: false,
          },
        ],
      },
      additional: {
        travelSecurity: true,
        lifeSecurity: false,
        creditCard: false,
      },
    }
    res.jsonp(funds)
  } else {
    res.jsonp(res.locals.data)
  }
}

server.use(router)

server.listen(5000, () => {
  console.log('JSON Server is running')
})
