/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import { formatMoney, handleGiwRedirect } from 'helpers'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

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

export default function List({ data, idGoal }) {
  const dispatch = useDispatch()

  const [expand, setExpand] = useState({})
  const [fundDetailsLoaded, setFundDetailsLoaded] = useState({})
  const fundDetails = useSelector(state => state.investmentDetails.data)

  useEffect(() => {
    if (fundDetails.id_fundo) {
      const newData = { ...fundDetailsLoaded }
      newData[fundDetails.id_fundo] = fundDetails
      setFundDetailsLoaded(newData)
    }
  }, [fundDetails])

  const expandDetails = (index, fundId) => {
    setExpand({ ...expand, [index]: !expand[index] })
    dispatch(GetInvestmentDetailsRequest(fundId))
  }

  return (
    <>
      {data.map((obj, index) => (
        <FundBox borderRisk={obj.perfil_risco_ordem} key={`list-item-${index}`}>
          <BadgeWrapper
            data-gtm-type="click"
            data-gtm-clicktype="accordion"
            data-gtm-subname={obj.apelido}
            data-gtm-name={`badge ${obj.categoria_arena}`}
            onClick={() => expandDetails(index, obj.id_fundo)}
          >
            <Badge>{obj.categoria_arena}</Badge>
          </BadgeWrapper>
          <BoxHeader
            data-gtm-type="click"
            data-gtm-clicktype="accordion"
            data-gtm-name={obj.apelido}
            onClick={() => expandDetails(index, obj.id_fundo)}
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
              <dt>RENTABILIDADE ANO</dt>
              <dd>{obj.rentabil_fundo_ano}</dd>
            </DetailItem>
            <DetailItem>
              <dt>HORÁRIO LIMITE DA APLIC.</dt>
              <dd>{obj.hora_aplicacao}</dd>
            </DetailItem>

            {obj.id_fundo in fundDetailsLoaded &&
            Object.entries(fundDetailsLoaded[obj.id_fundo]).length > 0 ? (
              <>
                <hr />
                {/* <DetailItem>
                    <dt>CNPJ</dt>
                    <dd>{obj.cnpj}</dd>
                  </DetailItem> */}
                <DetailItem>
                  <dt>DATA DE INÍCIO</dt>
                  <dd>
                    {moment(fundDetailsLoaded[obj.id_fundo].data_inicio).format(
                      'DD/MM/YYYY'
                    )}
                  </dd>
                </DetailItem>
                <DetailItem>
                  <dt>GESTOR</dt>
                  <dd>{obj.nome_gestor}</dd>
                </DetailItem>
                <DetailItem>
                  <dt>BENCHMARK</dt>
                  <dd>{fundDetailsLoaded[obj.id_fundo].benchmark.nome}</dd>
                </DetailItem>
                <DetailItem>
                  <dt>PL ATUAL</dt>
                  <dd>{formatMoney(obj.valor_patrimonio_liq)}</dd>
                </DetailItem>
                <DetailItem>
                  <dt>TAXA DE ADMINISTRAÇÃO</dt>
                  <dd>{fundDetailsLoaded[obj.id_fundo].taxa_administracao}</dd>
                </DetailItem>
                {/* <DetailItem>
                    <dt>PL MÉDIO 12M</dt>
                    <dd>{obj.plMedio12m}</dd>
                  </DetailItem> */}
                <DetailItem>
                  <dt>TAXA DE PERFORMANCE</dt>
                  <dd>{fundDetailsLoaded[obj.id_fundo].taxa_administracao}</dd>
                </DetailItem>
              </>
            ) : null}

            <RiskDegree actives={[parseInt(obj.perfil_risco_ordem, 10)]} />
            {obj.aplicao_liberada && (
              <InvestButton
                data-gtm-type="click"
                data-gtm-clicktype="accordion"
                data-gtm-subname={obj.apelido}
                data-gtm-name="investir"
                type="button"
                color="secondary"
                onClick={() => {
                  handleGiwRedirect(
                    `portaldecliente/conquista/aplicacao?idFundo=${
                      obj.id_fundo
                    }&r=true${idGoal ? `idObjetivo=${idGoal}` : ''}`
                  )
                }}
              >
                Investir
              </InvestButton>
            )}
          </BoxBottom>
        </FundBox>
      ))}
    </>
  )
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  idGoal: PropTypes.number,
}

List.defaultProps = {
  idGoal: null,
}
