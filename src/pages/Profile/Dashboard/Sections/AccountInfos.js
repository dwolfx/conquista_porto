import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { formatCpf } from 'helpers'
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

const AccountInfos = ({ id }) => {
  const reduxData = useSelector(state => state.bankData.data)
  const [bankInfo, setBankInfo] = useState({})

  useEffect(() => {
    if (reduxData.length > 0) {
      setBankInfo({ ...reduxData[0].dadosContaPortoSeguro })
    }
  }, [reduxData])

  return (
    <>
      {bankInfo && bankInfo.cpf && (
        <CardWrapper id={id}>
          <PhotoWrapper>
            <img src={Avatar} alt="user avatar" />
            <PencilIcon />
          </PhotoWrapper>
          <ContentWrapper>
            <Row marginTop="0">
              <CardText title="true">Conta de Investimento</CardText>
            </Row>
            <Row bankInfos>
              <CardBox>
                <CardText title="true">Banco</CardText>
                <CardText>{bankInfo.codigo_banco}</CardText>
              </CardBox>
              <CardBox>
                <CardText title="true">Agência</CardText>
                <CardText>{bankInfo.agencia}</CardText>
              </CardBox>
              <CardBox>
                <CardText>Conta</CardText>
                <CardText>{`${bankInfo.conta}-${bankInfo.digito_conta}`}</CardText>
              </CardBox>
            </Row>
            <Row>
              <LineBreaker />
            </Row>
            <Row marginBottom="0">
              <CardBox>
                <CardText title="true">Favorecido</CardText>
                <CardText>{bankInfo.titular}</CardText>
              </CardBox>
              <CardBox>
                <CardText title="true">CPF</CardText>
                <CardText>{formatCpf(bankInfo.cpf)}</CardText>
              </CardBox>
              <CardBox />
            </Row>
          </ContentWrapper>
        </CardWrapper>
      )}
    </>
  )
}

AccountInfos.defaultProps = {
  id: '',
}

AccountInfos.propTypes = {
  id: PropTypes.string,
}

export default AccountInfos
