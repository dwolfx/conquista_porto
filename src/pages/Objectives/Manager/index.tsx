import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { Container, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'
import { Currency } from 'helpers/money'

import Button from 'components/Button'
import ButtonIcon from 'components/Button/Icon'
// import ButtonLink from 'components/Button/Link'
import Card from 'components/Card'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'
import InformativeHeader from 'components/Objective/InformativeHeader'
import Text from 'components/Text'
import TransactionHeader from 'components/Header/TransactionsHeader'

import { ObjectiveType } from 'helpers/objetive'
import MiniLinearProgressBar from 'components/MiniLinearProgressBar'

import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'

import CardCombine from 'pages/Objectives/Manager/CardCombine'
import GoalChart from 'pages/Objectives/Manager/GoalChart'
import FundsTable from 'pages/Objectives/Manager/FundsTable'
import ObjectiveTracking from 'pages/Objectives/Manager/ObjectiveTracking'

import {
  GetObjectiveManagementDataRequest,
  DeleteObjectiveRequest,
  GetOtherGoalsDataRequest,
} from 'store/modules/ObjectiveManagement/action'

import theme from 'styles/theme'

import * as t from './types'
import * as s from './styles'

import { ObjectiveType } from 'helpers/objetive'

export default function ObjectiveManager() {
  const { objectiveId } = useParams<t.ILocationParams>()
  const { addToast } = useToast()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const isMobile = useMedia('sm')
  const isTablet = useMedia('lg')

  const [bannerImage, setBannerImage] = useState('')
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [addFundsLayer, setAddFundsLayer] = useState(false)

  const { pageRecommendation } = location.state || { pageRecommendation: false }

  const { data: objectiveData, isLoading, isLoadingDelete } = useSelector(
    (state: t.IState) => state.objectiveManagement
  )

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

  const getObjectiveTypeImageById = useCallback(
    async (id: number) => {
      try {
        const image = await ObjectiveType.getImageById(id)
        setBannerImage(image)
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Algo inesperado ocorreu.',
          description: 'A imagem do seu objetivo não foi carregada',
        })
        console.error(error)
      }
    },
    [addToast]
  )

  useEffect(() => {
    getObjectiveTypeImageById(Number(objectiveId))
  }, [objectiveId, getObjectiveTypeImageById])

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

  function handleDeleteGoal(id: number) {
    dispatch(DeleteObjectiveRequest(id, () => history.push('/'), addToast))
  }

  if (isLoading) {
    return <Loading />
  }

  const renderObjectiveFundsTable = () =>
    !isMobile ? (
      <>
        <FundsTable
          funds={objectiveData.fund_list}
          icon="financial"
          title="Fundos com investimento inicial pendente"
          type="monthly"
          css={`
            margin-bottom: ${theme.spacing(2)}px;
          `}
        />
        <FundsTable
          funds={objectiveData.fund_list}
          icon="financial"
          title="Fundos do objetivo"
          type="monthly"
          footer={
            <s.FundsTableCardFooter align="flex-end">
              <Button
                outline
                onClick={() => setAddFundsLayer(true)}
                data-gtm-name="adicionar meus fundos"
                data-gtm-type="click"
                data-gtm-clicktype="button"
              >
                Adicionar meus fundos
              </Button>
            </s.FundsTableCardFooter>
          }
        />
      </>
    ) : (
      <Card>
        <HorizontalList
          startItems={[
            <Text type="captionUppercase" color="gray5" bold>
              Fundos com inv. inicial pendente
            </Text>,
          ]}
          endItems={[<ButtonIcon icon="arrowright" />]}
        />

        <Divisor
          css={`
            margin: ${theme.spacing(1)}px 0;
          `}
        />

        <HorizontalList
          startItems={[
            <Text type="captionUppercase" color="gray5" bold>
              Fundo do objetivo
            </Text>,
          ]}
          endItems={[<ButtonIcon icon="arrowright" />]}
        />
      </Card>
    )

  return (
    <>
      <Container>
        {bannerImage && (
          <s.Row>
            <Col>
              <s.CardBackgroundImage background={bannerImage} />
            </Col>
          </s.Row>
        )}
        <s.Row>
          <Col lg={9} md={12} sm={12}>
            <InformativeHeader
              nickname={objectiveData.nickname}
              targetDate={objectiveData.target_date}
              targetValue={objectiveData.target_value}
              initialInvestment={objectiveData.initial_value}
              monthlyInvestment={objectiveData.monthly_value}
              openEdit={() => null}
            />
          </Col>
          <s.ColProgress
            isTablet={isTablet}
            isMobile={isMobile}
            lg={3}
            md={12}
            sm={12}
          >
            <ObjectiveTracking
              targetValue={objectiveData.target_value}
              totalBalance={objectiveData.total_balance}
            />
          </s.ColProgress>
        </s.Row>

        <s.Row>
          <Col>
            {pageRecommendation ? (
              <FundsTable
                funds={objectiveData.fund_list}
                icon="money"
                title="Fundos para investimento inicial"
                textInfo={
                  <s.TextInfoContainer>
                    <Text type="headline" color="gray6">
                      Agora, você deve fazer o investimento inicial em cada um
                      dos fundos da sua carteira <Icon name="information" />.
                    </Text>
                  </s.TextInfoContainer>
                }
                type="initial"
              />
            ) : (
              renderObjectiveFundsTable()
            )}
          </Col>
        </s.Row>

        {!pageRecommendation ? (
          <s.Row>
            <Col>
              <GoalChart data={objectiveData} isLoading={isLoading} />
            </Col>
          </s.Row>
        ) : null}

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

      <s.Layer
        isOpen={addFundsLayer}
        handleClose={() => setAddFundsLayer(false)}
        headerContent={
          <TransactionHeader onClose={() => setAddFundsLayer(false)} />
        }
      >
        <Text>Add funds layer</Text>
      </s.Layer>
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
