import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import { useHistory } from 'react-router-dom'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import ErrorContent from 'pages/CreditCard/common/components/ConfirmationMessageStep/ErrorContent'
import ConfirmationMessageStep from 'pages/CreditCard/common/components/ConfirmationMessageStep'


import {
  ICreditCardCreationPayload,
  IOrderResponse,
} from 'pages/CreditCard/Creation/types'

import * as S from '../styles'

interface IProps {
  formData: ICreditCardCreationPayload
  formOrderResponse: IOrderResponse
  hasError: boolean
}
const SummaryProposalResponse = ({
  formData,
  formOrderResponse,
  hasError,
}: IProps) => {
  const history = useHistory()
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
          {!hasError ? (
            <ConfirmationMessageStep
              formData={formData}
              formOrderResponse={formOrderResponse}
              hasError={hasError}
              handleClose={() => history.push('/')}
            />
          ) : (
            <ErrorContent handleClose={() => history.push('/')} />
          )}
        </Col>
      </S.FullHeightRow>
    </>
  )
}

export default SummaryProposalResponse
