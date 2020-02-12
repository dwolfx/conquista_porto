import sha256 from 'crypto-js/sha256'
import packageJson from '../../package.json'

// Google Tag Manager
const dataLayer = window.dataLayer || []

const calculatePointsAmountBalance = extrato =>
  extrato.reduce((acc, curr) => acc + +curr.pontoGanho, 0)

export default function googleTagManagerHandler(path, title, auth, points) {
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

  dataLayer.push({
    event: 'step_change',
    pg_path: path,
    pg_title: title,
  })

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
