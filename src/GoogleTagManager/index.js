import TagManager from 'react-gtm-module'
import sha256 from 'crypto-js/sha256'
import packageJson from '../../package.json'

export const dataLayerServiceSolicitation = (
  id,
  name,
  product,
  status,
  returnType,
  description
) => {
  const serviceSolicitation = {
    dataLayer: {
      event: 'solicitacao_servico',
      id_solicitacao: id,
      nome_servico: name,
      produto: product,
      status,
      retorno: returnType,
      descricao: description,
    },
  }
  TagManager.dataLayer(serviceSolicitation)
}

export const dataLayerSearchInfo = (
  name,
  type,
  product,
  status,
  returnType,
  description
) => {
  const SearchInfo = {
    dataLayer: {
      event: 'resultado_consulta',
      nome_servico: name,
      tipo_busca: type,
      produto: product,
      status,
      retorno: returnType,
      descricao: description,
    },
  }
  TagManager.dataLayer(SearchInfo)
}

export const dataLayerErrorInfo = description => {
  const SearchInfo = {
    dataLayer: {
      event: 'erro',
      descricao: description,
    },
  }
  TagManager.dataLayer(SearchInfo)
}

const setCustomData = (auth, points, title) => {
  const hash = sha256(auth.cpf)
  const productList = [
    'Cartão de Crédito',
    'Consórcio de Imóvel',
    'Consórcio de Veículo',
    'Financiamento de Veículo',
    'Investimentos',
    'Previdência Privada',
    'Seguro de Vida',
    'Seguro Viagem',
  ]

  window.customData.page.name = title

  window.customData.site.portal = 'conquista'
  window.customData.site.versao = packageJson.version
  window.customData.site.brand = 'porto-seguro'

  window.customData.user.id = ''
  window.customData.user.numero = hash
  window.customData.user.points =
    points !== null && points !== undefined
      ? calculatePointsAmountBalance(points)
      : 0
  window.customData.user.products = productList

  window.customData.user.logged = auth.accessToken ? 'true' : 'false'
  window.customData.user.loginType = 'Padrão'
}

const calculatePointsAmountBalance = extrato =>
  extrato.reduce((acc, curr) => acc + +curr.pontoGanho, 0)

export default function googleTagManagerHandler(path, title, auth, points) {
  const tagManagerArgs = {
    dataLayer: {
      event: 'step_change',
      pg_path: path,
      pg_title: title,
    },
  }
  TagManager.dataLayer(tagManagerArgs)
  setCustomData(auth, points)
}
