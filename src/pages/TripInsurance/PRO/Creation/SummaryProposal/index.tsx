import React from 'react'
import { StepComponent } from 'hooks/FluxManagement/types'

import StepBar from '../commons/StepBar'
import Text from 'components/Text'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import Divisor from 'components/Divisor'
import Icon from 'components/IconExporter'
import ButtonLink from 'components/Button/Link'

import * as t from 'components/Inputs/Select/types'
import * as s from './styles'
import { uuid } from 'uuidv4'
import VerticalList from 'components/VerticalList'

interface ICompanionsData {
  name: string
  status: boolean
}

interface ICompanion {
  companions: ICompanionsData[]
}

const renderTableCompanionDataMock = [
  {
    name: 'Bruno Mizhari',
    status: false,
  },
  {
    name: 'Valesca',
    status: false,
  },
  {
    name: 'Anitta',
    status: false,
  },
  {
    name: 'Pablo Vittar',
    status: false,
  },
]

const genders: t.TOptions[] = [
  {
    id: 1,
    text: 'Masculino',
  },
  {
    id: 2,
    text: 'Feminino',
  },
]

const telephoneType: t.TOptions[] = [
  {
    id: 1,
    text: 'Celular',
  },
  {
    id: 2,
    text: 'Fixo',
  },
]

const selected: t.TSelected = {
  id: 0,
}

const SummaryProposal: StepComponent = () => {
  const renderStatusBody = (companionStatus: boolean) => {
    return (
      <s.StatusWrapper>
        <Icon
          width="21"
          color={companionStatus ? 'green4' : 'magenta2'}
          name={companionStatus ? 'check' : 'closerounded'}
        />
        <s.StatusText
          type="caption"
          bold
          color={companionStatus ? 'green4' : 'magenta2'}
        >
          {companionStatus ? 'Dados preenchidos' : 'Dados não inseridos'}
        </s.StatusText>
      </s.StatusWrapper>
    )
  }

  const renderTableBody = (companions: ICompanionsData[]) => {
    return companions.map((companion: ICompanionsData, index) => (
      <s.Tr key={uuid()}>
        <s.Td>
          <s.NameText bold>
            {companion.name || `Acompanhante ${index + 1}`}
            <ButtonLink
              data-gtm-type="click"
              data-gtm-clicktype="link"
              data-gtm-name="Inserir Dados"
              noIcon={true}
              noIconPadding
              onClick={() => {}}
            >
              INSERIR DADOS
            </ButtonLink>
          </s.NameText>
        </s.Td>
        <s.Td>{renderStatusBody(companion.status)}</s.Td>
      </s.Tr>
    ))
  }
  return (
    <>
      <StepBar actualStep={1} totalNumberOfSteps={2} />
      <s.Container>
        <s.Col lg={3}>
          <s.InformationWrapper>
            <s.TitleText bold type="subheading">
              DADOS DA CONTRATAÇÃO
            </s.TitleText>
            <VerticalList
              noSpacing
              elements={[
                <s.NavigationItem>
                  <Text bold type="caption">
                    Planos
                  </Text>
                </s.NavigationItem>,
                <s.NavigationItem>
                  <Text bold type="caption">
                    Dados do Cliente
                  </Text>
                  <s.BadgeNotification />
                </s.NavigationItem>,
                <s.NavigationItem>
                  <Text bold type="caption">
                    Dados para Contato
                  </Text>
                  <s.BadgeNotification />
                </s.NavigationItem>,
                <s.NavigationItem>
                  <Text bold type="caption">
                    Pessoa Politicamente Exposta (PPE)
                  </Text>
                  <s.BadgeNotification />
                </s.NavigationItem>,
                <s.NavigationItem>
                  <Text bold type="caption">
                    Endereço
                  </Text>
                  <s.BadgeNotification />
                </s.NavigationItem>,
                <s.NavigationItem>
                  <Text bold type="caption">
                    Contato em casos de acidente
                  </Text>
                  <s.BadgeNotification />
                </s.NavigationItem>,
                <s.NavigationItem>
                  <Text bold type="caption">
                    Declaração de Acompanhantes
                  </Text>
                  <s.BadgeNotification />
                </s.NavigationItem>,
              ]}
            />
          </s.InformationWrapper>
        </s.Col>
        <s.Col lg={8}>
          <s.Card>
            <s.CardTitle bold type="subheading" color="gray5">
              DADOS DO CLIENTE
            </s.CardTitle>
            <DataRow label="Nome" value="Bruno Mizrahi" />
            <Divisor />
            <DataRow label="CPF" value="421.980.660-20" />
            <Divisor />
            <DataRow label="Data de nascimento" value="14/02/1987" />
            <Divisor />
            <s.SelectGender
              label="sexo"
              options={genders}
              selected={selected}
            />
            <Divisor />
            <s.RadioContainer>
              <Text type="headline" bold>
                O cliente reside no Brasil?
              </Text>
              <s.RadioOptionsWrapper>
                <s.Radio
                  id={uuid()}
                  name="is-brazilian-resident"
                  label="Sim"
                  value={1}
                  checked={false}
                  handleChange={() => null}
                  disabled
                />
                <s.Radio
                  id={uuid()}
                  name="is-brazilian-resident"
                  label="Não"
                  value={0}
                  checked
                  handleChange={() => null}
                />
              </s.RadioOptionsWrapper>
            </s.RadioContainer>
          </s.Card>
          <s.Card overflow="visible">
            <s.CardTitle bold type="subheading" color="gray5">
              DADOS PARA CONTATO
            </s.CardTitle>
            <s.ContentWrapper>
              <s.TextInput
                label="E-MAIL"
                value=""
                placeholder="Digite aqui..."
              />
              <s.InputsWrapper>
                <s.TextInputMedium
                  label="TELEFONE"
                  value=""
                  placeholder="Ex: (12) 34567890"
                />
                <s.SelectTelephoneType
                  label="TIPO DE TELEFONE"
                  options={telephoneType}
                  selected={selected}
                />
              </s.InputsWrapper>
            </s.ContentWrapper>
          </s.Card>
          <s.Card>
            <s.CardTitle bold type="subheading" color="gray5">
              PESSOA POLITICAMENTE EXPOSTA (PPE)
            </s.CardTitle>
            <s.ContentWrapper>
              <s.Text bold type="headline">
                Segurado é ou possui parentesco com uma pessoa politicamente
                exposta?
              </s.Text>
              <s.Text bold color="gray5">
                Pessoa Exposta Politicamente é aquela que desempenha ou
                desempenhou nos últimos cinco anos, cargos, empregos ou funções
                públicas relevantes como chefes de estado e de governo,
                políticos, altos servidores dos poderes públicos, magistrados ou
                militares de alto nível, dirigentes de empresas públicas ou
                dirigentes de partidos políticos.
              </s.Text>
              <s.RadioOptionsWrapper>
                <s.Radio
                  id={uuid()}
                  name="is-ppe"
                  label="Sim"
                  value={1}
                  checked={false}
                  handleChange={() => null}
                  disabled
                />
                <s.Radio
                  id={uuid()}
                  name="is-ppe"
                  label="Não"
                  value={0}
                  checked
                  handleChange={() => null}
                />
              </s.RadioOptionsWrapper>
            </s.ContentWrapper>
          </s.Card>
          <s.Card>
            <s.CardTitle bold type="subheading" color="gray5">
              ENDEREÇO
            </s.CardTitle>
          </s.Card>
          <s.Card>
            <s.CardTitle bold type="subheading" color="gray5">
              CONTATO EM CASO DE ACIDENTES
            </s.CardTitle>
            <s.ContentWrapper>
              <s.InputsWrapper>
                <s.TextInputMedium
                  label="NOME"
                  value=""
                  placeholder="Digite aqui... "
                />
                <s.TextInput
                  label="TELEFONE"
                  value=""
                  placeholder="Ex: (12) 34567890"
                />
              </s.InputsWrapper>
            </s.ContentWrapper>
          </s.Card>
          <s.Card>
            <s.CardTitle bold type="subheading" color="gray5">
              DECLARAÇÃO DE ACOMPANHANTES
            </s.CardTitle>
            <s.ContentWrapper>
              <s.Table>
                <s.Thead>
                  <s.THeadTr>
                    <s.Th>
                      <s.ThText type="subheading" bold color="gray6">
                        NOMES
                      </s.ThText>
                    </s.Th>
                    <s.Th>
                      <s.ThText type="subheading" bold color="gray6">
                        STATUS
                      </s.ThText>
                    </s.Th>
                  </s.THeadTr>
                </s.Thead>
                <s.Tbody>
                  {renderTableBody(renderTableCompanionDataMock)}
                </s.Tbody>
              </s.Table>
            </s.ContentWrapper>
          </s.Card>
        </s.Col>
      </s.Container>
      <s.FooterContainer>
        <s.FooterCol lg={11}>
          <s.Button color="secondary">ENVIAR PROPOSTA</s.Button>
        </s.FooterCol>
      </s.FooterContainer>
    </>
  )
}

export default SummaryProposal
