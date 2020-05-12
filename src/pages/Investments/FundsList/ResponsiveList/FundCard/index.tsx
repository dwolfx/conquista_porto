import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from 'hooks/toast'

import { GetSuitabilityInfoRequest } from 'store/modules/SuitabilityInfo/action'

import HorizontalList from 'components/HorizontalList'
import Modal from 'components/Modal/ModalNew'
import { formatMoney, formatDotToComma, handleGiwRedirect } from 'helpers'

import {
  ArrowDown,
  ArrowUp,
  Button,
  ButtonWrapper,
  CardCol,
  CardContent,
  CardHeader,
  CardTitle,
  CategoryName,
  Circle,
  CloseButton,
  FirstDivisor,
  FundInfo,
  HeaderContent,
  InfoTitle,
  InfoValue,
  LockFundWrapper,
  LockIcon,
  ModalText,
  ModalButtonWrapper,
  ModalButton,
  RightContent,
  RiskLine,
  SecondDivisor,
  TitleWrapper,
} from './styles'

interface IHeader {
  title: string
  category: string
  isOpen: boolean
  setIsModalOpen: Function
  isModalOpen: boolean
  setIsOpen: Function
  isNotLocked: boolean
}

const Header: React.FC<IHeader> = ({
  title,
  category,
  isOpen,
  setIsModalOpen,
  isModalOpen,
  setIsOpen,
  isNotLocked,
}) => {
  return isNotLocked ? (
    <HeaderContent
      data-gtm-type="click"
      data-gtm-clicktype="accordion"
      data-gtm-name={title}
      onClick={() => {
        setIsOpen(!isOpen)
      }}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Circle>{isOpen ? <ArrowUp /> : <ArrowDown />}</Circle>
      </CardHeader>
      <CategoryName>{category}</CategoryName>
    </HeaderContent>
  ) : (
    <HeaderContent>
      <CardHeader noMargin>
        <TitleWrapper
          data-gtm-type="click"
          data-gtm-clicktype="accordion"
          data-gtm-name={title}
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <CardTitle>{title}</CardTitle>
        </TitleWrapper>
        <RightContent>
          <LockFundWrapper
            onClick={() => {
              setIsModalOpen(!isModalOpen)
            }}
          >
            <LockIcon />
          </LockFundWrapper>
          <div
            data-gtm-type="click"
            data-gtm-clicktype="accordion"
            data-gtm-name={title}
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <Circle>{isOpen ? <ArrowUp /> : <ArrowDown />}</Circle>
          </div>
        </RightContent>
      </CardHeader>
      <div
        data-gtm-type="click"
        data-gtm-clicktype="accordion"
        data-gtm-name={title}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <CategoryName>{category}</CategoryName>
      </div>
    </HeaderContent>
  )
}

export interface IFund {
  perfil_risco: 'baixo' | 'medio-baixo' | 'medio' | 'medio-alto' | 'alto'
  apelido: string
  categoria_arena: string
  minimo_inicial: number
  resgate_cotizacao: string
  rentabil_fundo_mes: number
  rentabil_fundo_12_meses: number
  rentabil_fundo_ano: number
  taxa_administracao: number
  id_fundo: number
  aplicao_liberada: boolean
}

interface IFundCard {
  fund: IFund
}
const modalSuitabilityInfoInitialState = {
  isOpen: false,
  title: '',
  description: '',
  button: {
    buttonName: '',
    dataGtmName: '',
    dataGtmType: '',
    dataGtmClicktype: '',
    handleClick: () => {},
  },
}

const FundCard: React.FC<IFundCard> = ({ fund }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState(
    modalSuitabilityInfoInitialState
  )

  const dispatch = useDispatch()
  const { addToast } = useToast()

  const suitabilityIsLoading = useSelector<any, any>(
    state => state.suitabilityInfo.isLoading
  )

  const { state: locationState } = useLocation()

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleClickInvestButton = () => {
    const onSuccess = (data: any) => {
      setModalSuitabilityInfo({ ...data })

      if (data.isValid) {
        handleGiwRedirect(
          `portaldecliente/conquista/aplicacao?idFundo=${fund.id_fundo}&r=true${
            locationState && locationState.idGoal
              ? `&idObjetivo=${locationState.idGoal}`
              : ''
          }`
        )
      }
    }

    dispatch(GetSuitabilityInfoRequest(onSuccess, 'investir', addToast))
  }

  return (
    <>
      <Modal
        modalTitle={modalSuitabilityInfo.title}
        isOpen={modalSuitabilityInfo.isOpen}
        handleClose={() =>
          setModalSuitabilityInfo({
            ...modalSuitabilityInfo,
            isOpen: false,
          })
        }
      >
        <ModalText>{modalSuitabilityInfo.description}</ModalText>
        <ModalButtonWrapper>
          {modalSuitabilityInfo.button && (
            <ModalButton
              data-gtm-name={modalSuitabilityInfo.button.dataGtmName}
              data-gtm-type={modalSuitabilityInfo.button.dataGtmType}
              data-gtm-clicktype={modalSuitabilityInfo.button.dataGtmClicktype}
              onClick={
                modalSuitabilityInfo.button.handleClick
                  ? modalSuitabilityInfo.button.handleClick
                  : () =>
                      setModalSuitabilityInfo({
                        ...modalSuitabilityInfo,
                        isOpen: false,
                      })
              }
            >
              {modalSuitabilityInfo.button.buttonName}
            </ModalButton>
          )}
        </ModalButtonWrapper>
      </Modal>
      <Modal
        modalTitle={fund.apelido}
        isOpen={isModalOpen}
        handleClose={() => handleCloseModal()}
      >
        <ModalText>Este Fundo está fechado para aplicações.</ModalText>
        <ButtonWrapper>
          <CloseButton
            onClick={() => {
              handleCloseModal()
            }}
          >
            Fechar
          </CloseButton>
        </ButtonWrapper>
      </Modal>
      <CardCol xs={12}>
        <RiskLine riskColor={fund.perfil_risco} />
        <CardContent>
          <Header
            title={fund.apelido}
            category={
              fund.categoria_arena.toLowerCase() === 'renda variável'
                ? 'Ações'
                : fund.categoria_arena
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            isNotLocked={fund.aplicao_liberada}
          />
          <FirstDivisor />
          <FundInfo>
            <HorizontalList
              size="small"
              startItems={[<InfoTitle>Aplicação mín.</InfoTitle>]}
              endItems={[
                <InfoValue>{formatMoney(fund.minimo_inicial)}</InfoValue>,
              ]}
            />
            <HorizontalList
              size="small"
              startItems={[<InfoTitle>Resgate (cotização)</InfoTitle>]}
              endItems={[<InfoValue>{fund.resgate_cotizacao}</InfoValue>]}
            />
            <HorizontalList
              size="small"
              startItems={[<InfoTitle>Rentabilidade mês</InfoTitle>]}
              endItems={[
                <InfoValue>
                  {formatDotToComma(fund.rentabil_fundo_mes)}%
                </InfoValue>,
              ]}
            />
            {isOpen && (
              <>
                <HorizontalList
                  size="small"
                  startItems={[<InfoTitle>Rentabilidade últ. 12m</InfoTitle>]}
                  endItems={[
                    <InfoValue>
                      {formatDotToComma(fund.rentabil_fundo_12_meses)}%
                    </InfoValue>,
                  ]}
                />
                <HorizontalList
                  size="small"
                  startItems={[<InfoTitle>Rentabilidade ano</InfoTitle>]}
                  endItems={[
                    <InfoValue>
                      {formatDotToComma(fund.rentabil_fundo_ano)}%
                    </InfoValue>,
                  ]}
                />
                <HorizontalList
                  size="small"
                  startItems={[<InfoTitle>Taxa adm. (a.a.)</InfoTitle>]}
                  endItems={[
                    <InfoValue>
                      {formatDotToComma(fund.taxa_administracao)}%
                    </InfoValue>,
                  ]}
                />
                <SecondDivisor />
                <Button
                  outline
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  data-gtm-subname={fund.apelido}
                  data-gtm-name="mais informacoes"
                  onClick={() => {}}
                >
                  Mais informações
                </Button>
                {fund.aplicao_liberada && (
                  <Button
                    loading={suitabilityIsLoading}
                    loadingColor="white"
                    color="secondary"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    data-gtm-subname={fund.apelido}
                    data-gtm-name="investir"
                    onClick={() => handleClickInvestButton()}
                  >
                    Investir
                  </Button>
                )}
              </>
            )}
          </FundInfo>
        </CardContent>
      </CardCol>
    </>
  )
}

export default FundCard
