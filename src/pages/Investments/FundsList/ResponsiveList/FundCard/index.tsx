import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import HorizontalList from 'components/HorizontalList'
import Modal from 'components/Modal/ModalNew'
import { formatMoney, formatNumber } from 'helpers'

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
  perfil_risco: number
  apelido: string
  categoria_arena: string
  minimo_inicial: number
  resgate_cotizacao: string
  rentabil_fundo_mes: string
  rentabil_fundo_12_meses: string
  rentabil_fundo_ano: string
  taxa_administracao: string
  id_carteira: number
  aplicao_liberada: boolean
}

interface IFundCard {
  fund: IFund
  onChangeIsFundDetailOpen: (prevState: Function) => void
  handleLayerOpen: (title: number) => void
  setTitle: (title: string) => void
  setCategory: (title: string) => void
  setIsOpenForInvestments: (aplicao_liberada: boolean) => void
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

const FundCard: React.FC<IFundCard> = ({
  fund,
  onChangeIsFundDetailOpen,
  handleLayerOpen,
  setTitle,
  setCategory,
  setIsOpenForInvestments,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clickedFund, setClickedFund] = useState<number | undefined>()
  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState(
    modalSuitabilityInfoInitialState
  )

  const dispatch = useDispatch()

  const { suitabilityIsLoading, financialApplicationLoading } = useSelector<
    any,
    any
  >(state => ({
    suitabilityIsLoading: state.suitabilityInfo.isLoading,
    financialApplicationLoading: state.financialApplicationGetData.isLoading,
  }))

  useEffect(() => {
    if (!suitabilityIsLoading) {
      setClickedFund(undefined)
    }
  }, [suitabilityIsLoading])

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleOpenDetail = (
    title: string,
    category: string,
    idCarteira: number
  ) => {
    dispatch(GetInvestmentDetailsRequest(idCarteira))
    setIsOpenForInvestments(fund.aplicao_liberada)
    setTitle(title)
    setCategory(handleCategory(category))
    onChangeIsFundDetailOpen((prevState: boolean) => !prevState)
  }

  const handleCategory = (category: string) => {
    const formattedSubtitle =
      category.toLowerCase() === 'renda variável' ? 'Ações' : category
    return formattedSubtitle
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
            category={handleCategory(fund.categoria_arena)}
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
                <InfoValue>{formatNumber(fund.rentabil_fundo_mes)}%</InfoValue>,
              ]}
            />
            {isOpen && (
              <>
                <HorizontalList
                  size="small"
                  startItems={[<InfoTitle>Rentabilidade últ. 12m</InfoTitle>]}
                  endItems={[
                    <InfoValue>
                      {formatNumber(fund.rentabil_fundo_12_meses)}%
                    </InfoValue>,
                  ]}
                />
                <HorizontalList
                  size="small"
                  startItems={[<InfoTitle>Rentabilidade ano</InfoTitle>]}
                  endItems={[
                    <InfoValue>
                      {formatNumber(fund.rentabil_fundo_ano)}%
                    </InfoValue>,
                  ]}
                />
                <HorizontalList
                  size="small"
                  startItems={[<InfoTitle>Taxa adm. (a.a.)</InfoTitle>]}
                  endItems={[
                    <InfoValue>
                      {formatNumber(fund.taxa_administracao)}%
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
                  onClick={() => {
                    handleOpenDetail(
                      fund.apelido,
                      fund.categoria_arena,
                      fund.id_carteira
                    )
                  }}
                >
                  Mais informações
                </Button>
                {fund.aplicao_liberada && (
                  <Button
                    loading={
                      (suitabilityIsLoading || financialApplicationLoading) &&
                      clickedFund === fund.id_carteira
                    }
                    loadingColor="white"
                    color="secondary"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    data-gtm-subname={fund.apelido}
                    data-gtm-name="investir"
                    onClick={() => {
                      handleLayerOpen(fund.id_carteira)
                      setClickedFund(fund.id_carteira)
                    }}
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
