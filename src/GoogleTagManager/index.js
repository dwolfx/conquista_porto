import TagManager from 'react-gtm-module'
import sha256 from 'crypto-js/sha256'
import packageJson from '../../package.json'

export const dataLayerErrorInfo = description => {
  const SearchInfo = {
    dataLayer: {
      event: 'erro',
      descricao: description,
    },
  }
  TagManager.dataLayer(SearchInfo)
}

export const dataLayerProductSuggestion = (
  products,
  returnType,
  description
) => {
  const productList = products.map(product => ({
    ...product,
  }))

  const ProductSuggestion = {
    dataLayer: {
      event: 'lista_sugestao',
      products: productList,
      retorno: returnType,
      descricao: description,
    },
  }
  TagManager.dataLayer(ProductSuggestion)
}

const setCustomData = (auth, points, title) => {
  const hash = sha256(auth.cpf)

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
