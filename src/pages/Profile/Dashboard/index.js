import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Modal from 'components/Modal'
import Sidebar from 'components/Sidebar'
import theme from 'styles/theme'

import UncompleteProfile from './InitialDashboard'
import CompletedProfile from './CompletedDashboard'
import {
  GreySection,
  ModalSectionTitle,
  ModalSectionText,
  ButtonContainer,
  InputCode,
} from '../styles'

const Dashboard = ({ profileIsCompleted }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalIcon, setModalIcon] = useState('')
  const [modalBody, setModalBody] = useState('')
  const [modalSize, setModalSize] = useState('')

  const scrollTo = sectionId => {
    const el = document.getElementById(sectionId)
    el.scrollIntoView(true)
  }

  if (!profileIsCompleted) {
    const initialDashBoardSidebar = [
      {
        items: [
          {
            title: 'Perfil',
            icon: 'arrowdown',
            iconColor: theme.colors.lightPrimary,
          },
          {
            title: 'Dados pessoais',
            icon: 'arrowdown',
            iconColor: theme.colors.lightPrimary,
          },
          {
            title: 'Dados cadastrais',
            icon: 'arrowdown',
            iconColor: theme.colors.lightPrimary,
          },
          {
            title: 'Meu parceiro',
            icon: 'arrowdown',
            iconColor: theme.colors.lightPrimary,
          },
        ],
      },
    ]

    return (
      <>
        <Sidebar sidebarItems={initialDashBoardSidebar} />
        <UncompleteProfile />

        <Modal
          modalTitle={modalTitle}
          headerIcon={modalIcon}
          isOpen={modalIsOpen}
          size={modalSize}
          handleClose={() => setModalIsOpen(!modalIsOpen)}
        >
          {modalBody}
        </Modal>
      </>
    )
  }

  const completedDashboardSidebar = [
    {
      items: [
        {
          title: 'Conta de investimento',
          onItemClick: () => {
            scrollTo('investment')
          },
        },
        {
          title: 'Perfil',
          icon: 'arrowdown',
          iconColor: theme.colors.lightPrimary,
          onItemClick: () => {
            scrollTo('profile')
          },
        },
        {
          title: 'Dados pessoais',
          icon: 'arrowdown',
          iconColor: theme.colors.lightPrimary,
          onItemClick: () => {
            scrollTo('personal')
          },
        },
        {
          title: 'Dados cadastrais',
          icon: 'arrowdown',
          iconColor: theme.colors.lightPrimary,
          onItemClick: () => {
            scrollTo('registration')
          },
        },
        {
          title: 'Dados profissionais',
          icon: 'arrowdown',
          iconColor: theme.colors.lightPrimary,
          onItemClick: () => {
            scrollTo('professional')
          },
        },
        {
          title: 'Dados financeiros',
          icon: 'arrowdown',
          iconColor: theme.colors.lightPrimary,
          onItemClick: () => {
            scrollTo('financial')
          },
        },
        {
          title: 'Informe de rendimentos',
          icon: 'arrowdown',
          iconColor: theme.colors.lightPrimary,
          onItemClick: () => {
            scrollTo('income')
          },
        },
      ],
    },
    {
      items: [
        {
          title: 'Meu parceiro',
          color: 'primary',
          uppercase: true,
          onItemClick: () => {
            setModalSize('md')
            setModalIcon('link')
            setModalTitle('Meu parceiro')
            setModalBody(
              <>
                <GreySection justify="center">
                  <ModalSectionTitle>
                    Lorem ipsum minim veniam, quis nostrud exercitationz
                  </ModalSectionTitle>
                  <ModalSectionText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum feugiat, diam vel sodales vehicula, neque turpis
                    ultricies neque, eget molestie leo orci eu nibh. Nunc neque
                    sapien, hendrerit in suscipit in, elementum eu lorem.
                    Aliquam Aliquam sodales risus a mollis rutrum. In aliquam,
                    libero ut tempus, nibh erat ultricies tortor, eget tempus
                    tellus arcu eu nisl. Vivamus dignissim, magna in facilisis
                    ultrices, lorem ligula facilisis ligula.
                  </ModalSectionText>
                </GreySection>
                <GreySection justify="center">
                  <ModalSectionTitle>
                    Qual o código enviado pelo seu parceiro?
                  </ModalSectionTitle>
                  <InputCode />
                  <ButtonContainer>
                    <Button>Buscar</Button>
                  </ButtonContainer>
                </GreySection>
                <ButtonContainer>
                  <Button color="alternative">Confirmar</Button>
                </ButtonContainer>
              </>
            )

            setModalIsOpen(true)
          },
        },
        {
          title: 'Dados de acesso',
          color: 'primary',
          uppercase: true,
          onItemClick: () => {
            setModalSize('sm')
            setModalTitle('Dados de acesso')
            setModalIcon('safebox')
            setModalBody(
              <>
                <ButtonContainer>
                  <Button color="primary">
                    Alterar senha de acesso do Portal
                  </Button>
                </ButtonContainer>
                <ButtonContainer>
                  <Button color="primary">Alterar assinatura eletrônica</Button>
                </ButtonContainer>
              </>
            )

            setModalIsOpen(true)
          },
        },
      ],
    },
  ]

  return (
    <>
      <Sidebar sidebarItems={completedDashboardSidebar} />
      <CompletedProfile />

      <Modal
        modalTitle={modalTitle}
        headerIcon={modalIcon}
        isOpen={modalIsOpen}
        size={modalSize}
        handleClose={() => setModalIsOpen(!modalIsOpen)}
      >
        {modalBody}
      </Modal>
    </>
  )
}

Dashboard.defaultProps = {
  profileIsCompleted: false,
}

Dashboard.propTypes = {
  profileIsCompleted: PropTypes.bool,
}

export default Dashboard
