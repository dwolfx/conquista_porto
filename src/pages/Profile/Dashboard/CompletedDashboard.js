/* eslint-disable react/no-array-index-key */
import React from 'react'
import Accordion from '../../../components/Accordion'
import Button from '../../../components/Button'
import FinancialData from './Sections/FinancialData'
import Icon from '../../../components/IconExporter'
import IncomeInfo from './Sections/IncomeInfo'
import PersonalData from './Sections/PersonalData'
import ProfessionalData from './Sections/ProfessionalData'
import UserInfos from './Sections/AccountInfos'
import UserData from './Sections/UserData'
import WarningsComponent from '../../../components/Warning'
import {
  Content,
  PerfilTitle,
  SectionSubtitle,
  SectionText,
  ButtonContainer,
  DownloadLink,
} from '../styles'

const ContentDash = () => {
  // const [accordionOpened, setAccordionOpened] = useState(false)

  const warnings = [
    {
      title: 'Perfil de investidor vencido.',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
      buttonText: 'Atualizar perfil',
    },
    {
      title: 'Cadastro de investidor vencido.',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
      buttonText: 'Atualizar cadastro',
    },
  ]

  return (
    <Content>
      <WarningsComponent warnings={warnings} />

      <UserInfos />

      <Accordion title="Perfil do investidor">
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
          <Button>Refazer perfil do investidor</Button>
        </ButtonContainer>
      </Accordion>

      <Accordion title="Dados pessoais">
        <PersonalData />
      </Accordion>

      <Accordion title="Dados cadastrais">
        <UserData />
      </Accordion>

      <Accordion title="Dados profissionais">
        <ProfessionalData />
      </Accordion>

      <Accordion title="Dados financeiros">
        <FinancialData />
      </Accordion>

      <Accordion title="Informe de rendimentos">
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
