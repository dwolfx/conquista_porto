import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useHistory, useParams } from 'react-router-dom'
import 'styled-components/macro'

import targetImg from 'assets/images/pages/Objectives/Manager/target.png'
import targetImgMobile from 'assets/images/pages/Objectives/Manager/target-mobile.png'

import ButtonLink from 'components/Button/Link'
import Loading from 'components/Loading'
import Text from 'components/Text'
import Modal from 'components/Modal/ModalNew'
import Button from 'components/Button'

import { formatMoney } from 'helpers'

import CardCombine from 'pages/Objectives/Manager/CardCombine'
import GoalChart from 'pages/Objectives/Manager/GoalChart'
import OtherGoals from 'pages/Objectives/Manager/OtherGoals'
import Wallet from 'pages/Objectives/Manager/Wallet'

import {
  GetObjectiveManagementDataRequest,
  DeleteObjectiveRequest,
} from 'store/modules/ObjectiveManagement/action'
import { buildToast, ToastTypes } from 'store/modules/toastActions'

import useMedia from 'hooks/useMedia'
import InfoText from 'components/InfoText'
import {
  GridContainer,
  Banner,
  ObjectiveDetails,
  ObjectiveHeader,
  ColumnWrapper,
  WalletContainer,
  CardContent,
  ButtonContainerModal,
  FlexContainer,
  HorizontalLine,
} from './styles'

export default function Manager({ location }) {
  const { objectiveId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    data: objectiveData,
    isLoading,
    isLoadingDelete,
    otherGoalsManagement,
    isLoadingOtherGoals,
  } = useSelector(state => state.objectiveManagement)
  const isMobile = useMedia('sm')
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  const { pageRecommendation } = location.state || false

  useEffect(() => {
    if (
      (!objectiveData && objectiveId) || // check if objectiveId exists and if objectiveData dont
      (objectiveData && objectiveData.id && +objectiveData.id !== +objectiveId) // check if objectiveData exists and its id is equal to objectiveID
    ) {
      dispatch(GetObjectiveManagementDataRequest({ id: objectiveId, history }))
    }
  }, [dispatch, history, objectiveData, objectiveId])

  if (!objectiveId || (!isLoading && !objectiveData)) {
    // if objectiveId dont exists, redirect to "objetivos" page
    buildToast(
      'Algo inesperado ocorreu. Certifique-se de que o objetivo realmente existe e tente novamente.',
      ToastTypes.error
    )
    history.push('/')

    return null
  }

  function handleRedirectToProduct(product) {
    history.push({
      pathname: product.productPath,
      state: {
        idGoal: objectiveId,
      },
    })
  }

  function handleDeleteGoal(id) {
    function pushHistoryToHomeScreen() {
      history.push('/')
    }
    dispatch(DeleteObjectiveRequest(id, pushHistoryToHomeScreen))
  }

  return (
    <>
      <GridContainer>
        {pageRecommendation && (
          <Banner
            bgImage={isMobile ? targetImgMobile : targetImg}
            hasCloseButton
            size="lg"
          >
            <Text type="heading3" color="white">
              Objetivo criado com sucesso!
            </Text>
            <Text color="white">
              Aqui, você acompanha o progresso e contrata produtos que ajudam no
              seu objetivo.
            </Text>
          </Banner>
        )}

        <ColumnWrapper>
          <ObjectiveHeader>
            <FlexContainer
              direction={isMobile ? 'column' : 'row'}
              alignItems={isMobile ? 'start' : 'center'}
            >
              <Text type="heading3" color="gray6">
                {!isLoading ? `#${objectiveData.nickname}` : <Loading />}
              </Text>
              <FlexContainer
                direction="row"
                alignItems="center"
                css={`
                  margin-left: ${isMobile ? '0' : '56px'};
                `}
              >
                <ColumnWrapper
                  css={`
                    margin-right: 28px;
                  `}
                >
                  <InfoText
                    label="META (R$)"
                    value={
                      !isLoading ? (
                        formatMoney(objectiveData.target_value)
                      ) : (
                        <Loading />
                      )
                    }
                  />
                </ColumnWrapper>
                <ColumnWrapper
                  css={`
                    margin-right: ${isMobile ? '28px' : ''};
                  `}
                >
                  <InfoText
                    label="META (DATA)"
                    value={
                      !isLoading ? (
                        (objectiveData || '').target_date
                      ) : (
                        <Loading />
                      )
                    }
                  />
                </ColumnWrapper>
              </FlexContainer>
              <FlexContainer
                direction={isMobile ? 'column;' : 'row;'}
                margin={isMobile ? '0;' : '0 28px;'}
                alignItems={isMobile ? 'center' : 'start'}
                justifyContent={isMobile ? 'center' : 'space-between'}
                width="100%"
                css={`
                  margin-right: 0;
                `}
              >
                {isMobile ? (
                  <HorizontalLine color="gray2" margin="28px 0" />
                ) : null}
                <ButtonLink
                  data-gtm-type="click"
                  data-gtm-clicktype="link"
                  data-gtm-name="excluir objetivo"
                  onClick={() => {
                    setIsModalDeleteOpen(true)
                  }}
                  noIcon
                >
                  EXCLUIR OBJETIVO
                </ButtonLink>
                {Object.entries(otherGoalsManagement).length > 1 &&
                  !isLoadingOtherGoals && (
                  <OtherGoals otherGoals={otherGoalsManagement} />
                )}
              </FlexContainer>
            </FlexContainer>
          </ObjectiveHeader>

          <ObjectiveDetails>
            <CardContent>
              <GoalChart data={objectiveData} isLoading={isLoading} />
            </CardContent>
          </ObjectiveDetails>
        </ColumnWrapper>

        <WalletContainer>
          <Wallet
            idGoal={objectiveData ? objectiveData.id : '0'}
            fundList={objectiveData ? objectiveData.fund_list : []}
            goalName={objectiveData ? objectiveData.nickname : ''}
            isModalDeleteOpen={isModalDeleteOpen}
            isLoading={isLoading}
          />
        </WalletContainer>

        <ColumnWrapper>
          {objectiveData &&
            objectiveData.additional &&
            Object.entries(objectiveData.additional).find(
              ([, value]) => value === true
            ) && (
              <>
                <Text type="heading3" color="gray6">
                  Combine com o seu objetivo
                </Text>
                <CardCombine
                  css={`
                    padding-top: 21px;
                  `}
                  additional={objectiveData.additional}
                  onClick={handleRedirectToProduct}
                />
              </>
            )}
        </ColumnWrapper>
      </GridContainer>
      <Modal
        isOpen={isModalDeleteOpen}
        handleClose={() => {
          setIsModalDeleteOpen(false)
        }}
        modalTitle="Excluir"
      >
        <Text type="headline" color="gray6">
          Seu objetivo será excluído e os valores em fundo associados à ele irão
          para a categoria &quot;Sem objetivo&quot;. Tem certeza que deseja
          continuar?
        </Text>
        <ButtonContainerModal>
          <Button
            outline
            onClick={() => {
              setIsModalDeleteOpen(false)
            }}
          >
            CANCELAR
          </Button>
          <Button
            loading={isLoadingDelete}
            loadingColor="white"
            onClick={() => {
              handleDeleteGoal(objectiveData.id)
            }}
          >
            excluir
          </Button>
        </ButtonContainerModal>
      </Modal>
    </>
  )
}

Manager.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      pageRecommendation: PropTypes.bool,
    }),
  }).isRequired,
}
