import React from 'react'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import Button from 'components/Button'
import MiniLinearProgressBar from 'components/MiniLinearProgressBar'
import Text from 'components/Text'
import { LinearProgressBarContent } from 'pages/Home/ObjectivesList/Objective/styles'

import { HorizontalListStyled } from './styles'
import { FinanceableInfo } from '../types'
import { CardInfo, Title } from '../styles'

const FinantialProgressContent = ({
  title,
  path,
  paidInstallments,
  totalInstallments,
}: Pick<
  FinanceableInfo,
  'title' | 'paidInstallments' | 'totalInstallments' | 'path'
>) => {
  const history = useHistory()
  return (
    <CardInfo>
      <Title>
        <Text type="headline">{title}</Text>
      </Title>
      <HorizontalListStyled
        noPadding
        size="medium"
        startItems={[
          <Text type="captionUppercase" bold color="gray5">
            parcelas pagas
          </Text>,
        ]}
        endItems={[
          <LinearProgressBarContent>
            <MiniLinearProgressBar
              current={+(paidInstallments || 0)}
              max={+(totalInstallments || 0)}
            />
          </LinearProgressBarContent>,
          <Text type="captionUppercase" color="gray5" textAlign="left" bold>
            {`${paidInstallments}/${totalInstallments}`}
          </Text>,
        ]}
      />
      <Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-subname="Cartao de credito"
        data-gtm-name="botao cartao de credito"
        color="primary"
        outline
        onClick={() => history.push(path)}
      >
        gerenciar
      </Button>
    </CardInfo>
  )
}

export default FinantialProgressContent
