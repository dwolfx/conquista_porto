import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Container, Col } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'

import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'

import InformativeHeader from 'pages/Objectives/Manager/InformativeHeader'
import CardCombine from 'pages/Objectives/Manager/CardCombine'
import GoalChart from 'pages/Objectives/Manager/GoalChart'

import {
  GetObjectiveManagementDataRequest,
  DeleteObjectiveRequest,
  GetOtherGoalsDataRequest,
} from 'store/modules/ObjectiveManagement/action'
import * as t from './types'
import * as s from './styles'

export default function ObjectiveManager() {
  const { objectiveId, pageRecommendation } = useParams<t.ILocationParams>()
  const { addToast } = useToast()
  const dispatch = useDispatch()
  const history = useHistory()
  const isMobile = useMedia('sm')

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  const {
    data: objectiveData,
    isLoading,
    isLoadingDelete,
    otherGoalsManagement,
    isLoadingOtherGoals,
  } = useSelector((state: t.IState) => state.objectiveManagement)

  useEffect(() => {
    if (
      (!objectiveData && objectiveId) || // check if objectiveId exists and if objectiveData dont
      (objectiveData &&
        objectiveData.id &&
        objectiveId &&
        +objectiveData.id !== +objectiveId) // check if objectiveData exists and its id is equal to objectiveID
    ) {
      dispatch(
        GetObjectiveManagementDataRequest({
          id: objectiveId,
          history,
          addToast,
        })
      )

      dispatch(GetOtherGoalsDataRequest({ id: objectiveId, addToast }))
    }
  }, [dispatch, history, objectiveData, objectiveId, addToast])

  if (!objectiveId || (!isLoading && !objectiveData)) {
    // if objectiveId dont exists, redirect to "objetivos" page
    history.push('/')

    addToast({
      type: 'error',
      title: 'Algo inesperado ocorreu.',
      description:
        'Certifique-se de que o objetivo realmente existe e tente novamente.',
    })

    return null
  }

  function handleRedirectToProduct(product: any) {
    history.push({
      pathname: product.productPath,
      state: {
        idGoal: objectiveId,
      },
    })
  }

  function handleDeleteGoal(id: string) {
    dispatch(DeleteObjectiveRequest(id, () => history.push('/'), addToast))
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Container>
        <s.Row>
          <Col>
            <InformativeHeader
              objective={objectiveData}
              openEdit={() => null}
            />
          </Col>
        </s.Row>
        <s.Row>
          <Col>
            <GoalChart data={objectiveData} isLoading={isLoading} />
          </Col>
        </s.Row>
        <s.Row>
          <Col>
            {objectiveData?.additional &&
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
          </Col>
        </s.Row>
      </Container>

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
        <s.ButtonContainerModal>
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
        </s.ButtonContainerModal>
      </Modal>
    </>
  )
}
