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
  let fundosTooltipText =
    'Fundos de investimento são grupos formados por investidores e administrados por especialistas, que buscam os rendimentos esperados.'

  if (isUnmetGoal) {
    if (productName.toLowerCase().includes('financiamento')) {
      fundosTooltipText =
        'Fundos de investimento são grupos formados por investidores e administrados por especialistas, que buscam os rendimentos esperados.'

      return (
        <s.InfoContainer>
          <Text type="headline" color="gray6">
            Os investimentos inicial e mensal serão distribuídos nestes
          </Text>
          <s.Popover content={fundosTooltipText}>
            <s.TextUnderlined type="headline" color="gray6">
              fundos
            </s.TextUnderlined>
          </s.Popover>
          <s.Popover
            content={fundosTooltipText}
            css={`
              margin-left: 0;
            `}
          >
            <Icon name="information" color="gray4" width={21} />
          </s.Popover>
          <Text type="headline" color="gray6">
            e poderão ser utilizados como entrada no financiamento.
          </Text>
        </s.InfoContainer>
      )
    }
    if (productName.toLowerCase().includes('consórcio de imóvel')) {
      fundosTooltipText =
        'Fundos de investimento são grupos formados por investidores e administrados por especialistas, que buscam os rendimentos esperados.'
      const lanceTooltipText =
        'Uma forma de aumentar as chances de ser contemplado no consórcio, em que se adiciona um valor maior junto à parcela mensal.'

      return (
        <s.InfoContainer>
          <Text type="headline" color="gray6">
            Os investimentos inicial e mensal serão distribuídos nestes
          </Text>
          <s.Popover content={fundosTooltipText}>
            <s.TextUnderlined type="headline" color="gray6">
              fundos
            </s.TextUnderlined>
          </s.Popover>
          <s.Popover
            content={fundosTooltipText}
            css={`
              margin-left: 0;
            `}
          >
            <Icon name="information" color="gray4" width={21} />
          </s.Popover>
          <Text type="headline" color="gray6">
            e poderão ser utilizados como
          </Text>
          <s.Popover content={lanceTooltipText}>
            <s.TextUnderlined type="headline" color="gray6">
              lance
            </s.TextUnderlined>
          </s.Popover>
          <s.Popover
            content={lanceTooltipText}
            css={`
              margin-left: 0;
            `}
          >
            <Icon name="information" color="gray4" width={21} />
          </s.Popover>
          <Text type="headline" color="gray6">
            no consórcio.
          </Text>
        </s.InfoContainer>
      )
    }
    if (productName.toLowerCase().includes('consórcio de veículo')) {
      fundosTooltipText =
        'Fundos de investimento são grupos formados por investidores e administrados por especialistas, que buscam os rendimentos esperados.'
      const lanceTooltipText =
        'Uma forma de aumentar as chances de ser contemplado no consórcio, em que se adiciona um valor maior junto à parcela mensal.'

      return (
        <s.InfoContainer>
          <Text type="headline" color="gray6">
            Os investimentos inicial e mensal serão distribuídos nestes
          </Text>
          <s.Popover content="Fundos de investimento são grupos formados por investidores e administrados por especialistas, que buscam os rendimentos esperados.">
            <s.TextUnderlined type="headline" color="gray6">
              fundos
            </s.TextUnderlined>
          </s.Popover>
          <s.Popover
            content="Fundos de investimento são grupos formados por investidores e administrados por especialistas, que buscam os rendimentos esperados."
            css={`
              margin-left: 0;
            `}
          >
            <Icon name="information" color="gray4" width={21} />
          </s.Popover>
          <Text type="headline" color="gray6">
            e poderão ser utilizados como
          </Text>
          <s.Popover content={lanceTooltipText}>
            <s.TextUnderlined type="headline" color="gray6">
              lance
            </s.TextUnderlined>
          </s.Popover>
          <s.Popover
            content={lanceTooltipText}
            css={`
              margin-left: 0;
            `}
          >
            <Icon name="information" color="gray4" width={21} />
          </s.Popover>
          <Text type="headline" color="gray6">
            no consórcio.
          </Text>
        </s.InfoContainer>
      )
    }

    fundosTooltipText =
      'Fundos de investimento são grupos formados por investidores e administrados por especialistas, que buscam os rendimentos esperados. '

    return (
      <s.InfoContainer>
        <Text type="headline" color="gray6">
          Os investimentos inicial e mensal serão distribuídos nestes
        </Text>
        <s.Popover content={fundosTooltipText}>
          <s.TextUnderlined type="headline" color="gray6">
            fundos.
          </s.TextUnderlined>
        </s.Popover>
        <s.Popover
          content={fundosTooltipText}
          css={`
            margin-left: 0;
          `}
        >
          <Icon name="information" color="gray4" width={21} />
        </s.Popover>
        <Text type="headline" color="gray6"></Text>
      </s.InfoContainer>
    )
  }

  return (
    <s.InfoContainer>
      <Text type="headline" color="gray6">
        Os investimentos inicial e mensal serão distribuídos nestes
      </Text>
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
      <Text type="headline" color="gray6">
        que, juntos, te ajudarão na conquista do seu objetivo
      </Text>
    </s.InfoContainer>
  )
}
