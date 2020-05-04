import React from 'react'
import PropTypes from 'prop-types'

import Text from 'components/Text'
import { formatMoney } from 'helpers'

import { Wrapper } from '../styles'
import * as s from './styles'

const MobileView = ({ funds, handleOpenModal }) => (
  <>
    <s.ResponsiveTableContainer>
      {funds.map(fund => (
        <React.Fragment key={fund.fund_id}>
          <Wrapper>
            <Text
              type="body"
              width="270px"
              css={`
                margin-left: 7px;
                margin-bottom: 7px;
              `}
            >
              {fund.name}
            </Text>
          </Wrapper>

          <s.TableCard>
            <Text type="captionUppercase" color="gray4">
              RENTABILIDADE (ÚLT. 12 MESES)
            </Text>
            <Text type="headline" color="gray6">
              {fund.profitability &&
              fund.profitability[0] &&
              fund.profitability[0].value &&
              fund.profitability[0].value[3]
                ? `${fund.profitability[0].value[3]}%`
                : '-'}
            </Text>
          </s.TableCard>
          <s.TableCard>
            <Text type="captionUppercase" color="gray4">
              INVESTIMENTO INICIAL
            </Text>
            <Text type="headline" color="gray6">
              {formatMoney(fund.initial_value)}
            </Text>
          </s.TableCard>
          <s.TableCard>
            <Text type="captionUppercase" color="gray4">
              INVESTIMENTO MENSAL
            </Text>
            <Text type="headline" color="gray6">
              {formatMoney(fund.monthly_value)}
            </Text>
          </s.TableCard>
          <s.ResponsiveTableButton
            outline
            onClick={() => handleOpenModal(fund)}
          >
            VER MAIS
          </s.ResponsiveTableButton>
          <s.TableDivisor />
        </React.Fragment>
      ))}
    </s.ResponsiveTableContainer>
  </>
)

MobileView.propTypes = {
  funds: PropTypes.arrayOf(
    PropTypes.shape({
      fund_id: PropTypes.number,
    })
  ).isRequired,
  handleOpenModal: PropTypes.func.isRequired,
}

export default MobileView
