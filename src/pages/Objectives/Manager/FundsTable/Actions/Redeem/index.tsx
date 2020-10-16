import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'styled-components/macro'

import Button from 'components/Button'
import Drawer from 'components/Drawer'
import Icon from 'components/IconExporter'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

import RedeemLayer from 'pages/Redeem'

import { get, post, baseURLNamespaceGoal } from 'services/api'
import {
  PutObjectiveFundsMovementRequest,
  TransferBetweenObjectivesRequest,
} from 'store/modules/ObjectiveManagement/action'

import RedeemContent from './RedeemContent'
import TransferContent from './TransferContent'
import UnlinkContent from './UnlinkContent'
import * as t from './types'
import * as s from './styles'

export default function({ isOpen, handleClose, fund }: t.IRedeem) {
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const { addToast } = useToast()

  const {
    isLoadingFundsMovement,
    isLoadingTransfer,
    data: objectiveData,
  } = useSelector((state: t.IState) => state.objectiveManagement)

  const [isDrawerOpen, setDrawerOpen] = useState(isOpen)
  const [isRedeemLayerOpen, setRedeemLayerOpen] = useState(false)
  const [redeemOptionSelected, setRedeemOptionSelected] = useState<
    t.TRedeemOptions
  >(undefined)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)
  const [unlinkValue, setUnlinkValue] = useState(0)
  const [transferValue, setTransferValue] = useState<t.TTransferObject>({})
  const [isLoadingRedeemQuestions, setIsLoadingRedeemQuestions] = useState(
    false
  )
  const [isLoadingRedeemAnswer, setIsLoadingRedeemAnswer] = useState(false)
  const [redeemQuestions, setRedeemQuestions] = useState<
    t.TRedeemContentQuestions[] | []
  >([])

  if (!fund) {
    return null
  }

  const getRedeemQuestions = useCallback(async () => {
    try {
      if (!redeemQuestions.length) {
        setIsLoadingRedeemQuestions(true)
        const { data } = await get(`${baseURLNamespaceGoal}/redeems/questions`)

        setRedeemQuestions(data)
      }
      setRedeemOptionSelected('redeem')
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Algo inesperado aconteceu',
        description: 'Aguarde alguns instantes e tente novamente.',
      })

      console.error(error)
    } finally {
      if (redeemQuestions.length) {
        const uncheckQuestions = [...redeemQuestions].map(question => ({
          ...question,
          checked: false,
        }))
        setRedeemQuestions(uncheckQuestions)
      }

      setIsLoadingRedeemQuestions(false)
    }
  }, [addToast, redeemQuestions])

  const postRedeemAnswers = useCallback(async () => {
    try {
      setIsLoadingRedeemAnswer(true)

      const selectedIds = [...redeemQuestions]
        .filter(item => item.checked)
        .map(item => item.id)

      await post(`${baseURLNamespaceGoal}/redeems/answers`, {
        goal_id: objectiveData.id,
        fund_id: fund.fund_id,
        question_ids: selectedIds,
      })

      setDrawerOpen(false)
      setRedeemLayerOpen(true)
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Algo inesperado aconteceu',
        description: 'Aguarde alguns instantes e tente novamente.',
      })

      console.error(error)
    } finally {
      setIsLoadingRedeemAnswer(false)
    }
  }, [addToast, fund, objectiveData, redeemQuestions])

  const DrawerHeader = useCallback(
    () => (
      <s.DrawerHeader>
        <s.DrawerTitle>
          <Text type="heading4" color="gray6" bold>
            {fund.nickname}
          </Text>
          <Text color="gray4" bold>
            {fund.arena_category}
          </Text>
        </s.DrawerTitle>
        {redeemOptionSelected ? (
          <Icon
            data-gtm-subname={`drawer resgatar opção ${redeemOptionSelected} - ${fund.nickname}`}
            data-gtm-name="botao voltar"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            name="arrowleft"
            height={36}
            width={36}
            onClick={() => setRedeemOptionSelected(undefined)}
          />
        ) : (
          <Icon
            data-gtm-subname={`drawer resgatar - ${fund.nickname}`}
            data-gtm-name="botao fechar"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            name="close"
            height={36}
            width={36}
            onClick={handleClose}
          />
        )}
      </s.DrawerHeader>
    ),
    [fund, redeemOptionSelected, handleClose]
  )

  const DrawerFooter = useCallback(() => {
    switch (redeemOptionSelected) {
      case 'unlink':
        return (
          <Button
            onClick={() => {
              const { fund_id, invested } = fund

              dispatch(
                PutObjectiveFundsMovementRequest({
                  data: {
                    fund_list: [{ fund_id, value: invested - unlinkValue }],
                  },
                  onSuccess: handleClose,
                  addToast,
                })
              )
            }}
            disabled={buttonIsDisabled}
            loading={isLoadingFundsMovement}
            loadingColor="white"
            css={`
              width: 100%;
            `}
          >
            Salvar alteraçãoes
          </Button>
        )
      case 'transfer':
        return (
          <Button
            onClick={() => {
              const { fund_id } = fund

              if (transferValue.id && transferValue.value) {
                dispatch(
                  TransferBetweenObjectivesRequest({
                    data: {
                      fund_id,
                      from_goal_id: objectiveData.id,
                      to_goal_id: transferValue.id,
                      value: transferValue.value,
                    },
                    onSuccess: handleClose,
                    addToast,
                  })
                )
              } else {
                addToast({
                  type: 'error',
                  title: 'Não foi possível realizar operação',
                  description:
                    'Verifique se os campos foram preenchidos corretamente e tente novamente.',
                })
              }
            }}
            disabled={buttonIsDisabled}
            loading={isLoadingTransfer}
            loadingColor="white"
            css={`
              width: 100%;
            `}
          >
            Salvar alteraçãoes
          </Button>
        )
      case 'redeem':
        return (
          <Button
            onClick={() => {
              postRedeemAnswers()
            }}
            disabled={buttonIsDisabled}
            loading={isLoadingRedeemAnswer}
            loadingColor="white"
            css={`
              width: 100%;
            `}
          >
            Avançar
          </Button>
        )
      default:
        return (
          <Button
            onClick={handleClose}
            css={`
              width: 100%;
            `}
          >
            Fechar
          </Button>
        )
    }
  }, [
    redeemOptionSelected,
    handleClose,
    unlinkValue,
    transferValue,
    objectiveData,
    addToast,
    buttonIsDisabled,
    dispatch,
    fund,
    isLoadingFundsMovement,
    isLoadingTransfer,
    isLoadingRedeemAnswer,
    postRedeemAnswers,
  ])

  const DrawerContent = useCallback(() => {
    switch (redeemOptionSelected) {
      case 'unlink':
        return (
          <UnlinkContent
            value={unlinkValue}
            setValue={setUnlinkValue}
            fundInfo={fund}
            setButtonIsDisabled={setButtonIsDisabled}
          />
        )
      case 'transfer':
        return (
          <TransferContent
            value={transferValue}
            setValue={setTransferValue}
            fundInfo={fund}
            setButtonIsDisabled={setButtonIsDisabled}
          />
        )
      case 'redeem':
        return (
          <RedeemContent
            questions={redeemQuestions}
            setQuestions={setRedeemQuestions}
            setButtonIsDisabled={setButtonIsDisabled}
          />
        )
      default: {
        setButtonIsDisabled(true)

        return (
          <>
            <s.DrawerItem>
              <Text color="gray6">
                Se você quer desvincular uma quantia do seu objetivo sem tirá-la
                do fundo, escolha esta opção.
              </Text>
              <Button outline onClick={() => setRedeemOptionSelected('unlink')}>
                Desvincular do objetivo
              </Button>
            </s.DrawerItem>

            <s.Divisor />

            <s.DrawerItem>
              <Text color="gray6">
                Se você quer transferir uma quantia deste objetivo para outro,
                escolha esta opção.
              </Text>
              <Button
                outline
                onClick={() => setRedeemOptionSelected('transfer')}
              >
                Transferir de objetivo
              </Button>
            </s.DrawerItem>

            <s.Divisor />

            <s.DrawerItem>
              <Text color="gray6">
                Se você quer resgatar uma quantia do fundo para a sua conta,
                escolha esta opção.
              </Text>
              <Button
                outline
                onClick={() => getRedeemQuestions()}
                loading={isLoadingRedeemQuestions}
              >
                Resgatar do fundo
              </Button>
            </s.DrawerItem>
          </>
        )
      }
    }
  }, [
    redeemOptionSelected,
    redeemQuestions,
    transferValue,
    unlinkValue,
    fund,
    setButtonIsDisabled,
    getRedeemQuestions,
    isLoadingRedeemQuestions,
  ])

  if (isMobile) {
    return (
      <>
        <Modal
          isOpen={isDrawerOpen}
          footer={<DrawerFooter />}
          handleClose={handleClose}
          header={<DrawerHeader />}
        >
          <DrawerContent />
        </Modal>

        <RedeemLayer
          isOpen={isRedeemLayerOpen}
          handleClose={handleClose}
          selectedFundId={fund.fund_id}
        />
      </>
    )
  }

  return (
    <>
      <Drawer
        isOpen={isDrawerOpen}
        footer={<DrawerFooter />}
        handleClose={handleClose}
        header={<DrawerHeader />}
      >
        <DrawerContent />
      </Drawer>

      <RedeemLayer
        isOpen={isRedeemLayerOpen}
        handleClose={handleClose}
        selectedFundId={fund.fund_id}
      />
    </>
  )
}
