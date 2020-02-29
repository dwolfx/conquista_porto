import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useHistory, useParams } from 'react-router-dom'
import 'styled-components/macro'

import targetImg from 'assets/images/pages/Objectives/Manager/target.jpg'

import ButtonLink from 'components/Button/Link'
import Loading from 'components/Loading'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Modal from 'components/Modal/ModalNew'
import Button from 'components/Button'

import { formatMoney } from 'helpers'

import CardCombine from 'pages/Objectives/Manager/CardCombine'
import GoalChart from 'pages/Objectives/Manager/GoalChart'
import Wallet from 'pages/Objectives/Manager/Wallet'

import {
  GetObjectiveManagementDataRequest,
  DeleteObjectiveRequest,
} from 'store/modules/ObjectiveManagement/action'

import {
  GridContainer,
  Banner,
  ObjectiveDetails,
  ObjectiveHeader,
  ColumnWrapper,
  WalletContainer,
  CardContent,
  ButtonContainerModal,
} from './styles'

export default function Manager({ location }) {
  const { objectiveId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    data: objectiveData,
    isLoading: loadingData,
    isLoadingDelete,
  } = useSelector(state => state.objectiveManagement)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [dataExists, setDataExists] = useState(
    Boolean(objectiveData && Object.entries(objectiveData).length !== 0)
  )

  useEffect(() => {
    setIsLoading(Boolean((!objectiveData && objectiveId) || loadingData))
  }, [loadingData, objectiveData, objectiveId])

  useEffect(() => {
    setDataExists(
      Boolean(objectiveData && Object.entries(objectiveData).length !== 0)
    )
  }, [objectiveData])

  const { pageRecommendation } = location.state || false

  if (
    (!objectiveData && objectiveId) || // check if objectiveId exists and if objectiveData dont
    (objectiveData && objectiveData.id && +objectiveData.id !== +objectiveId) || // check if objectiveData exists and its id is equal to objectiveID
    !dataExists
  ) {
    if (!loadingData) {
      // if isLoading is false, then dispatch action
      setIsLoading(true)
      dispatch(GetObjectiveManagementDataRequest({ id: objectiveId, history }))
    }
  }

  if (!objectiveId) {
    // if objectiveId dont exists, redirect to "objetivos" page
    history.push('/objetivos')

    return null
  }

  function handleRedirectToProduct(product) {
    history.push(product.productPath)
  }

  function handleDeleteGoal(id) {
    function pushHistoryToHomeScreen() {
      history.push('/')
    }
    dispatch(DeleteObjectiveRequest(id, pushHistoryToHomeScreen))
  }

  const horizontalListTitle = (
    <Text type="heading3" color="gray6">
      {!isLoading ? (
        `#${dataExists ? objectiveData.nickname : ''}`
      ) : (
        <Loading />
      )}
    </Text>
  )
  const horizontalListGoalMoney = (
    <ColumnWrapper>
      <Text color="gray5">META (R$)</Text>
      <Text color="black">
        {!isLoading ? (
          formatMoney(dataExists ? objectiveData.target_value : 0)
        ) : (
          <Loading />
        )}
      </Text>
    </ColumnWrapper>
  )
  const horizontalListGoalDate = (
    <ColumnWrapper>
      <Text color="gray5">META (DATA)</Text>
      <Text color="black">
        {!isLoading ? (objectiveData || '').target_date : <Loading />}
      </Text>
    </ColumnWrapper>
  )
  const horizontalListBtnEdit = (
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
  )
  const horizontalListBtnChangeObjective = (
    <ButtonLink
      data-gtm-type="click"
      data-gtm-clicktype="link"
      data-gtm-name="outros objetivos"
      noIcon
    >
      OUTROS OBJETIVOS
    </ButtonLink>
  )

  return (
    <>
      <GridContainer>
        {pageRecommendation && (
          <Banner bgImage={targetImg} hasCloseButton size="lg">
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
            <HorizontalList
              startItems={[
                horizontalListTitle,
                horizontalListGoalMoney,
                horizontalListGoalDate,
                horizontalListBtnEdit,
              ]}
              endItems={[horizontalListBtnChangeObjective]}
              noPadding
              marginBetweenElements="28px"
            />
          </ObjectiveHeader>
          <ObjectiveDetails>
            <CardContent>
              <GoalChart
                data={dataExists ? objectiveData : {}}
                isLoading={isLoading}
              />
            </CardContent>
          </ObjectiveDetails>
        </ColumnWrapper>
        
        <WalletContainer>
          <Wallet
            idGoal={dataExists ? objectiveData.id : '0'}
            fundList={dataExists ? objectiveData.fund_list : []}
            goalName={dataExists ? objectiveData.nickname : ''}
            isLoading={isLoading}
          />
        </WalletContainer>

        <ColumnWrapper>
          {dataExists &&
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
            CONFIRMAR
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
