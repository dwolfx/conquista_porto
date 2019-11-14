import React from 'react'
import Button from '../../../../components/Button'
import SelectInput from '../../../../components/Inputs/Select'
import { Row, LabelText } from '../../styles'

export default () => (
  <>
    <Row width={40} marginLeft="auto" marginRight="auto">
      <LabelText>Selecione o ano desejado e baixe o arquivo:</LabelText>
    </Row>
    <Row width={40} marginLeft="auto" marginRight="auto">
      <SelectInput
        label="Ano"
        name="ano"
        options={[{ name: '2018' }, { name: '2017' }, { name: '2016' }]}
      />
    </Row>
    <Row width={40} marginLeft="auto" marginRight="auto" justify="center">
      <Button>Buscar</Button>
    </Row>
  </>
)
