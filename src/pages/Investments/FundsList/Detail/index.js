import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { handleGiwRedirect } from 'helpers'
import Drawer from 'components/Drawer'
import 'styled-components/macro'

import Loading from 'components/Loading'
import Button from 'components/Button'
import Text from 'components/Text'

import { useSelector, useDispatch } from 'react-redux'
import { TabList, Tab, Tabs, TabPanel } from 'components/Tab/NewTab'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import {
  ButtonSubmit,
  EmptyStateWrapper,
  LockFundWrapper,
  LockIcon,
} from './styled'
import TabProfitability from './TabProfitability'
import TabMoreInfo from './TabMoreInfo'
import TabDetails from './TabDetails'

const Detail = ({ isOpen, isOpenForInvestments, handleClose, hasError }) => {
  const { data: fundDetails, isLoading } = useSelector(
    state => state.investmentDetails
  )
  const dispatch = useDispatch()
  const funds = useSelector(state => state.investmentsList)
  const categories = funds.data[0]

  const getCategoryName = () => {
    let name = ''
    if (categories && fundDetails !== false)
      categories.forEach(category => {
        const filteredResult = category.fundos.filter(
          fundo => fundo.id_fundo === fundDetails.id_fundo
        )
        if (filteredResult.length > 0) {
          name = category.nome_categoria
        }
      })
    return name
  }
  const category = getCategoryName()

  const { state: locationState } = useLocation()
  const footerDrawer = () =>
    isOpenForInvestments ? (
      <ButtonSubmit
        color="secondary"
        onClick={() => {
          handleGiwRedirect(
            `portaldecliente/conquista/aplicacao?idFundo=${
              fundDetails.id_fundo
            }&r=true${
              locationState && locationState.idGoal
                ? `&idObjetivo=${locationState.idGoal}`
                : ''
            }`
          )
        }}
      >
        Investir
      </ButtonSubmit>
    ) : (
      <LockFundWrapper>
        <LockIcon />
        <Text color="gray5" type="button">
          FUNDO FECHADO PARA APLICAÇÕES
        </Text>
      </LockFundWrapper>
    )

  const renderTabs = () => (
    <Tabs name="tab-detalhe" initialValue="tab-detalhe-fundo" initialReset>
      <TabList>
        <Tab
          name="tab-detalhe-fundo"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname="Detalhe do Fundo"
          data-gtm-name="Lista de fundos"
        >
          Detalhes
        </Tab>
        <Tab
          name="tab-rentabilidade"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname="Rentabilidade"
          data-gtm-name="Lista de fundos"
        >
          Rentabilidade
        </Tab>
        <Tab
          name="tab-informacoes"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname="Informações"
          data-gtm-name="Lista de fundos"
        >
          Informações
        </Tab>
      </TabList>

      <TabPanel name="tab-detalhe-fundo">
        <TabDetails fund={fundDetails} category={category} />
      </TabPanel>
      <TabPanel name="tab-rentabilidade">
        <TabProfitability fund={fundDetails} />
      </TabPanel>
      <TabPanel name="tab-informacoes">
        <TabMoreInfo fund={fundDetails} />
      </TabPanel>
    </Tabs>
  )

  return (
    <Drawer
      drawerTitle={!isLoading && fundDetails.apelido}
      isOpen={isOpen}
      isLoading={isLoading}
      handleClose={handleClose}
      footer={footerDrawer()}
    >
      {isLoading && (
        <EmptyStateWrapper>
          <Loading
            type="bar"
            legend="Aguarde, estamos buscando as informações detalhadas deste fundo de investimento..."
            widthBar="100%"
          />
        </EmptyStateWrapper>
      )}

      {hasError && (
        <EmptyStateWrapper>
          <Text type="headline" color="magenta2">
            Não foi possível carregar as informações detalhadas deste fundo de
            investimento.
          </Text>
          <Button
            css={`
              margin-top: 14px;
            `}
            onClick={() =>
              dispatch(GetInvestmentDetailsRequest(fundDetails.id_fundo))
            }
          >
            Tentar novamente
          </Button>
        </EmptyStateWrapper>
      )}
      {!isLoading && !hasError ? renderTabs() : null}
    </Drawer>
  )
}

Detail.propTypes = {
  isOpen: PropTypes.bool,
  isOpenForInvestments: PropTypes.bool,
  hasError: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
}

Detail.defaultProps = {
  isOpen: false,
  isOpenForInvestments: true,
  hasError: false,
}
export default Detail
