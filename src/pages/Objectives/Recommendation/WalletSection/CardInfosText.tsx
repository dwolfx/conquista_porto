import React from 'react'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Text from 'components/Text'

import * as s from './styles'

interface IProps {
  isUnmetGoal?: boolean
  productName?: string
}

export default ({ isUnmetGoal = false, productName = '' }: IProps) => {
  const fundosTooltipText =
    'Fundos de investimento são grupos formados por investidores e administrados por especialistas, que buscam os rendimentos esperados.'
  const lanceTooltipText =
    'Uma forma de aumentar as chances de ser contemplado no consórcio, em que se adiciona um valor maior junto à parcela mensal.'

  const textToDisplay = {
    financiamento: (
      <s.InfoContainer>
        <Text type="headline" color="gray6">
          Os investimentos inicial e mensal serão distribuídos nestes
        </Text>
        <s.InlineContentText>
          <s.Popover content={fundosTooltipText}>
            <s.DashedText type="headline" color="gray6">
              fundos
            </s.DashedText>
          </s.Popover>
          <s.Popover
            content={fundosTooltipText}
            css={`
              margin-left: 0;
            `}
          >
            <Icon name="information" color="gray4" width={21} />
          </s.Popover>
        </s.InlineContentText>
        <Text type="headline" color="gray6">
          e poderão ser utilizados como entrada no financiamento.
        </Text>
      </s.InfoContainer>
    ),
    'consórcio de imóvel': (
      <s.InfoContainer>
        <Text type="headline" color="gray6">
          Os investimentos inicial e mensal serão distribuídos nestes
          <s.InlineContentText>
            <s.Popover content={fundosTooltipText}>
              <s.DashedText type="headline" color="gray6">
                fundos
              </s.DashedText>
            </s.Popover>
            <s.Popover
              content={fundosTooltipText}
              css={`
                margin-left: 0;
              `}
            >
              <Icon name="information" color="gray4" width={21} />
            </s.Popover>
          </s.InlineContentText>
          e poderão ser utilizados como
          <s.InlineContentText>
            <s.Popover content={lanceTooltipText}>
              <s.DashedText type="headline" color="gray6">
                lance
              </s.DashedText>
            </s.Popover>
            <s.Popover
              content={lanceTooltipText}
              css={`
                margin-left: 0;
              `}
            >
              <Icon name="information" color="gray4" width={21} />
            </s.Popover>
          </s.InlineContentText>
          no consórcio.
        </Text>
      </s.InfoContainer>
    ),
    'consórcio de veículo': (
      <s.InfoContainer>
        <Text type="headline" color="gray6">
          Os investimentos inicial e mensal serão distribuídos nestes
        </Text>
        <s.InlineContentText>
          <s.Popover content={fundosTooltipText}>
            <s.DashedText type="headline" color="gray6">
              fundos
            </s.DashedText>
          </s.Popover>
          <s.Popover
            content={fundosTooltipText}
            css={`
              margin-left: 0;
            `}
          >
            <Icon name="information" color="gray4" width={21} />
          </s.Popover>
        </s.InlineContentText>
        <Text type="headline" color="gray6">
          e poderão ser utilizados como
        </Text>
        <s.InlineContentText>
          <s.Popover content={lanceTooltipText}>
            <s.DashedText type="headline" color="gray6">
              lance
            </s.DashedText>
          </s.Popover>
          <s.Popover
            content={lanceTooltipText}
            css={`
              margin-left: 0;
            `}
          >
            <Icon name="information" color="gray4" width={21} />
          </s.Popover>
        </s.InlineContentText>
        <Text type="headline" color="gray6">
          no consórcio.
        </Text>
      </s.InfoContainer>
    ),
    isUnmet: (
      <s.InfoContainer>
        <Text type="headline" color="gray6">
          Os investimentos inicial e mensal serão distribuídos nestes
        </Text>
        <s.InlineContentText>
          <s.Popover content={fundosTooltipText}>
            <s.DashedText type="headline" color="gray6">
              fundos.
            </s.DashedText>
          </s.Popover>
          <s.Popover
            content={fundosTooltipText}
            css={`
              margin-left: 0;
            `}
          >
            <Icon name="information" color="gray4" width={21} />
          </s.Popover>
        </s.InlineContentText>
        <Text type="headline" color="gray6"></Text>
      </s.InfoContainer>
    ),
    default: (
      <s.InfoContainer>
        <Text type="headline" color="gray6">
          Os investimentos inicial e mensal serão distribuídos nestes
        </Text>
        <s.InlineContentText>
          <s.Popover content={fundosTooltipText}>
            <Text type="headline" color="gray6">
              fundos
            </Text>
          </s.Popover>
          <s.Popover
            content={fundosTooltipText}
            css={`
              margin-left: 0;
            `}
          >
            <Icon name="information" color="gray4" width={21} />
          </s.Popover>
        </s.InlineContentText>
        <Text type="headline" color="gray6">
          que, juntos, te ajudarão na conquista do seu objetivo
        </Text>
      </s.InfoContainer>
    ),
  }

  if (isUnmetGoal) {
    if (productName.toLowerCase().includes('financiamento')) {
      return textToDisplay.financiamento
    }
    if (productName.toLowerCase().includes('consórcio de imóvel')) {
      return textToDisplay['consórcio de imóvel']
    }
    if (productName.toLowerCase().includes('consórcio de veículo')) {
      return textToDisplay['consórcio de veículo']
    }

    return textToDisplay.isUnmet
  }

  return textToDisplay.default
}
