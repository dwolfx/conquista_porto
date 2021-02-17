const jsonServer = require('json-server')

const routes = require('./routes.json')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const destinationContriesMock = require('./src/mocks/destinationCountries.json')
const tripInsuranceCreditCardMock = require('./src/mocks/tripInsuranceCreditCard.json')
const tripInsuranceQuotationMock = require('./src/mocks/tripInsuranceQuotation.json')
const tripInsuranceProposalMock = require('./src/mocks/tripInsuranceProposal.json')
const consortiumBuildingStatesMock = require('./src/mocks/consortiumBuildingStates.json')
const consortiumBuildingProposalSimulationsMock = require('./src/mocks/consortiumBuildingProposalSimulations.json')
const recommendationMock = require('./src/mocks/recommendation.json')
const recommendationMockMobile = require('./src/mocks/recommendation-mobile.json')
const recommendationRecalculatedFunds = require('./src/mocks/recommendationRecalculatedFunds.json')
const objectiveDetailsMock = require('./src/mocks/objective.json')
const objectivePut = require('./src/mocks/objectivesUpdateMovement-put.json')
const objectivesListMock = require('./src/mocks/objectivesList.json')
const summaryObjectivesMock = require('./src/mocks/summaryObjectives.json')
const financialApplicationMock = require('./src/mocks/financialApplication.json')
const withdrawPOSTMock = require('./src/mocks/withdrawPOST.json')
const redeemPOSTMock = require('./src/mocks/redeemPOST.json')
const fundDetails = require('./src/mocks/fundDetails.json')
const privateWelfare = require('./src/mocks/privateWelfare.json')
const privateWelfateWithStatusPRE = require('./src/mocks/privateWelfateWithStatusPRE.json')
const getBond = require('./src/mocks/getBond.json')
const fundExtract = require('./src/mocks/fundExtract.json')
const consortiumBuildingContemplatedMock = require('./src/mocks/consortiumBuildingContemplated.json')
const consortiumBuildingCivilStatusMock = require('./src/mocks/consortiumBuildingCivilStatus.json')
const consortiumBuildingCountriesMock = require('./src/mocks/consortiumBuildingCountries.json')
const consortiumBuildingFatcaMock = require('./src/mocks/consortiumBuildingFatca.json')
const consortiumBuildingNationalityMock = require('./src/mocks/consortiumBuildingNationality.json')
const consortiumBuildingJobsMock = require('./src/mocks/consortiumBuildingJobs.json')

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
      return res.jsonp({
        ...recommendationMock,
        answer: req.body.answer,
        additional: req.body.additional,
        credit_product: req.body.credit_product,
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

  if (req.originalUrl.startsWith('/api/goal/redeems')) {
    if (req.method === 'GET') {
      return res.status(200).jsonp([
        {
          id: 1,
          text: 'Vou fazer uma compra',
        },
      ])
    }

    return res.status(200).jsonp({})
  }

  if (req.originalUrl.startsWith('/api/goal/goals')) {
    if (req.method === 'GET') {
      if (req.originalUrl.includes('allocation-statement')) {
        let fundExtractFiltered = fundExtract
        if (req.originalUrl.includes('Vinculo')) {
          fundExtractFiltered = fundExtract.filter(
            item => item.transaction_type === 'Vinculo ao Objetivo'
          )
        }
        return res.status(200).jsonp(fundExtractFiltered)
      }

      if (req.originalUrl.includes('summary')) {
        return res.jsonp(summaryObjectivesMock)
      }

      // specific id - manager screen
      if (!req.originalUrl.endsWith('/api/goal/goals')) {
        // get specific objective
        return res.jsonp({ ...objectiveDetailsMock, id: +req.query.id })
      }

      // list all objectives
      return res.jsonp(objectivesListMock)
    }

    if (req.method === 'POST') {
      return res.jsonp({ ...objectiveDetailsMock, ...req.body.answer })
    }

    if (req.method === 'DELETE') {
      return res.status(204).jsonp({})
    }

    if (req.method === 'PATCH') {
      return res.status(204).jsonp({})
    }

    if (req.method === 'PUT') {
      return res.jsonp({ ...objectivePut })
    }
  }
  if (req.originalUrl.endsWith('/adesoes/titular/cpf')) {
    return res.status(200).jsonp(privateWelfare)
  }
  if (req.originalUrl.includes('/investimento/cadastro/v1/vinculo')) {
    return res.status(200).jsonp(getBond)
  }
  if (req.originalUrl.endsWith('/adesoes/aprovada/titular/cpf')) {
    return res.status(200).jsonp(privateWelfateWithStatusPRE)
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

  if (req.originalUrl.endsWith('/viagem/proposta')) {
    if (req.method === 'POST') {
      return res.status(200).jsonp({ ...tripInsuranceProposalMock })
    }
  }

  if (req.originalUrl.endsWith('/viagem/paises/destino')) {
    if (req.method === 'GET') {
      return res.status(200).jsonp({ ...destinationContriesMock })
    }
  }

  if (req.originalUrl.endsWith('/viagem/cotacao/seguro')) {
    if (req.method === 'POST') {
      return res.status(200).jsonp({ ...tripInsuranceQuotationMock })
    }
  }

  if (req.originalUrl.endsWith('/otp')) {
    if (req.method === 'PUT') {
      return res.status(200).jsonp('{}')

      // test error toast with response message and NotFoundException at 2FAToken>validateToken
      // return res.status(404).jsonp({ msg: 'Token inválido' })
    }
  }

  if (req.originalUrl.endsWith('/produtos/comercializacao/uf')) {
    if (req.method === 'GET') {
      return res.status(200).jsonp({ ...consortiumBuildingStatesMock })
    }
  }

  if (req.originalUrl.endsWith('/proposta/simular')) {
    if (req.method === 'POST') {
      return res
        .status(200)
        .jsonp({ ...consortiumBuildingProposalSimulationsMock })
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

  if (req.originalUrl.endsWith('/produtos/1/valores')) {
    if (req.method === 'GET') {
      return res.status(200).jsonp({ ...consortiumBuildingContemplatedMock })
    }
  }

  if (req.originalUrl.endsWith('/dados/lista-fatca')) {
    if (req.method === 'GET') {
      return res.status(200).jsonp({ ...consortiumBuildingFatcaMock })
    }
  }

  if (req.originalUrl.endsWith('/dados/paises')) {
    if (req.method === 'GET') {
      return res.status(200).jsonp({ ...consortiumBuildingCountriesMock })
    }
  }

  if (req.originalUrl.endsWith('/dados/estados-civis')) {
    if (req.method === 'GET') {
      return res.status(200).jsonp({ ...consortiumBuildingCivilStatusMock })
    }
  }

  if (req.originalUrl.endsWith('/dados/nacionalidades')) {
    if (req.method === 'GET') {
      return res.status(200).jsonp({ ...consortiumBuildingNationalityMock })
    }
  }

  if (req.originalUrl.endsWith('/dados/profissoes')) {
    if (req.method === 'GET') {
      return res.status(200).jsonp({ ...consortiumBuildingJobsMock })
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

  if (
    req.originalUrl.endsWith('/cartoes/solicitacao') &&
    req.method === 'POST'
  ) {
    return res.status(200).jsonp({
      CodigoRetorno: 0,
      Message: {
        TipoCritica: 'SUCESSO',
      },
      NumeroProposta: 85398,
    })
  }

  if (req.originalUrl.endsWith('/cartoes/sugestao') && req.method === 'POST') {
    return res.status(200).jsonp({
      CodigoRetorno: 0,
      Message: {
        tipoCritica: 'SUCESSO',
      },
    })
  }

  if (
    req.originalUrl.endsWith('/cartoes?codigoCanal=1&integracao=1') &&
    req.method === 'GET'
  ) {
    return res.status(200).jsonp(tripInsuranceCreditCardMock)
  }

  return res.jsonp(res.locals.data)
}

server.use(router)

server.listen(5000, () => {
  console.log('JSON Server is running')
})
