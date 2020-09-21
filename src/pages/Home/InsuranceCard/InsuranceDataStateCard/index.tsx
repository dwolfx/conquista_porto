import React, { useEffect, useState, memo } from 'react'
import { useHistory } from 'react-router-dom'

import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'

import * as s from './styles'
import * as t from '../types'
import { formatMoney } from 'helpers'

const LifeInsuranceDataStateCard: React.FC<t.IInsuranceDataStateCard> = memo(
  ({ data }) => {
    const history = useHistory()


    const [basicCoverage, setBasicCoverage] = useState<t.IBasicCoverage>({
      CapitalSegurado: '-',
      Nome: '',
    })

    useEffect(() => {
      const { CoberturasBasicas } = data

      if (CoberturasBasicas) {
        const coberturas = Array.isArray(CoberturasBasicas)
          ? CoberturasBasicas
          : [CoberturasBasicas]

        const coberturaPorMorte = coberturas.find(
          (curr: any) =>
            curr.CoberturaBasica.Nome.toLowerCase() === 'morte acidental'
        )

        const newBasicCoverage: t.IBasicCoverage = {
          CapitalSegurado: formatMoney(
            coberturaPorMorte.CoberturaBasica.CapitalSegurado
          ),
          Nome: coberturaPorMorte.CoberturaBasica.Nome,
        }

        setBasicCoverage(newBasicCoverage)
      }
    }, [data])

    return (
      <s.Container>
        <HorizontalList
          startItems={[
            <Text type="headline" color="gray6">
              Seguro de Vida
            </Text>,
          ]}
        />

        <HorizontalList
          startItems={[
            <Text type="captionUppercase" color="gray5" bold>
              {basicCoverage.Nome}
            </Text>,
          ]}
          endItems={[
            <Text type="body" color="gray6" bold>
              {basicCoverage.CapitalSegurado}
            </Text>,
          ]}
        />

        <s.Button
          data-gtm-subname="card seguros de vida"
          data-gtm-name="botao gerenciar"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          color="primary"
          outline={true}
          onClick={() => history.push('/seguro-vida/visualizar')}
        >
          Gerenciar
        </s.Button>
      </s.Container>
    )
  }
)

const TripInsuranceDataStateCard: React.FC<t.IInsuranceDataStateCard> = memo(
  ({ data }) => {
    const history = useHistory()

    const [basicCoverage, setBasicCoverage] = useState<t.IBasicCoverage>({
      CapitalSegurado: '-',
      Nome: '',
    })

    useEffect(() => {
      const { CoberturasBasicas } = data

      if (CoberturasBasicas) {
        const coberturas = Array.isArray(CoberturasBasicas.CoberturaBasica)
          ? CoberturasBasicas.CoberturaBasica
          : [CoberturasBasicas.CoberturaBasica]

        const coberturaPorMorte = coberturas.find(
          (curr: any) => curr.Nome.toLowerCase() === 'morte acidental'
        )

        const newBasicCoverage: t.IBasicCoverage = {
          CapitalSegurado: formatMoney(coberturaPorMorte.CapitalSegurado),
          Nome: coberturaPorMorte.Nome,
        }

        setBasicCoverage(newBasicCoverage)
      }
    }, [data])

    return (
      <s.Container>
        <HorizontalList
          startItems={[
            <Text type="headline" color="gray6">
              Seguro Viagem
            </Text>,
          ]}
        />

        <HorizontalList
          startItems={[
            <Text type="captionUppercase" color="gray5" bold>
              {basicCoverage.Nome}
            </Text>,
          ]}
          endItems={[
            <Text type="body" color="gray6" bold>
              {basicCoverage.CapitalSegurado}
            </Text>,
          ]}
        />

        <s.Button
          data-gtm-subname="card seguros de viagem"
          data-gtm-name="botao gerenciar"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          color="primary"
          outline={true}
          onClick={() => history.push('/seguro-viagem/visualizar')}
        >
          Gerenciar
        </s.Button>
      </s.Container>
    )
  }
)

export { LifeInsuranceDataStateCard, TripInsuranceDataStateCard }
