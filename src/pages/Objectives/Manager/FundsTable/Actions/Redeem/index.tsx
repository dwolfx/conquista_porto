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

  const [redeemOptionSelected, setRedeemOptionSelected] = useState<
    t.TRedeemOptions
  >(undefined)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)
  const [unlinkValue, setUnlinkValue] = useState(0)
  const [transferValue, setTransferValue] = useState<t.TTransferObject>({})
  const [redeemOptions, setRedeemOptions] = useState<t.TRedeemContentOptions[]>(
    [
      {
        id: 'mudar',
        label: 'Vou mudar de fundo',
        checked: false,
      },
      {
        id: 'bill',
        label: 'Preciso pagar contas',
        checked: false,
      },
      {
        id: 'buy',
        label: 'Vou fazer uma compra',
        checked: false,
      },
      {
        id: 'performance',
        label: 'Baixa performance',
        checked: false,
      },
      {
        id: 'completed',
        label: 'Completei meu objetivo',
        checked: false,
      },
      {
        id: 'like',
        label: 'Não gostei do Conquista',
        checked: false,
      },
      {
        id: 'hide',
        label: 'Prefiro não informar',
        checked: false,
      },
    ]
  )

  if (!fund) {
    return null
  }

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
            Salvar alteração
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
            Salvar alteraçãos
          </Button>
        )
      case 'redeem':
        return (
          <Button
            onClick={handleClose}
            disabled={buttonIsDisabled}
            css={`
              width: 100%;
            `}
          >
            Salvar alteraçãoe
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
            options={redeemOptions}
            setOptions={setRedeemOptions}
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
              <Button outline onClick={() => setRedeemOptionSelected('redeem')}>
                Resgatar do fundo
              </Button>
            </s.DrawerItem>
          </>
        )
      }
    }
  }, [
    redeemOptionSelected,
    redeemOptions,
    transferValue,
    unlinkValue,
    fund,
    setButtonIsDisabled,
  ])

  if (isMobile) {
    return (
      <Modal
        isOpen={isOpen}
        footer={<DrawerFooter />}
        handleClose={handleClose}
        header={<DrawerHeader />}
      >
        <DrawerContent />
      </Modal>
    )
  }

  return (
    <Drawer
      isOpen={isOpen}
      footer={<DrawerFooter />}
      handleClose={handleClose}
      header={<DrawerHeader />}
    >
      <DrawerContent />
    </Drawer>
  )
}
