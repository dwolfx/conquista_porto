import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'
import { Tabs, TabList, Tab } from 'components/Tab/NewTab'

import { ButtonSubmit, TabPanel } from './styled'

const footerDrawer = () => <ButtonSubmit>Investir</ButtonSubmit>

const Detail = ({ title, isOpen, handleClose }) => (
  <Drawer
    drawerTitle={title}
    isOpen={isOpen}
    handleClose={handleClose}
    footer={footerDrawer()}
  >
    <Tabs
      name="tab-detalhe"
      initialValue="tab-detalhe-fundo"
      initialReset={!isOpen}
    >
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

      <TabPanel name="tab-detalhe-fundo">Detalhes</TabPanel>
      <TabPanel name="tab-rentabilidade">Rentabilidade</TabPanel>
      <TabPanel name="tab-informacoes">Informações</TabPanel>
    </Tabs>
  </Drawer>
)

Detail.defaultProps = {
  isOpen: false,
  title: 'Detalhe do Fundo',
}

Detail.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
}

export default Detail
