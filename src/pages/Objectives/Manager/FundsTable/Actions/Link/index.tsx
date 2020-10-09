import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Button from 'components/Button'
import Drawer from 'components/Drawer'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'
import Modal from 'components/Modal/ModalNew'
import MoneyInput from 'components/Inputs/Money'
import Text from 'components/Text'

import { BRLCurrency, Currency } from 'helpers/money'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

import { PutObjectiveFundsMovementRequest } from 'store/modules/ObjectiveManagement/action'

import { ILinkProps, TError, IState } from './types'
import * as s from './styles'

export default function({ isOpen, handleClose, fund, type }: ILinkProps) {
  const theme = useContext(ThemeContext)
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const { addToast } = useToast()

  const [valueToLink, setValueToLink] = useState(0)
  const [hasError, setError] = useState<TError>(undefined)

  const { isLoadingFundsMovement } = useSelector(
    (state: IState) => state.objectiveManagement
  )

  const RenderHeader = () => (
    <s.DrawerHeader>
      <s.DrawerTitle>
        <Text type="heading4" color="gray6" bold>
          {fund.nickname}
        </Text>
        <Text color="gray4" bold>
          {fund.arena_category}
        </Text>
      </s.DrawerTitle>

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
    </s.DrawerHeader>
  )

  const RenderFooter = () => (
    <Button
      onClick={() =>
        dispatch(
          PutObjectiveFundsMovementRequest({
            data: {
              fund_list: [
                {
                  fund_id: fund.fund_id,
                  value: fund.invested + valueToLink,
                },
              ],
            },
            onSuccess: handleClose,
            addToast,
          })
        )
      }
      disabled={valueToLink === 0 || !!hasError}
      loading={isLoadingFundsMovement}
      loadingColor="white"
      css={`
        width: 100%;
      `}
    >
      Salvar alterações
    </Button>
  )

  const renderContent = () => (
    <>
      <HorizontalList
        startItems={[
          <Text type="headline" color="gray5">
            Disponível no fundo
          </Text>,
        ]}
        endItems={[
          <Text type="headline" color="gray6" bold>
            {Currency.parse(fund.available, true)}
          </Text>,
        ]}
        noPadding
      />

      {type === 'initial' ? (
        <HorizontalList
          startItems={[
            <Text type="headline" color="gray5">
              Inv. inicial
            </Text>,
          ]}
          endItems={[
            <Text type="headline" color="gray6" bold>
              {Currency.parse(fund.initial_value, true)}
            </Text>,
          ]}
          noPadding
        />
      ) : (
        <HorizontalList
          startItems={[
            <Text type="headline" color="gray5">
              Inv. mensal
            </Text>,
          ]}
          endItems={[
            <Text type="headline" color="gray6" bold>
              {Currency.parse(fund.monthly_value, true)}
            </Text>,
          ]}
          noPadding
        />
      )}

      <s.Divisor />

      <Text
        type="headline"
        color="gray6"
        css={`
          margin-bottom: ${theme.spacing(3)}px;
        `}
      >
        Quanto você deseja vincular a este objetivo?
      </Text>

      <MoneyInput
        placeholder={Currency.parse(0)}
        value={Currency.parse(valueToLink)}
        error={hasError}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          const targetValue = new BRLCurrency(target.value).toNumber()

          if (
            targetValue <
            fund[`${type}_value` as 'initial_value' | 'monthly_value']
          ) {
            const typeTranslation = type === 'initial' ? 'inicial' : 'mensal'

            setError({
              icon: 'alertrounded',
              message: `Valor abaixo do mínimo ${typeTranslation}`,
            })
          } else if (targetValue > fund.available) {
            setError({
              icon: 'alertrounded',
              message: 'Valor acima do disponível',
            })
          } else if (!!hasError) {
            setError(undefined)
          }

          setValueToLink(targetValue)
        }}
      />
    </>
  )

  if (isMobile) {
    return (
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        header={<RenderHeader />}
        footer={<RenderFooter />}
      >
        {renderContent()}
      </Modal>
    )
  }

  return (
    <Drawer
      isOpen={isOpen}
      handleClose={handleClose}
      header={<RenderHeader />}
      footer={<RenderFooter />}
    >
      {renderContent()}
    </Drawer>
  )
}
