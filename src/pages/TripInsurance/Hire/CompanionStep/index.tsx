import React from 'react'
import { uuid } from 'uuidv4'
import { Container, Col } from 'styled-bootstrap-grid'
import useMedia from 'hooks/useMedia'

import Icon from 'components/IconExporter'
import ButtonLink from 'components/Button/Link'
import DivisorDescription from 'pages/TripInsurance/commons/DivisorDescription'
import StepBar from 'pages/TripInsurance/commons/StepBar'

import * as s from './styles'

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

const CompanionStep: React.FC<ICompanion> = ({ companions }) => {
  const isDesktop = useMedia('lgUp')
  const isTablet = useMedia('mdUp')
  const isMobile = useMedia('sm')

  const renderStatusBody = (companionStatus: boolean) => {
    return (
      <s.StatusWrapper>
        <Icon
          width="21"
          color={companionStatus ? 'green4' : 'magenta2'}
          name={companionStatus ? 'check' : 'closerounded'}
        />
        {!isMobile && (
          <s.StatusText
            type="caption"
            bold
            color={companionStatus ? 'green4' : 'magenta2'}
          >
            {companionStatus ? 'Dados preenchidos' : 'Dados não inseridos'}
          </s.StatusText>
        )}
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
      <StepBar actualStep={2} totalNumberOfSteps={5} />
      <s.ContentWrapper>
        <s.Row
          alignItems="center"
          justifyContent={isDesktop ? 'start' : 'center'}
        >
          <Col sm={12} md={12} lg={3}>
            {isDesktop ? (
              <DivisorDescription
                title="Acompanhantes"
                text="Aqui você vai inserir os dados
                  das pessoas que irão viajar junto com você."
              />
            ) : (
              <>
                <s.DescriptionText
                  textAlign={isTablet ? 'center' : 'unset'}
                  type="heading4"
                  color="gray6"
                  bold
                >
                  Acompanhantes
                </s.DescriptionText>
                <s.DescriptionText
                  textAlign={isTablet ? 'center' : 'unset'}
                  type="headline"
                  color="gray6"
                >
                  Aqui você vai inserir os dados das pessoas que irão viajar
                  junto com você.
                </s.DescriptionText>
              </>
            )}
          </Col>
          <Col offset={isDesktop ? 1 : 0} xs={12} sm={12} md={10} lg={8}>
            <s.Card>
              <s.TitleText
                type="subheading"
                bold
                textTransform="uppercase"
                textAlign={isMobile ? 'center' : 'left'}
                color="gray5"
              >
                Declaração de Acompanhante
              </s.TitleText>
              <s.Table>
                <s.Thead>
                  <s.THeadTr>
                    <s.Th>
                      <s.Text type="subheading" bold color="gray6">
                        NOMES
                      </s.Text>
                    </s.Th>
                    <s.Th>
                      <s.Text type="subheading" bold color="gray6">
                        STATUS
                      </s.Text>
                    </s.Th>
                  </s.THeadTr>
                </s.Thead>
                <s.Tbody>
                  {renderTableBody(renderTableCompanionDataMock)}
                </s.Tbody>
              </s.Table>
            </s.Card>
          </Col>
        </s.Row>
      </s.ContentWrapper>
      <s.FooterContainer>
        <s.NextButton color="secondary">próximo</s.NextButton>
      </s.FooterContainer>
    </>
  )
}

export default CompanionStep
