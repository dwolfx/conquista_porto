import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useMedia from 'hooks/useMedia'
import BreadCrumb from 'components/Breadcrumb'
import Tag from 'components/Tag'
import Divisor from 'components/Divisor'
import Button from 'components/Button/IconText'
import NotificationBell from 'components/NotificationBell'
import Avatar from 'components/Avatar'
import DropDown from 'components/DropdownNew'
import {
  BgWrapper,
  GridContainer,
  LeftBlock,
  RightBlock,
  Icon,
  ConquistaBeta,
  Profile,
  Name,
  Points,
  ResponsiveMenu,
} from './styles'

export default function HeaderNew() {
  const history = useHistory()
  const [isMobile] = useState(useMedia('sm'))
  const [crumbs, setCrumbs] = useState([])
  const bankData = useSelector(
    state => state.bankData.data && state.bankData.data.DadosContaPortoSeguro
  )

  useEffect(() => {
    if (!crumbs) {
      setCrumbs(history.location.pathname.split('/').filter(el => el !== ''))
    }
  }, [history, crumbs])

  useEffect(() => {
    setCrumbs(history.location.pathname.split('/').filter(el => el !== ''))
  }, [history.location.pathname])

  const renderResponsideHeader = () => (
    <GridContainer>
      <LeftBlock>
        <ConquistaBeta />
      </LeftBlock>
      <RightBlock>
        <ResponsiveMenu>
          <Icon name="menu" color="white" />
        </ResponsiveMenu>
      </RightBlock>
    </GridContainer>
  )

  const renderFullHeader = () => (
    <BgWrapper>
      <GridContainer>
        <LeftBlock>
          <ConquistaBeta onClick={() => history.push('/')} />
          <DropDown items={items}>
            <Tag color="blue" text="MENU" />
          </DropDown>
          {crumbs.length > 0 && <Icon name="arrowright2" />}
          <BreadCrumb crumbs={[...crumbs]} version="new" />
        </LeftBlock>
        <RightBlock>
          <NotificationBell />
          <Avatar />
          <Profile>
            <div>
              <Name>{bankData && bankData.titular}</Name>
              <Points>4.200 pontos</Points>
            </div>
          </Profile>
          <Divisor vertical />
          <Button iconName="leave">SAIR</Button>
        </RightBlock>
      </GridContainer>
    </BgWrapper>
  )

  const items = [
    {
      icon: 'home',
      text: 'Início',
      path: '/',
    },
    {
      icon: 'apps',
      text: 'Produtos',
      children: [
        {
          icon: 'creditcard',
          text: 'Cartão de Crédito',
          path: '/cartao-credito',
        },
        {
          icon: 'homewithwindow',
          text: 'Consórcio de Imóvel',
          path: '/consorcio-imovel',
        },
        {
          icon: 'car2',
          text: 'Consórcio de Veículo',
          path: '/consorcio-veiculo',
        },
        {
          icon: 'money',
          text: 'Financiamento de Veículo',
          path: '/financiamento-veiculo',
        },
        {
          icon: 'barchart',
          text: 'Investimentos',
          path: '/investimentos',
        },
        {
          icon: 'time',
          text: 'Previdência Privada',
          path: '/previdencia-privada',
        },
        {
          icon: 'persongroup',
          text: 'Seguro de Vida',
          path: '/seguro-vida',
        },
        {
          icon: 'plane',
          text: 'Seguro Viagem',
          path: '/seguro-viagem',
        },
      ],
    },
    {
      icon: 'target',
      text: 'Objetivos',
      path: '/objetivos',
    },
    {
      icon: 'diamond',
      text: 'Pontos',
      path: '/pontos',
    },
    {
      icon: 'idea',
      text: 'Recomendações',
      path: '/',
    },
  ]

  return <>{isMobile ? renderResponsideHeader() : renderFullHeader()}</>
}
