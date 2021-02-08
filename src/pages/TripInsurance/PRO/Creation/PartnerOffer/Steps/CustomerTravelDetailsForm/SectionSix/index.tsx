import React from 'react'
import { uuid } from 'uuidv4'

import ButtonLink from 'components/Button/Link'
import Icon from 'components/IconExporter'

import * as s from '../styles'
import * as t from '../types'
import * as u from '../utils'

export const SectionSix: React.FC<t.ISectionSix> = ({
  setIsSectionValid,
  sectionSixRef,
  ...rest
}) => {
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

  const renderTableBody = (companions: t.ICompanionsData[]) => {
    return companions.map((companion, index) => (
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
    <section id="section-6" ref={sectionSixRef} {...rest}>
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
            <s.Tbody>{renderTableBody(u.renderTableCompanionDataMock)}</s.Tbody>
          </s.Table>
        </s.ContentWrapper>
      </s.Card>
    </section>
  )
}
export default SectionSix
