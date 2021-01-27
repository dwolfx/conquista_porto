import Text from 'components/Text'
import React from 'react'
import 'styled-components/macro'

import { Row, Col } from 'styled-bootstrap-grid'

import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import useMedia from 'hooks/useMedia'

import { IForm } from 'pages/TripInsurance/Creation/types'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import {
  IPlan,
  ITripInsuranceQuotation,
} from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { useSelector } from 'react-redux'
import { ITripInsuranceCreditCard } from 'store/modules/TripInsurance/CreditCard/types'
import DataRow from '../../commons/DataRow'
import * as S from './styles'
import { capitalize, formatMoney } from 'helpers'
import { getFlagName } from '../PaymentStep/utils'
import DrawerChangePayment from '../DrawerChangePayment'

interface IFormPayment {
  modelCard: string
  numberCard: string
  due: string
  installment: string
}

const Sumary = () => {
  const isMobile = useMedia('xs')
  const [choosePlanSelect, setChoosePlanSelect] = React.useState<IPlan>()
  const [drawerChangePayment, setDrawerChangePayment] = React.useState<boolean>(
    false
  )
  const [formPayment, setFormPayment] = React.useState<IFormPayment>({
    modelCard: '',
    numberCard: '',
    due: '',
    installment: '',
  })
  const { form } = useFormFluxManagement<IForm>()

  const { tripInsuranceQuotations } = useSelector(
    (state: { tripInsuranceQuotation: ITripInsuranceQuotation }) => ({
      tripInsuranceQuotations:
        state.tripInsuranceQuotation.data?.ViagemPacote.pacotes,
      isLoading: state.tripInsuranceQuotation.isLoading,
      hasError: state.tripInsuranceQuotation.hasError,
      idSimulation: state.tripInsuranceQuotation.data?.idSimulacao,
    })
  )

  const { creditCardData } = useSelector(
    (state: { tripInsuranceCreditCard: ITripInsuranceCreditCard }) => ({
      creditCardData: state.tripInsuranceCreditCard.data,
    })
  )

  React.useEffect(() => {
    if (tripInsuranceQuotations && tripInsuranceQuotations.length) {
      setChoosePlanSelect(
        tripInsuranceQuotations?.find(
          value => value.codigoPlano === form.pacoteEscolhido
        )
      )
    }
  }, [tripInsuranceQuotations, form.pacoteEscolhido])

  React.useEffect(() => {
    if (
      creditCardData &&
      creditCardData.creditCards &&
      choosePlanSelect &&
      form &&
      form.pagamento &&
      form.pagamento.quartoNumero
    ) {
      const arrayInstallments = form.pagamento.isCartaoPorto
        ? choosePlanSelect?.formasPagamento.listaParcelamentoCartaoPorto
        : choosePlanSelect?.formasPagamento.listaParcelamentoCartao

      const installment = arrayInstallments.find(
        value => Number(value.id) === form.pagamento?.quantidadeParcelas
      )

      const dataCard = creditCardData.creditCards.find(
        value => value.UltimosDigitos === form.pagamento?.quartoNumero
      )

      if (installment?.descricao && installment?.valor) {
        const cardInfo = {
          due: `${form.pagamento.mesValidade}/${form.pagamento.anoValidade}`,
          numberCard: `**** **** **** ${form.pagamento.quartoNumero}`,
          installment: `${installment?.descricao} de ${formatMoney(
            installment?.valor
          )}`,
        }

        if (dataCard) {
          setFormPayment({
            ...cardInfo,
            modelCard: `Cartão Porto Seguro ${capitalize(dataCard.Tipo)}`,
          })
        } else {
          setFormPayment({
            ...cardInfo,
            modelCard: `Cartão ${capitalize(
              getFlagName(false, form.pagamento.codigoBandeira)
            )}`,
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creditCardData, choosePlanSelect, form.pagamento])

  return (
    <>
      <DrawerChangePayment
        isOpen={drawerChangePayment}
        handleClose={() => setDrawerChangePayment(false)}
      />
      <S.Container>
        <Row>
          <S.HeaderCol lg={3} md={12}>
            <S.HeaderWrapper>
              <S.HeaderTitleWrapper>
                <Text type="heading4" bold color="gray6">
                  Resumo do contrato
                </Text>
              </S.HeaderTitleWrapper>
              <S.HeaderTitleWrapper>
                <Text type={isMobile ? 'body' : 'headline'} color="gray6">
                  Revise as informações e os termos do seu contrato.
                </Text>
              </S.HeaderTitleWrapper>
            </S.HeaderWrapper>
          </S.HeaderCol>
          <Col lg={8} lgOffset={0} md={10} mdOffset={1}>
            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    RESUMO
                  </Text>
                </S.CardTitleWrapper>
                <DataRow
                  label="Tipo de Seguro"
                  value={
                    form.nationalDestination ? 'Nacional' : 'Internacional'
                  }
                />
              </S.CardContentWrapper>
            </S.Card>
            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    COBERTURA
                  </Text>
                </S.CardTitleWrapper>
                {choosePlanSelect?.ViagemCobertura?.coberturas &&
                  choosePlanSelect.ViagemCobertura.coberturas.length &&
                  choosePlanSelect.ViagemCobertura.coberturas.map(
                    (value, index) => (
                      <div key={index.toString()}>
                        <DataRow label={value.descricao} value={value.valor} />
                        {index !==
                          choosePlanSelect.ViagemCobertura.coberturas.length -
                            1 && <Divisor />}
                      </div>
                    )
                  )}
              </S.CardContentWrapper>
            </S.Card>
            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    FORMA DE PAGAMENTO
                  </Text>
                  <ButtonLink onClick={() => setDrawerChangePayment(true)}>
                    ALTERAR
                  </ButtonLink>
                </S.CardTitleWrapper>
                <DataRow label="Modelo" value={formPayment.modelCard} />
                <Divisor />
                <DataRow label="Número" value={formPayment.numberCard} />
                <Divisor />
                <DataRow label="Vencimento" value={formPayment.due} />
                <Divisor />
                <DataRow
                  label="Número de Parcelas"
                  value={formPayment.installment}
                />
              </S.CardContentWrapper>
            </S.Card>
          </Col>
        </Row>
      </S.Container>
      <S.FixedFooter>
        <S.Button color="secondary">continuar</S.Button>
      </S.FixedFooter>
    </>
  )
}

export default Sumary
