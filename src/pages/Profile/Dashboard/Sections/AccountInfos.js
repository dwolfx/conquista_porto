import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'assets/images/julia.jpg'

import {
  Row,
  CardWrapper,
  PhotoWrapper,
  ContentWrapper,
  CardText,
  CardBox,
  LineBreaker,
  PencilIcon,
} from 'pages/Profile/styles'

const AccountInfos = ({ id }) => (
  <CardWrapper id={id}>
    <PhotoWrapper>
      <img src={Avatar} alt="user avatar" />
      <PencilIcon />
    </PhotoWrapper>
    <ContentWrapper>
      <Row marginTop="0">
        <CardText title="true">Conta de Investimento</CardText>
      </Row>
      <Row>
        <CardBox>
          <CardText title="true">Banco</CardText>
          <CardText>306</CardText>
        </CardBox>
        <CardBox>
          <CardText title="true">Agência</CardText>
          <CardText>0001</CardText>
        </CardBox>
        <CardBox>
          <CardText>Conta</CardText>
          <CardText>99999-9</CardText>
        </CardBox>
      </Row>
      <Row>
        <LineBreaker />
      </Row>
      <Row marginBottom="0">
        <CardBox>
          <CardText title="true">Favorecido</CardText>
          <CardText>Julia Francis Reyes</CardText>
        </CardBox>
        <CardBox>
          <CardText title="true">CPF</CardText>
          <CardText>000.000.000-00</CardText>
        </CardBox>
        <CardBox />
      </Row>
    </ContentWrapper>
  </CardWrapper>
)

AccountInfos.propTypes = {
  id: PropTypes.number,
}

export default AccountInfos
