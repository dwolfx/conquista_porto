/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

import Accordion from 'components/Accordion'
import Button from 'components/Button'
import Icon from 'components/IconExporter'
import WarningsComponent from 'components/Warning'

import FinancialData from './Sections/FinancialData'
import IncomeInfo from './Sections/IncomeInfo'
import PersonalData from './Sections/PersonalData'
import ProfessionalData from './Sections/ProfessionalData'
import UserInfos from './Sections/AccountInfos'
import UserData from './Sections/UserData'
import {
  AccordionTitle,
  Content,
  PerfilTitle,
  SectionSubtitle,
  SectionText,
  ButtonContainer,
  DownloadLink,
} from '../styles'

const ContentDash = () => {
  const themeContext = useContext(ThemeContext)
  const history = useHistory()
  // const [accordionOpened, setAccordionOpened] = useState(false)

  const handleProfileRedirect = () => {
    history.push('/perfil/investidor-perfil')
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const handleRegistrationRedirect = () => {
    history.push('/perfil/cadastro')
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const warnings = [
    {
      title: 'Perfil de investidor vencido.',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
      buttonText: 'Atualizar perfil',
      buttonAction: handleProfileRedirect,
    },
    {
      title: 'Cadastro de investidor vencido.',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
      buttonText: 'Atualizar cadastro',
      buttonAction: handleRegistrationRedirect,
    },
  ]

  return (
    <Content>
      <WarningsComponent warnings={warnings} />

      <UserInfos id="investment" />

      <Accordion
        titleNode={<AccordionTitle>Perfil do investidor</AccordionTitle>}
        id="profile"
      >
        <PerfilTitle>Conservador</PerfilTitle>

        <SectionSubtitle>Descrição</SectionSubtitle>
        <SectionText>
          Para você, o mais importante é ter segurança, pois não gosta de
          surpresas negativas quando o assunto é investimento. Costuma se sentir
          desconfortável quando vê seus recursos diminuírem e, por isso, prefere
          opções mais previsíveis e de menor risco, mesmo que isso leve a um
          rendimento inferior a outras opções mais arriscadas no mercado.
        </SectionText>

        <ButtonContainer>
          <Button onClick={handleProfileRedirect}>
            Refazer perfil do investidor
          </Button>
        </ButtonContainer>
      </Accordion>

      <Accordion
        titleNode={<AccordionTitle>Dados pessoais</AccordionTitle>}
        id="personal"
      >
        <PersonalData />
      </Accordion>

      <Accordion
        titleNode={<AccordionTitle>Dados cadastrais</AccordionTitle>}
        id="registration"
      >
        <UserData />
      </Accordion>

      <Accordion
        titleNode={<AccordionTitle>Dados profissionais</AccordionTitle>}
        id="professional"
      >
        <ProfessionalData />
      </Accordion>

      <Accordion
        titleNode={<AccordionTitle>Dados financeiros</AccordionTitle>}
        id="financial"
      >
        <FinancialData />
      </Accordion>

      <Accordion
        titleNode={<AccordionTitle>Informe de rendimentos</AccordionTitle>}
        id="income"
      >
        <IncomeInfo />
      </Accordion>

      <DownloadLink>
        <Icon name="pdf" fill={themeContext.colors.gray6} width={20} />
        Condições gerais e declarações adicionais do cotista
      </DownloadLink>

      <ButtonContainer>
        <Button color="primary" disabled>
          Salvar alterações
        </Button>
      </ButtonContainer>
    </Content>
  )
}

export default ContentDash
