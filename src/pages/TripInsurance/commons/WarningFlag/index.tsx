import React from 'react'
import * as s from './styles'

interface IWarningFlag {
  title: string
}

const WarningFlag: React.FC<IWarningFlag> = ({ title, ...rest }) => (
  <s.WarningWrapper {...rest}>
    <s.Icon name="alertrounded" color="magenta2" />
    <s.WarningText type="title" bold {...rest}>
      {title}
    </s.WarningText>
  </s.WarningWrapper>
)

export default WarningFlag
