import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ResponsivePie } from '@nivo/pie'

import { GetBankDataRequest } from 'store/modules/BankData/action'
import { formatMoney, formatCpf } from 'helpers'
import ConquistaButton from 'components/Button'
import Accordion from 'components/Accordion'
import {
  Container,
  General,
  AccountInfo,
  Wrapper,
  Text,
  LinkButton,
  GraphHolder,
  InfoList,
  InfoItem,
  LineDivider,
} from './styles'

const generalViewData = [
  {
    id: 'fundo1',
    label: 'Porto Seguro Crédito Privado',
    value: 33,
    color: '#FA1',
  },
  {
    id: 'fundo2',
    label: 'Porto Seguro Crédito Privado',
    value: 33,
    color: '#FAA',
  },
  {
    id: 'fundo3',
    label: 'Porto Seguro Crédito Privado',
    value: 33,
    color: '#F01',
  },
]

export default function GeneralView() {
  const data = useSelector(state => state.bankData.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetBankDataRequest())
  }, [dispatch])

  return (
    <Container>
      {data.length > 0 && (
        <>
          <General>
            {console.log(data)}
            <Text fontSize={11} lineHeight={21} weight spacing={1.5}>
              VISÃO GERAL DOS INVESTIMENTOS
            </Text>
            <Text fontSize={14} lineHeight={24}>
              Total: R$ 150.000,00
            </Text>
            <GraphHolder>
              <ResponsivePie
                data={generalViewData}
                margin={{ top: 0, right: 50, bottom: 0, left: 50 }}
                innerRadius={0.45}
                padAngle={2}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableRadialLabels={false}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#000000"
                sliceLabel={e => `${e.value}%`}
                tooltipFormat={value => `${value}%`}
                animate
                motionStiffness={90}
                motionDamping={15}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'column',
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#000',
                    symbolSize: 18,
                    symbolShape: 'square',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000',
                        },
                      },
                    ],
                  },
                ]}
              />
            </GraphHolder>
            <Text fontSize={11} lineHeight={21} margin="14px 0px" weight>
              CONTA DE INVESTIMENTOS
            </Text>
            <Text fontSize={22} lineHeight={32} margin="0px 0px 14px 0px">
              Saldo Disponível
            </Text>
            <Text fontSize={18} lineHeight={28} margin="0px 0px 14px 0px">
              {formatMoney(data[0].dadosContaPortoSeguro.saldo_disponivel)}
            </Text>
            <LinkButton> ver extrato &gt; </LinkButton>
            <ConquistaButton>RETIRAR</ConquistaButton>
          </General>
          <AccountInfo>
            <LineDivider />
            <Text fontSize={22} lineHeight={32}>
              Saldo a Liquidar
            </Text>
            <Text fontSize={18} lineHeight={28}>
              {formatMoney(data[0].dadosContaPortoSeguro.saldo_liquidar)}
            </Text>
            <Accordion titleNode="Dados da conta">
              <Wrapper margin="0px 0px 10px 0px">
                <Text fontSize={10} spacing={1.5} lineHeight={22}>
                  BANCO
                </Text>
                <Text fontSize={14} lineHeight={24}>
                  {data[0].dadosContaPortoSeguro.codigo_banco}
                </Text>
              </Wrapper>
              <Wrapper margin="0px 0px 10px 0px">
                <Text fontSize={10} spacing={1.5} lineHeight={22}>
                  AGÊNCIA
                </Text>
                <Text fontSize={14} lineHeight={24}>
                  {data[0].dadosContaPortoSeguro.agencia}
                </Text>
              </Wrapper>
              <Wrapper margin="0px 0px 10px 0px">
                <Text fontSize={10} spacing={1.5} lineHeight={22}>
                  CONTA
                </Text>
                <Text fontSize={14} lineHeight={24}>
                  {`${data[0].dadosContaPortoSeguro.conta}-${data[0].dadosContaPortoSeguro.digito_conta}`}
                </Text>
              </Wrapper>
              <Wrapper margin="0px 0px 10px 0px">
                <Text fontSize={10} spacing={1.5} lineHeight={22}>
                  FAVORECIDO
                </Text>
                <Text fontSize={14} lineHeight={24}>
                  {data[0].dadosContaPortoSeguro.titular}
                </Text>
              </Wrapper>
              <Wrapper margin="0px 0px 10px 0px">
                <Text fontSize={10} spacing={1.5} lineHeight={22}>
                  CPF
                </Text>
                <Text fontSize={14} lineHeight={24}>
                  {formatCpf(data[0].dadosContaPortoSeguro.cpf)}
                </Text>
              </Wrapper>
              <LineDivider />
              <InfoList>
                <InfoItem>
                  Essa conta é para a recursos relacionados a investimentos
                  apenas
                </InfoItem>
                <InfoItem>
                  As transferências dever ser de contas de mesma titularidade do
                  favorecido
                </InfoItem>
                <InfoItem>
                  A Porto Seguro faz a identificação e direcionamento dos
                  recursos
                </InfoItem>
              </InfoList>
            </Accordion>
          </AccountInfo>
        </>
      )}
    </Container>
  )
}
