import { useEffect } from 'react'
import { dataLayerProductSuggestion } from './index'

const useDataLayerProducts = (belowOffer, aboveOffer) => {
  useEffect(() => {
    const dataLayerProducts = []
    let dataLayerReturnType = 'erro'
    let dataLayerDescription = 'Não existem produtos sugeridos'

    if (belowOffer && aboveOffer) {
      dataLayerProducts.push({
        name: belowOffer.exchangeProduct,
        category: belowOffer.type,
        position: 1,
      })
      dataLayerProducts.push({
        name: aboveOffer.exchangeProduct,
        category: aboveOffer.type,
        position: 2,
      })

      if (dataLayerProducts.length >= 1) {
        dataLayerReturnType = 'sucesso'
        dataLayerDescription = ''
        dataLayerProductSuggestion(
          dataLayerProducts,
          dataLayerReturnType,
          dataLayerDescription
        )
      }
    }
  }, [aboveOffer, belowOffer])
}

export default useDataLayerProducts
