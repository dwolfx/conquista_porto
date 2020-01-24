/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'styled-bootstrap-grid'

import OfferCarImg from 'assets/images/pages/Home/car_offer.jpg'
import OfferHomeImg from 'assets/images/pages/Home/home_offer.jpg'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Text from 'components/Text'
import Tag from 'components/Tag'
import HorizontalList from 'components/HorizontalList'
import Modal from 'components/Modal/ModalNew'

import {
  EmptyBody,
  EmptyText,
  EmptyButton,
  SectionCol,
  FullHeightCard,
  CardPontosFooter,
  OfferBox,
  OfferImageBox,
  OfferTextBox,
  PointsInfo,
  PointDate,
  PointName,
  PointNumber,
  PointsList,
  ContainerBox,
  ModalTextWrapper,
} from './styles'

export default function SectionThree({ points }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const renderPointsFooter = () => {
    if (points) {
      return (
        <CardPontosFooter>
          <ButtonLink onClick={() => setIsModalOpen(!isModalOpen)}>
            Regras e condições
          </ButtonLink>
        </CardPontosFooter>
      )
    }

    return null
  }

  const renderPointsHorizontalList = () =>
    points.detalheExtratoOptemaisTypes &&
    points.detalheExtratoOptemaisTypes.map((item, index) => (
      <HorizontalList
        key={`point-${index}`}
        startItems={[
          <PointDate>{item.dataCompra}</PointDate>,
          <PointName>{item.nomeTransacao}</PointName>,
        ]}
        endItems={[<PointNumber bold>{item.pontoGanho}</PointNumber>]}
      />
    ))

  const renderEmptyState = () => (
    <EmptyBody>
      <EmptyText>
        Ao investir na nossa plataforma, fazer compras no cartão de crédito e ao
        contratar produtos Porto Seguro você terá acesso a ofertas e descontos
        exclusivos!
      </EmptyText>
      <EmptyButton
        color="secondary"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Ver regras e condições
      </EmptyButton>
    </EmptyBody>
  )

  const renderModalContent = () => {
    const customText = (type, color, text) => (
      <Text type={type} color={color} bold>
        {text}
      </Text>
    )
    const tag = (color, text) => <Tag color={color} text={text} />

    return (
      <>
        <ModalTextWrapper>
          <Text type="headline" color="gray6" bold>
            Como acumular pontos?
          </Text>
          <Text type="headline" color="gray5">
            Confira as condições exclusivas para os colaboradores da Porto
            Seguro. Essas condições são válidas até 01/02/2019.
          </Text>
        </ModalTextWrapper>
        <ContainerBox>
          <HorizontalList
            noPadding
            startItems={[
              customText('headline', 'gray6', 'Cadastro no Conquista'),
            ]}
            endItems={[tag('gray', '250 pontos')]}
          />
          <HorizontalList
            noPadding
            startItems={[
              customText('headline', 'gray6', 'Cadastro de investidor'),
            ]}
            endItems={[tag('gray', '200 pontos')]}
          />
          <HorizontalList
            noPadding
            startItems={[
              customText('headline', 'gray6', 'Primeiro objetivo salvo'),
            ]}
            endItems={[tag('gray', '100 pontos')]}
          />
          <HorizontalList
            noPadding
            startItems={[
              customText(
                'headline',
                'gray6',
                'Primeiro investimento realizado'
              ),
            ]}
            endItems={[tag('gray', '200 pontos')]}
          />
        </ContainerBox>
        <ModalTextWrapper>
          <Text type="headline" color="gray6" bold>
            Quem pode pontuar?
          </Text>
          <Text type="headline" color="gray5">
            Todos as pessoas que acessam o Conquista têm acesso ao programa e
            podem pontuar. Aqueles que já forem investidores na Portopar, têm os
            pontos de cadastro e cadastro de investidor contabilizados ao
            realizarem o 1° acesso à plataforma.
          </Text>
        </ModalTextWrapper>
        <ModalTextWrapper>
          <Text type="headline" color="gray6" bold>
            Depois de quanto tempo os pontos expiram?
          </Text>
          <Text type="headline" color="gray5">
            O pontos têm duração de 24 meses a partir da emissão.
          </Text>
        </ModalTextWrapper>
        <ModalTextWrapper>
          <Text type="headline" color="gray6" bold>
            Como somar pontos com o Cartão de Crédito Porto Seguro?
          </Text>
          <Text type="headline" color="gray5">
            Os pontos do Programa de Relacionamento do Conquista são
            automaticamente somados aos pontos do titular do Cartão de Crédito
            Porto Seguro.
          </Text>
        </ModalTextWrapper>
      </>
    )
  }

  const renderPointsAmountBalance = extrato =>
    extrato.reduce((acc, curr) => acc + +curr.pontoGanho, 0)

  return (
    <>
      <Modal
        modalTitle="Regras de condições"
        alignItems="flex-start"
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        {renderModalContent()}
      </Modal>
      <SectionCol lg="5">
        <FullHeightCard
          headerIcon="diamond"
          headerTitle="Pontos"
          footer={renderPointsFooter()}
        >
          <PointsInfo>
            <Text type="headline">Saldo atual</Text>
            <Text type="headline" bold>
              {points
                ? renderPointsAmountBalance(points.detalheExtratoOptemaisTypes)
                : 0}{' '}
              pontos
            </Text>
            {points && <Button color="secondary">Resgatar</Button>}
          </PointsInfo>
          {points && points.detalheExtratoOptemaisTypes.length > 0 ? (
            <>
              <PointsList>{renderPointsHorizontalList()}</PointsList>
            </>
          ) : (
            renderEmptyState()
          )}
        </FullHeightCard>
      </SectionCol>

      <SectionCol lg="7">
        <Row style={{ height: '100%' }}>
          <SectionCol lg="6">
            <FullHeightCard headerIcon="diamond" headerTitle="#OfertaCarro">
              <OfferBox>
                <OfferImageBox>
                  <img src={OfferCarImg} alt="car offer pic" />
                </OfferImageBox>
                <OfferTextBox>
                  <Text type="headline" bold>
                    Título
                  </Text>
                  <Text>
                    6.000 pontos equivalem a R$ 300,00 de desconto no seguro do
                    seu automóvel
                  </Text>
                </OfferTextBox>
              </OfferBox>
            </FullHeightCard>
          </SectionCol>
          <SectionCol lg="6">
            <FullHeightCard headerIcon="diamond" headerTitle="#OfertaCasa">
              <OfferBox>
                <OfferImageBox>
                  <img src={OfferHomeImg} alt="home offer pic" />
                </OfferImageBox>
                <OfferTextBox>
                  <Text type="headline" bold>
                    Título
                  </Text>
                  <Text>
                    4.000 pontos equivalem a R$ 360,00 na lavagem do seu sofá
                  </Text>
                </OfferTextBox>
              </OfferBox>
            </FullHeightCard>
          </SectionCol>
        </Row>
      </SectionCol>
    </>
  )
}

SectionThree.defaultProps = {
  points: null,
}

SectionThree.propTypes = {
  points: PropTypes.shape({
    detalheExtratoOptemaisTypes: PropTypes.arrayOf(
      PropTypes.shape({
        dataCompra: PropTypes.string,
        nomeTransacao: PropTypes.string,
        pontoGanho: PropTypes.string,
      })
    ),
  }),
}
