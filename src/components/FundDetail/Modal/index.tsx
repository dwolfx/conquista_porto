import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loading from 'components/Loading'
import Text from 'components/Text'
import Divisor from 'components/Divisor'
import TabDetails from '../Tabs/TabDetails'
import TabMoreInfo from '../Tabs/TabMoreInfo'
import TabProfitability from '../Tabs/TabProfitability'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import {
  Accordion,
  ButtonSubmit,
  ButtonTryAgain,
  EmptyStateWrapper,
  HeaderTitle,
  LockFundWrapper,
  LockIcon,
  Modal,
  ModalBodyWrapper,
} from './styles'

interface IProps {
  isOpen: boolean
  handleLayerOpen?: (fundId: string, hasDetailsFund: boolean) => void
  isLayerOpen?: boolean
  handleClose: () => void
  title: string
  category?: string
  isOpenForInvestments?: boolean
}
const FundDetailModal = ({
  isOpen,
  handleLayerOpen = () => {},
  isLayerOpen = false,
  handleClose,
  title,
  category,
  isOpenForInvestments,
}: IProps) => {
  const dispatch = useDispatch()
  const { 
     data: fundDetails,
     isLoading,
     isError,
     suitabilityIsLoading,
     finatialApplicationIsLoading
    } = useSelector<any, any>(state => ({
      data: state.investmentDetails.data,
      isLoading: state.investmentDetails.isLoading,
      isError: state.investmentDetails.isError,
      suitabilityIsLoading: state.suitabilityInfo.isLoading,
      finatialApplicationIsLoading: state.financialApplicationGetData.isLoading,
    }))


  const ModalFooter = () =>
    isOpenForInvestments ? (
      <>
        <Divisor />
        <ButtonSubmit
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname={fundDetails.apelido}
          data-gtm-name={isLayerOpen ? 'Voltar' : 'Investir'}
          loading={suitabilityIsLoading || finatialApplicationIsLoading}
          loadingColor="white"
          color="secondary"
          onClick={() => {
            isLayerOpen
              ? handleClose()
              : handleLayerOpen(fundDetails.id_fundo, true)
          }}
        >
          {isLayerOpen ? 'Voltar' : 'Investir'}
        </ButtonSubmit>
      </>
    ) : (
      <>
        <Divisor />
        <LockFundWrapper>
          <LockIcon />
          <Text color="gray5" type="button">
            FUNDO FECHADO PARA APLICAÇÕES
          </Text>
        </LockFundWrapper>
      </>
    )

  const renderModalBody = () => (
    <>
      <ModalBodyWrapper>
        <Accordion
          bodyPadding="0px"
          titleNode={<HeaderTitle>Detalhes</HeaderTitle>}
          openByDefault
          triggerCloseOnArrow
        >
          <Divisor />
          <TabDetails fund={fundDetails} />
        </Accordion>
        <Divisor />
        <Accordion
          bodyPadding="0px"
          titleNode={<HeaderTitle>Rentabilidade</HeaderTitle>}
          openByDefault={false}
          triggerCloseOnArrow
        >
          <Divisor />
          <TabProfitability fund={fundDetails} />
        </Accordion>
        <Divisor />
        <Accordion
          bodyPadding="0px"
          titleNode={<HeaderTitle>Informações</HeaderTitle>}
          openByDefault={false}
          triggerCloseOnArrow
        >
          <Divisor />
          <TabMoreInfo fund={fundDetails} />
        </Accordion>
      </ModalBodyWrapper>
      <ModalFooter />
    </>
  )

  return (
    <Modal
      modalTitle={isLoading ? title : fundDetails.apelido}
      modalSubtitle={category || fundDetails.categoria}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {isLoading && (
        <EmptyStateWrapper>
          <Loading
            type="bar"
            legend="Buscando mais detalhes sobre este fundo..."
          />
        </EmptyStateWrapper>
      )}
      {isError && (
        <EmptyStateWrapper>
          <Text type="headline" color="magenta2">
            Não conseguimos carregar as informações deste fundo. Por favor,
            tente novamente.
          </Text>
          <ButtonTryAgain
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname={title}
            data-gtm-name="tentar novamente"
            onClick={() =>
              dispatch(GetInvestmentDetailsRequest(fundDetails.id_fundo))
            }
          >
            Tentar novamente
          </ButtonTryAgain>
        </EmptyStateWrapper>
      )}
      {fundDetails.id_fundo && !isLoading && !isError
        ? renderModalBody()
        : null}
    </Modal>
  )
}

export default FundDetailModal
