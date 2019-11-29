/* eslint-disable react/no-array-index-key */
import React from 'react'
import { useHistory } from 'react-router-dom'

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
  Content,
  PerfilTitle,
  SectionSubtitle,
  SectionText,
  ButtonContainer,
  DownloadLink,
} from '../styles'

const ContentDash = () => {
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

      <Accordion title="Perfil do investidor" id="profile">
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

      <Accordion title="Dados pessoais" id="personal">
        <PersonalData />
      </Accordion>

      <Accordion title="Dados cadastrais" id="registration">
        <UserData />
      </Accordion>

      <Accordion title="Dados profissionais" id="professional">
        <ProfessionalData />
      </Accordion>

      <Accordion title="Dados financeiros" id="financial">
        <FinancialData />
      </Accordion>

      <Accordion title="Informe de rendimentos" id="income">
        <IncomeInfo />
      </Accordion>

      <DownloadLink>
        <Icon name="pdf" fill="#1c1c1c99" width={20} />
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
