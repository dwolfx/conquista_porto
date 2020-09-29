import React from 'react'
import 'styled-components/macro'

import { TabList, Tab, Tabs, TabPanel } from 'components/Tab/NewTab'
import { IFunds } from 'store/modules/Objective/types'

import TabProfitability from './TabProfitability'
import TabMoreInfo from './TabMoreInfo'
import TabDetails from './TabDetails'
import { DrawerDetail } from './styles'

interface DetailProps {
  fundDetails: IFunds
  isOpen: boolean
  handleClose(): void
}

const Detail: React.FC<DetailProps> = ({
  fundDetails,
  isOpen,
  handleClose,
}) => {
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
        <TabDetails fund={fundDetails} />
      </TabPanel>
      <TabPanel name="tab-rentabilidade">
        <TabProfitability profitability={fundDetails.profitability} />
      </TabPanel>
      <TabPanel name="tab-informacoes">
        <TabMoreInfo fund={fundDetails} />
      </TabPanel>
    </Tabs>
  )

  return (
    <DrawerDetail
      drawerTitle={fundDetails.name}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {renderTabs()}
    </DrawerDetail>
  )
}

export default Detail
