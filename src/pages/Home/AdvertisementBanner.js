import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'styled-bootstrap-grid'

import BannerImg from 'assets/images/pages/Home/img_banner_12.png'
import Text from 'components/Text'
import { getCookieValue, setCookieValue } from 'helpers'

import { GetRewardRecommendationsRequest } from 'store/modules/Rewards/Recommendations/action'

import { BannerButton, BannerTips, GridCol, AdRow } from './styles'

const AdvertisementBanner = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [hideBanner, setHideBanner] = useState(true)
  const [bannerData, setBannerData] = useState({})

  const recommendationState = useSelector(state => state.rewardsRecommendations)

  useEffect(() => {
    setHideBanner(Boolean(getCookieValue('hideConquistaHomeBanner')))
  }, [])

  useEffect(() => {
    dispatch(GetRewardRecommendationsRequest())
  }, [dispatch])

  useEffect(() => {
    if (recommendationState.data && recommendationState.data.length) {
      const randomPosition = Math.floor(
        Math.random() * (recommendationState.data.length - 1)
      )

      setBannerData(recommendationState.data[randomPosition])
    }
  }, [recommendationState.data])

  if (
    !recommendationState.data ||
    !Object.entries(bannerData).length ||
    hideBanner
  ) {
    return null
  }

  return (
    <Container>
      <AdRow hasBannerCookie={!hideBanner}>
        <GridCol lg="12">
          <BannerTips
            size="lg"
            image={bannerData.icon_name || BannerImg}
            hasCloseButton
            onClose={() => {
              setCookieValue('hideConquistaHomeBanner', 'true')
              setHideBanner(true)
            }}
          >
            <Text type="heading3">{bannerData.subject_name}</Text>
            <Text>{bannerData.text_content}</Text>
            <BannerButton
              color="secondary"
              onClick={() => history.push(bannerData.url_name)}
            >
              {bannerData.button_name}
            </BannerButton>
          </BannerTips>
        </GridCol>
      </AdRow>
    </Container>
  )
}

export default AdvertisementBanner
