import React from 'react'

import Button from 'components/Button'
import Icon from 'components/IconExporter'
import { handleGiwRedirect } from 'helpers'

import 'styled-components/macro'

interface IButtonInvest {
  id: number
  name: string
  is_fund_active?: boolean
}

interface IButtonProps {
  fund: IButtonInvest
  idGoal: number
}

const ButtonInvest = ({ fund, idGoal }:IButtonProps) => {
  return (
    <Button
        disabled={fund.is_fund_active}
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-subname={fund.name}
        data-gtm-name="Investir"
        css={`
          width: 100%;
        `}
        onClick={() => {
          handleGiwRedirect(
            `portaldecliente/conquista/aplicacao?idFundo=${fund.id}&idObjetivo=${idGoal}&r=true`
          )
        }}
      >
        <>
          {fund.is_fund_active && (
            <Icon
              name="lock2"
              color="white"
              width="22"
              css={`
                margin-right: 7px;
              `}
            />
          )}
          Investir
        </>
      </Button>
  )
}

export default ButtonInvest
