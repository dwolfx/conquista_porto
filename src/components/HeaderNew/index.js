import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import useMedia from 'hooks/useMedia'
import BreadCrumb from 'components/Breadcrumb'
import Divisor from 'components/Divisor'
import Button from 'components/Button/IconText'
import DropDown from 'components/DropdownNew'

import { handleGiwRedirect } from 'helpers'

import { AuthRequestLogout } from 'store/modules/Auth/action'

import MobileHeader from './Mobile'
import { NotificationsContent } from './DropdownContents'
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
  NotificationBell,
  Avatar,
} from './styles'

export default function HeaderNew({ crumbs }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const isMobile = useMedia('sm')
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const bankData = useSelector(
    state => state.bankData.data && state.bankData.data.DadosContaPortoSeguro
  )

  const points = useSelector(
    state => state.points.data && state.points.data.detalheExtratoOptemaisTypes
  )

  const calculatePointsAmountBalance = extrato =>
    extrato.reduce((acc, curr) => acc + +curr.pontoGanho, 0)

  const userData = useSelector(state => state.auth)

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

  const dropdownGtmItemsTitle = 'dropdown menu header'
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
    // Temporary comment
    // {
    //   icon: 'target',
    //   text: 'Objetivos',
    //   path: '/objetivos',
    // },
    // {
    //   icon: 'diamond',
    //   text: 'Pontos',
    //   path: '/pontos',
    // },
    // {
    //   icon: 'idea',
    //   text: 'Recomendações',
    //   path: '/',
    // },
  ]

  const dropdownNodesTitle = 'Dropdown notificações header'
  const nodes = [NotificationsContent]

  const renderResponsideHeader = () => (
    <>
      {isMobileOpen && (
        <MobileHeader
          items={items}
          setIsOpen={setIsMobileOpen}
          totalPoints={
            points &&
            Intl.NumberFormat().format(calculatePointsAmountBalance(points))
          }
          exitFunc={() => dispatch(AuthRequestLogout(userData.accessToken))}
        />
      )}
      <BgWrapper isScrolled={isMobile}>
        <GridContainer>
          <LeftBlock>
            <ConquistaBeta
              data-gtm-type="click"
              data-gtm-clicktype="link"
              data-gtm-subname="header"
              data-gtm-name="conquista logo"
              onClick={() => history.push('/')}
            />
          </LeftBlock>
          <RightBlock>
            <ResponsiveMenu
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="responsive header"
              data-gtm-name="abrir menu"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <Icon name="menu" color="white" />
            </ResponsiveMenu>
          </RightBlock>
        </GridContainer>
      </BgWrapper>
    </>
  )

  const renderFullHeader = () => (
    <BgWrapper isScrolled={isScrolled}>
      <GridContainer>
        <LeftBlock>
          <ConquistaBeta
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="header"
            data-gtm-name="conquista logo"
            onClick={() => history.push('/')}
          />
          <DropDown
            items={items}
            title={dropdownGtmItemsTitle}
            containerPadding="14px 0"
          >
            <MenuTag
              color="blue"
              text="MENU"
              data-gtm-type="click"
              data-gtm-clicktype="menu"
              data-gtm-subname="header"
              data-gtm-name="menu"
            />
          </DropDown>
          {crumbs.length > 0 && <Icon name="arrowright2" />}
          <BreadCrumb crumbs={[...crumbs]} version="new" />
        </LeftBlock>
        <RightBlock>
          <div
            css={`
              display: none;
            `}
          >
            <DropDown
              nodes={nodes}
              title={dropdownNodesTitle}
              containerPadding="14px 14px 0 14px"
              redirectPath="/notificacoes"
            >
              <NotificationBell
                data-gtm-type="click"
                data-gtm-clicktype="button"
                data-gtm-subname="header"
                data-gtm-name="icone notificacoes"
              />
            </DropDown>
          </div>
          <Avatar
            onClick={() =>
              handleGiwRedirect('giwconquista/arena_perfil.do?portal=7&r=true')
            }
          />
          <Profile
            onClick={() =>
              handleGiwRedirect('giwconquista/arena_perfil.do?portal=7&r=true')
            }
          >
            <div>
              <Name
                data-gtm-type="click"
                data-gtm-clicktype="link"
                data-gtm-subname="header"
                data-gtm-name="nome do usuario"
              >
                {bankData && bankData.titular}
              </Name>
              {points && (
                <Points
                  data-gtm-type="click"
                  data-gtm-clicktype="link"
                  data-gtm-subname="header"
                  data-gtm-name="quantidade de pontos"
                >
                  {Intl.NumberFormat().format(
                    calculatePointsAmountBalance(points)
                  )}{' '}
                  pontos
                </Points>
              )}
            </div>
          </Profile>
          <Divisor vertical customSize="35px" />
          <Button
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="header"
            data-gtm-name="sair"
            iconName="leave"
            onClick={() => {
              dispatch(AuthRequestLogout(userData.accessToken))
            }}
          >
            SAIR
          </Button>
        </RightBlock>
      </GridContainer>
    </BgWrapper>
  )

  return <>{isMobile ? renderResponsideHeader() : renderFullHeader()}</>
}

HeaderNew.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.string),
}

HeaderNew.defaultProps = {
  crumbs: [],
}
