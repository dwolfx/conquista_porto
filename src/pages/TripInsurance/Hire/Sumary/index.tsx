import Text from 'components/Text'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { capitalize, formatMoney } from 'helpers'
import StepBar from 'pages/TripInsurance/commons/StepBar'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'
import { PostTripInsuranceProposalRequest } from 'store/modules/TripInsurance/Proposal/action'
import { ITripInsuranceCreditCard } from 'store/modules/TripInsurance/CreditCard/types'
import {
  IPlan,
  ITripInsuranceQuotation,
} from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { ITripInsuranceProposal } from 'store/modules/TripInsurance/Proposal/types'
import { IForm, Steps } from 'pages/TripInsurance/Creation/types'

import DrawerChangePayment from '../DrawerChangePayment'
import DataRow from '../../commons/DataRow'
import { getFlagName } from '../PaymentStep/utils'

import * as S from './styles'

interface IFormPayment {
  modelCard: string
  numberCard: string
  due: string
  installment: string
}

const Sumary = () => {
  const isMobile = useMedia('xs')
  const dispatch = useDispatch()
  const { addToast } = useToast()
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
  const [retries, setRetries] = React.useState<number>(3)
  const { form } = useFormFluxManagement<IForm>()
  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const { tripInsuranceQuotations } = useSelector(
    (state: { tripInsuranceQuotation: ITripInsuranceQuotation }) => ({
      tripInsuranceQuotations:
        state.tripInsuranceQuotation.data?.ViagemPacote.pacotes,
    })
  )

  const { proposalIsLoading, proposalHasError } = useSelector(
    (state: { tripInsuranceProposal: ITripInsuranceProposal }) => ({
      proposalIsLoading: state.tripInsuranceProposal.isLoading,
      proposalHasError: state.tripInsuranceProposal.hasError,
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

  // Error step
  React.useEffect(() => {
    if (proposalHasError && retries === 0) {
      instantiate(Steps.errorStep)
    }
  }, [proposalHasError, retries, instantiate])

  const handleClick = () => {
    dispatch(
      PostTripInsuranceProposalRequest({
        payload: {
          dataIda: form.dataIda,
          dataVolta: form.dataVolta,
          motivoViagem: form.motivoViagem,
          isPraticaAventura: form.isPraticaAventura,
          isMotocicleta: form.isMotocicleta,
          qtdPassagMenorSetentaAnos: form.qtdPassagMenorSetentaAnos,
          qtdPassagMaiorSetentaAnos: form.qtdPassagMaiorSetentaAnos,
          codigoUfOrigem: form.codigoUfOrigem,
          codigoPaisDestino: form.codigoPaisDestino,
          pacoteEscolhido: form.pacoteEscolhido,
          valorSeguro: Number(form.valorSeguro),
          passageiroPrincipal: form.passageiroPrincipal,
          acompanhantes: form.acompanhantes,
          pagamento: form.pagamento,
          isAceiteTermos: form.isAceiteTermos,
          isCienteMoto: form.isCienteMoto,
          idSimulacao: form.idSimulacao,
        },
        onErrorToast: addToast,
        onSuccess: instantiate,
        Step: Steps.successStep,
        setRetries: () => setRetries(retries - 1),
      })
    )
  }

  return (
    <>
      <StepBar
        title="Contratação"
        actualStep={(form.acompanhantes || []).length > 0 ? 4 : 3}
        totalNumberOfSteps={(form.acompanhantes || []).length > 0 ? 4 : 3}
      />
      <S.Container>
        <DrawerChangePayment
          isOpen={drawerChangePayment}
          handleClose={() => setDrawerChangePayment(false)}
        />
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
        <Container>
          <Row>
            <Col lg={3} md={12} />
            <S.ButtonCol lg={8} lgOffset={0} md={10} mdOffset={1}>
              <S.Button
                color="secondary"
                tryAgain={retries < 3}
                loading={proposalIsLoading}
                onClick={() => handleClick()}
              >
                {retries < 3 ? `TENTAR NOVAMENTE` : `CONTRATAR`}
              </S.Button>
            </S.ButtonCol>
          </Row>
        </Container>
      </S.FixedFooter>
    </>
  )
}

export default Sumary
