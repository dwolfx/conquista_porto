import React from 'react'
import 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'

import Loading from 'components/Loading'
import Button from 'components/Button'
import Text from 'components/Text'

import { TabList, Tab, Tabs, TabPanel } from 'components/Tab/NewTab'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import TabProfitability from './TabProfitability'
import TabMoreInfo from './TabMoreInfo'
import TabDetails from './TabDetails'

import {
  ButtonSubmit,
  EmptyStateWrapper,
  LockFundWrapper,
  LockIcon,
  DrawerDetail,
  CloseButton,
} from './styles'

interface DetailProps {
  isOpen?: boolean
  isOpenForInvestments?: boolean
  handleLayerOpen?: (fundId: string, hasDetailsFund: boolean) => void
  isLayerOpen?: boolean
  handleClose(): void
  hasError?: boolean
}

const Detail: React.FC<DetailProps> = ({
  isOpen = false,
  isOpenForInvestments = true,
  handleLayerOpen = () => {},
  isLayerOpen = false,
  handleClose,
  hasError = false,
}) => {
  const { data: fundDetails, isLoading } = useSelector<any, any>(
    state => state.investmentDetails
  )
  const suitabilityIsLoading = useSelector<any, any>(
    state => state.suitabilityInfo.isLoading
  )
  const dispatch = useDispatch()
  const footerDrawer = () =>
    isOpenForInvestments ? (
      <ButtonSubmit
        loading={suitabilityIsLoading}
        loadingColor="white"
        color="secondary"
        onClick={() => {
          handleLayerOpen(fundDetails.id_fundo, true)
        }}
      >
        {isLayerOpen ? 'Voltar' : 'Investir'}
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
      <TabList data-testid="drawer-tabs">
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
        <TabDetails fund={fundDetails} />
      </TabPanel>
      <TabPanel name="tab-rentabilidade">
        <TabProfitability fund={fundDetails} />
      </TabPanel>
      <TabPanel name="tab-informacoes">
        <TabMoreInfo fund={fundDetails} />
      </TabPanel>
    </Tabs>
  )

  const headerTitle = () => (
    <>
      <div>
        <Text type="heading4" color="gray6" bold>
          {isLoading ? '' : fundDetails.apelido}
        </Text>
        <Text type="body" color="gray4" bold>
          {fundDetails.categoria === 'Renda Variável'
            ? 'Ações'
            : fundDetails.categoria}
        </Text>
      </div>
      <CloseButton
        data-gtm-subname={`menu ${fundDetails.apelido}`}
        data-gtm-name="botao fechar"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        onClick={handleClose}
      />
    </>
  )

  return (
    <DrawerDetail
      header={headerTitle()}
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
    </DrawerDetail>
  )
}

export default Detail
