/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { formatMoney } from 'helpers'

import {
  FundBox,
  Badge,
  BadgeWrapper,
  FundName,
  DetailItem,
  ArrowUp,
  ArrowDown,
  BoxHeader,
  BoxMiddle,
  BoxBottom,
  RiskDegree,
  InvestButton,
} from './style'

export default function List({ data }) {
  const [expand, setExpand] = useState({})

  return (
    <>
      {data.map((obj, index) => (
        <FundBox borderRisk={obj.perfil_risco_ordem} key={`list-item-${index}`}>
          <BadgeWrapper
            onClick={() => setExpand({ ...expand, [index]: !expand[index] })}
          >
            <Badge>{obj.categoria_arena}</Badge>
          </BadgeWrapper>
          <BoxHeader
            onClick={() => setExpand({ ...expand, [index]: !expand[index] })}
          >
            <FundName>{obj.apelido}</FundName>
            {expand[index] ? <ArrowUp /> : <ArrowDown />}
          </BoxHeader>
          <BoxMiddle>
            <DetailItem className="small">
              <dt>ÚLT. 12M</dt>
              <dd>{obj.rentabil_fundo_12_meses}</dd>
            </DetailItem>
            <DetailItem className="small">
              <dt>RESGATE</dt>
              <dd>{obj.resgate_cotizacao}</dd>
            </DetailItem>
            <DetailItem>
              <dt>APLICAÇÃO INICIAL</dt>
              <dd>{formatMoney(obj.minimo_inicial)}</dd>
            </DetailItem>
          </BoxMiddle>
          <BoxBottom className={expand[index] ? 'show' : 'hidden'}>
            <DetailItem>
              <dt>TAXA ADM. (% A.A.)</dt>
              <dd>{obj.taxa_administracao}</dd>
            </DetailItem>
            <DetailItem>
              <dt>RENTABILIDADE MÊS</dt>
              <dd>{obj.rentabil_fundo_mes}</dd>
            </DetailItem>
            <DetailItem>
              <dt>RESGATE (COTIZAÇÃO)</dt>
              <dd>{obj.resgate_cotizacao}</dd>
            </DetailItem>
            <DetailItem>
              <dt>RENTABILIDADE ANO</dt>
              <dd>{obj.rentabil_fundo_ano}</dd>
            </DetailItem>
            <DetailItem>
              <dt>HORÁRIO LIMITE DA APLIC.</dt>
              <dd>{obj.hora_aplicacao}</dd>
            </DetailItem>
            <RiskDegree actives={[obj.perfil_risco_ordem]} />
            {obj.aplicao_liberada && (
              <InvestButton type="button" color="secondary">
                Investir
              </InvestButton>
            )}
            <hr />
            {/* <DetailItem>
                <dt>CNPJ</dt>
                <dd>{obj.cnpj}</dd>
              </DetailItem>
              <DetailItem>
                <dt>DATA DE INÍCIO</dt>
                <dd>{obj.dtInicio}</dd>
              </DetailItem>
              <DetailItem>
                <dt>GESTOR</dt>
                <dd>{obj.gestor}</dd>
              </DetailItem>
              <DetailItem>
                <dt>BENCHMARK</dt>
                <dd>{obj.benchmark}</dd>
              </DetailItem>
              <DetailItem>
                <dt>PL ATUAL</dt>
                <dd>{obj.plAtual}</dd>
              </DetailItem>
              <DetailItem>
                <dt>TAXA DE ADMINISTRAÇÃO</dt>
                <dd>{obj.taxa_administracao}</dd>
              </DetailItem>
              <DetailItem>
                <dt>PL MÉDIO 12M</dt>
                <dd>{obj.plMedio12m}</dd>
              </DetailItem>
              <DetailItem>
                <dt>TAXA DE PERFORMANCE</dt>
                <dd>{obj.taxaPerformance}</dd>
              </DetailItem> */}
          </BoxBottom>
        </FundBox>
      ))}
    </>
  )
}

List.propTypes = {
  data: PropTypes.array.isRequired,
}
