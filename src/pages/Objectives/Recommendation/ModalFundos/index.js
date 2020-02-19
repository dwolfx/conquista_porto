import React from 'react'
import PropTypes from 'prop-types'
import Text from 'components/Text'
import Archive from './Archive'
import RiskDegree from './RiskDegree'
import SubTitle from './SubTitle'
import Table from './Table'

import {
  Caption,
  Information,
  Item,
  ItemInfo,
  ListFiles,
  ListInfos,
  ListItems,
  Notification,
  Panel,
  PanelBody,
  PanelFooter,
  SingleItem,
  SubTitle5,
  WrapperContent,
} from './styles'

const ModalFundos = ({ fundDetails }) => (
  <WrapperContent>
    <Panel>
      <PanelBody>
        {fundDetails.profile && (
          <SingleItem>
            <SubTitle icon="flag" title="Perfil de risco" />
            <RiskDegree profile={fundDetails.profile} />
          </SingleItem>
        )}
        <SingleItem borderBottom>
          <SubTitle icon="money" title="Movimentações" />
          <ListItems>
            <Item>
              <SubTitle5>Aplicação</SubTitle5>
              <Text>R$ {fundDetails.min_value_to_apply}</Text>
            </Item>
            <Item>
              <SubTitle5>movimentação mín.</SubTitle5>
              <Text>R$ {fundDetails.min_movement}</Text>
            </Item>
            <Item>
              <SubTitle5>saldo mín.</SubTitle5>
              <Text>R$ {fundDetails.min_balance}</Text>
            </Item>
            <Item>
              <SubTitle5>horário limite da aplic.</SubTitle5>
              <Text>{fundDetails.time_limit}</Text>
            </Item>
            <Item>
              <SubTitle5>Aplicação (Cotização)</SubTitle5>
              <Text>{fundDetails.quotation_apply_days}</Text>
            </Item>
            <Item>
              <SubTitle5>Resgate (Cotização)</SubTitle5>
              <Text>{fundDetails.quotation_rescue_days}</Text>
            </Item>
            <Item>
              <SubTitle5>Resgate (Financeiro)</SubTitle5>
              <Text>{fundDetails.financial_rescue_days}</Text>
            </Item>
          </ListItems>
        </SingleItem>
        <SingleItem>
          <SubTitle icon="scale" title="Tributação (IR)" />
          <ListItems>
            {fundDetails.classification && (
              <Item>
                <SubTitle5>Classificação</SubTitle5>
                <Text>{fundDetails.classification}</Text>
              </Item>
            )}
            {fundDetails.tribute_ir && fundDetails.tribute_ir[180] && (
              <Item>
                <SubTitle5>até 180 dias</SubTitle5>
                <Text>{fundDetails.tribute_ir[180]}</Text>
              </Item>
            )}
            {fundDetails.tribute_ir && fundDetails.tribute_ir[360] && (
              <Item>
                <SubTitle5>de 181 a 360 dias</SubTitle5>
                <Text>{fundDetails.tribute_ir[360]}</Text>
              </Item>
            )}
            {fundDetails.tribute_ir && fundDetails.tribute_ir[720] && (
              <Item>
                <SubTitle5>de 361 a 720 dias</SubTitle5>
                <Text>{fundDetails.tribute_ir[720]}</Text>
              </Item>
            )}
            {fundDetails.tribute_ir && fundDetails.tribute_ir[721] && (
              <Item>
                <SubTitle5>acima de 720 dias</SubTitle5>
                <Text>{fundDetails.tribute_ir[721]}</Text>
              </Item>
            )}
            {fundDetails.iof && (
              <Item>
                <SubTitle5>iof</SubTitle5>
                <Text>{fundDetails.iof}</Text>
              </Item>
            )}
          </ListItems>
        </SingleItem>
      </PanelBody>
      {fundDetails.iof && (
        <PanelFooter>
          <Notification>
            <Caption type="caption" uppercase>
              Haverá incidência de IOF regressivo caso ocorram resgates antes de
              30 dias corridos da data de aplicação.
            </Caption>
          </Notification>
        </PanelFooter>
      )}
    </Panel>
    <Panel>
      <PanelBody>
        <SingleItem>
          <SubTitle icon="linechart" title="Rentabilidade Histórica" />
          {fundDetails.profitability && (
            <Table profitability={fundDetails.profitability} />
          )}
        </SingleItem>
      </PanelBody>
    </Panel>
    <Panel>
      <PanelBody>
        <SingleItem>
          <SubTitle icon="information" title="Mais informações" />
          <Information>
            Solução ideal para quem busca retornos consistentes acima do Tesouro
            Direto, sem abrir mão de segurança e liquidez.
          </Information>
          <ListInfos>
            <ItemInfo>
              O fundo busca retornos superiores ao CDI (Certificado de Depósito
              Interbancário) no longo prazo;
            </ItemInfo>
            <ItemInfo>
              Investe somente em títulos públicos emitidos pelo governo
              brasileiro;
            </ItemInfo>
            <ItemInfo>
              Conta com uma gestão profissional e altamente qualificada.
            </ItemInfo>
          </ListInfos>
        </SingleItem>
        <SingleItem borderBottom>
          <ListItems>
            {fundDetails.cnpj ? (
              <Item>
                <SubTitle5>cnpj</SubTitle5>
                <Text>{fundDetails.cnpj}</Text>
              </Item>
            ) : null }
            <Item>
              <SubTitle5>data de início</SubTitle5>
              <Text>{fundDetails.initial_date}</Text>
            </Item>
            <Item>
              <SubTitle5>gestor</SubTitle5>
              <Text>{fundDetails.manager}</Text>
            </Item>
            {fundDetails.pl ? (
              <Item>
                <SubTitle5>pl atual</SubTitle5>
                <Text>{fundDetails.pl}</Text>
              </Item>
            ) : null }
            <Item>
              <SubTitle5>taxa de administração</SubTitle5>
              <Text>{fundDetails.adm_tax}%</Text>
            </Item>
            {fundDetails.pl_last_year ? (
              <Item>
                <SubTitle5>pl médio 12m</SubTitle5>
                <Text>{fundDetails.pl_last_year}</Text>
              </Item>
            ) : null }
            <Item>
              <SubTitle5>benchmark</SubTitle5>
              <Text>{fundDetails.benchmark}</Text>
            </Item>
            <Item>
              <SubTitle5>taxa de performance</SubTitle5>
              <Text>{fundDetails.performance_rate}%</Text>
            </Item>
          </ListItems>
        </SingleItem>
        <SingleItem>
          <SubTitle icon="download" title="Arquivos" />
          <ListFiles>
            {fundDetails.url_performance_info_pdf && (
              <Archive
                title="Informativo de Desempenho"
                url={fundDetails.url_performance_info_pdf}
              />
            )}
            {fundDetails.url_fund_rules_pdf && (
              <Archive
                title="Regulamento do Fundo"
                url={fundDetails.url_fund_rules_pdf}
              />
            )}
          </ListFiles>
        </SingleItem>
      </PanelBody>
    </Panel>
  </WrapperContent>
)

ModalFundos.propTypes = {
  fundDetails: PropTypes.shape({
    profitability: PropTypes.object,
    min_value_to_apply: PropTypes.number,
    profile: PropTypes.number,
    min_movement: PropTypes.number,
    min_balance: PropTypes.number,
    time_limit: PropTypes.string,
    quotation_apply_days: PropTypes.string,
    financial_apply_days: PropTypes.string,
    quotation_rescue_days: PropTypes.string,
    financial_rescue_days: PropTypes.string,
    cnpj: PropTypes.string,
    manager: PropTypes.string,
    pl: PropTypes.number,
    pl_last_year: PropTypes.number,
    initial_date: PropTypes.string,
    benchmark: PropTypes.string,
    performance_rate: PropTypes.number,
    classification: PropTypes.string,
    tribute_ir: PropTypes.object,
    adm_tax: PropTypes.number,
    url_performance_info_pdf: PropTypes.string,
    url_fund_rules_pdf: PropTypes.string,
    iof: PropTypes.string,
  }),
}

ModalFundos.defaultProps = {
  fundDetails: {
    profitability: {},
    min_value_to_apply: 0,
    profile: 1,
    min_movement: 0,
    min_balance: 0,
    time_limit: '00:00',
    quotation_apply_days: 'D+0',
    financial_apply_days: 'D+0',
    quotation_rescue_days: 'D+20 (Corridos)',
    financial_rescue_days: 'D+1 (Úteis)',
    cnpj: '',
    manager: '',
    pl: 0,
    pl_last_year: 0,
    initial_date: '29/03/2016',
    benchmark: 'CDI',
    performance_rate: 0,
    classification: '',
    tribute_ir: {},
    adm_tax: 0,
    url_performance_info_pdf: '',
    url_fund_rules_pdf: '',
    iof: '',
  },
}

export default ModalFundos
