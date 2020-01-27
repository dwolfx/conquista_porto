import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useMedia from 'hooks/useMedia'
import BreadCrumb from 'components/Breadcrumb'
import Divisor from 'components/Divisor'
import Button from 'components/Button/IconText'
import NotificationBell from 'components/NotificationBell'
import Avatar from 'components/Avatar'
import DropDown from 'components/DropdownNew'
import MobileHeader from './Mobile'
import {
  BgWrapper,
  GridContainer,
  // MobileContainer,
  LeftBlock,
  RightBlock,
  Icon,
  ConquistaBeta,
  Profile,
  Name,
  Points,
  ResponsiveMenu,
  MenuTag,
} from './styles'

export default function HeaderNew() {
  const history = useHistory()
  const [isMobile] = useState(useMedia('sm'))
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [crumbs, setCrumbs] = useState([])
  const [isScrolled, setIsScrolled] = useState(false)
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

  function checkScroll() {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)

    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const renderResponsideHeader = () => (
    <>
      {isMobileOpen && (
        <MobileHeader items={items} setIsOpen={setIsMobileOpen} />
      )}
      <BgWrapper>
        <GridContainer isScrolled={isMobile}>
          <LeftBlock>
            <ConquistaBeta onClick={() => history.push('/')} />
          </LeftBlock>
          <RightBlock>
            <ResponsiveMenu onClick={() => setIsMobileOpen(!isMobileOpen)}>
              <Icon name="menu" color="white" />
            </ResponsiveMenu>
          </RightBlock>
        </GridContainer>
      </BgWrapper>
    </>
  )

  const renderFullHeader = () => (
    <BgWrapper>
      <GridContainer isScrolled={isScrolled}>
        <LeftBlock>
          <ConquistaBeta onClick={() => history.push('/')} />
          <DropDown items={items}>
            <MenuTag color="blue" text="MENU" />
          </DropDown>
          {crumbs.length > 0 && <Icon name="arrowright2" />}
          <BreadCrumb crumbs={[...crumbs]} version="new" />
        </LeftBlock>
        <RightBlock>
          <NotificationBell onClick={() => history.push('/notificacoes')} />
          <Avatar onClick={() => history.push('/perfil')} />
          <Profile>
            <div>
              <Name>{bankData && bankData.titular}</Name>
              <Points>4.200 pontos</Points>
            </div>
          </Profile>
          <Divisor vertical customSize="35px" />
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
