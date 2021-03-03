import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import Loading from 'components/Loading'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

import * as S from '../styles'

const SummaryProposalLoading = () => {
  return (
    <>
      <S.Header>
        <S.HeaderGridContainer>
          <S.HaderGridRow>
            <S.HaderGridCol lg={12}>
              <S.HeaderContent>
                <S.LogoWrapper>
                  <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
                </S.LogoWrapper>
              </S.HeaderContent>
            </S.HaderGridCol>
          </S.HaderGridRow>
        </S.HeaderGridContainer>
      </S.Header>
      <S.SubHeader>
        <S.GridContainer>
          <S.GridRow>
            <S.GridCol lg={12}>
              <HorizontalList
                size="small"
                startItems={[
                  <Text color="gray4" type="headline">
                    Proposta
                  </Text>,
                  <Text color="white" type="headline">
                    Cartão de Crédito
                  </Text>,
                ]}
              />
            </S.GridCol>
          </S.GridRow>
        </S.GridContainer>
      </S.SubHeader>
      <S.FullHeightRow>
        <Col col={12}>
          <S.CenterContentCard>
            <Loading
              type="bar"
              legend="Aguarde, estamos buscando suas informações..."
              textAlign="center"
            />
          </S.CenterContentCard>
        </Col>
      </S.FullHeightRow>
    </>
  )
}

export default SummaryProposalLoading
