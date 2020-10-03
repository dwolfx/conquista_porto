import React, { useState } from 'react'
import 'styled-components/macro'

import Button from 'components/Button'
import Drawer from 'components/Drawer'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

import RedeemContent from './RedeemContent'
import TransferContent from './TransferContent'
import UnlinkContent from './UnlinkContent'
import * as t from './types'
import * as s from './styles'

export default function({
  isOpen,
  handleClose,
  fundNickname,
  fundCategory,
}: t.IRedeem) {
  const [redeemOptionSelected, setRedeemOptionSelected] = useState<
    t.TRedeemOptions
  >(undefined)
  const [unlinkValue, setUnlinkValue] = useState({
    value: 0,
  })
  const [transferValue, setTransferValue] = useState({
    value: 0,
    objectiveId: 0,
  })
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

  if (!fundNickname || !fundCategory) {
    return null
  }

  const DrawerFooter = () => {
    switch (redeemOptionSelected) {
      case 'unlink':
        return (
          <Button
            onClick={handleClose}
            disabled
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
            onClick={handleClose}
            disabled
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
            disabled
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
  }

  const DrawerContent = () => {
    switch (redeemOptionSelected) {
      case 'unlink':
        return <UnlinkContent value={unlinkValue} setValue={setUnlinkValue} />
      case 'transfer':
        return (
          <TransferContent value={transferValue} setValue={setTransferValue} />
        )
      case 'redeem':
        return (
          <RedeemContent
            options={redeemOptions}
            setOptions={setRedeemOptions}
          />
        )
      default:
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

  return (
    <Drawer
      isOpen={isOpen}
      handleClose={handleClose}
      header={
        <s.DrawerHeader>
          <s.DrawerTitle>
            <Text type="heading4" color="gray6" bold>
              {fundNickname}
            </Text>
            <Text color="gray4" bold>
              {fundCategory}
            </Text>
          </s.DrawerTitle>
          {redeemOptionSelected ? (
            <Icon
              data-gtm-subname={`drawer resgatar opção ${redeemOptionSelected} - ${fundNickname}`}
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
              data-gtm-subname={`drawer resgatar - ${fundNickname}`}
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
      }
      footer={<DrawerFooter />}
    >
      <DrawerContent />
    </Drawer>
  )
}
