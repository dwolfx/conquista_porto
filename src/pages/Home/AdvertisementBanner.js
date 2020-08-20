import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import BannerImg from 'assets/images/pages/Home/insurance1.png'
import Text from 'components/Text'
import Banner from 'components/Banner'
import { GetRewardRecommendationsRequest } from 'store/modules/Rewards/Recommendations/action'
import { setCookieValue, getCookieValue } from 'helpers'

import { BannerButton, AdRow, TextBannerTitle } from './styles'

const AdvertisementBanner = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [hideBanner, setHideBanner] = useState(false)

  useEffect(() => {
    setHideBanner(Boolean(getCookieValue('hideConquistaRecommendationBanner')))
  }, [])

  useEffect(() => {
    if (!hideBanner) {
      dispatch(GetRewardRecommendationsRequest())
    }
  }, [dispatch, hideBanner])

  return (
    <>
      {!hideBanner && (
        <AdRow>
          <Banner
            image={BannerImg}
            hasCloseButton
            title={
              <TextBannerTitle>
                Viva hoje
                <br />
                Amanhã é com a gente
              </TextBannerTitle>
            }
            onClose={() => {
              setCookieValue('hideConquistaRecommendationBanner', 'true')
              setHideBanner(true)
            }}
          >
            <Text bold type="body">
              O Seguro de Vida é uma maneira de proprorcionar tranquilidade e
              segurança caso você precise ficar afastado do trabalho. Além de
              garantir amparo financeiro à sua família na sua ausência.
            </Text>
            <BannerButton
              color="secondary"
              onClick={() => history.push('/seguros')}
            >
              conhecer
            </BannerButton>
          </Banner>
        </AdRow>
      )}
    </>
  )
}

export default AdvertisementBanner
