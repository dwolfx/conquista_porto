import { TextsConsortiumBuilding } from 'pages/ConsortiumBuilding/commons/Texts'
import React, { useState } from 'react'
import CardStructure from '../../InformationConfirmation/CardStructure'
import * as s from './styles'
import Checkbox from 'components/Inputs/Checkbox'
import Text from 'components/Text'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { IFormConsortiumBuilding } from 'pages/ConsortiumBuilding/Creation/types'
import { uuid } from 'uuidv4'

//updateform
const LifeInsurance = () => {
  const { hire } = TextsConsortiumBuilding()
  const firstItems: string[] | undefined =
    hire.steps.lifeInsurance.containerFirst.content?.textFirst.text
  const secondItems: string[] | undefined =
    hire.steps.lifeInsurance.containerSecond.itens
  const thirdItems: string[] | undefined =
    hire.steps.lifeInsurance.containerThird.texts
  const [isChecked, setIsChecked] = useState(false)
  const { updateForm, form } = useFormFluxManagement<IFormConsortiumBuilding>()

  const consolidation = () => {
    const textArea = document.getElementsByTagName('textarea')[0].value
    updateForm({ ...form, preEvents: textArea })
  }

  return (
    <>
      <s.ContentContainer>
        <s.ColumnSide lg={3}>
          <s.TitleWrapper>
            <s.SideTitle type="heading4" bold>
              {hire.steps.lifeInsurance.title}
            </s.SideTitle>
            <s.Text>{hire.steps.lifeInsurance.content}</s.Text>
          </s.TitleWrapper>
        </s.ColumnSide>
        <s.Column lg={9} md={9}>
          <CardStructure title={hire.steps.lifeInsurance.title}>
            <s.Div col={false}>
              <s.Text>
                {
                  hire.steps.lifeInsurance.containerFirst.content?.textFirst
                    .item
                }
              </s.Text>
              <s.Text spacing={1}>
                {firstItems &&
                  firstItems.map((item: string, index: number) => {
                    return index === 1 || index === 5 ? (
                      <s.Link href="" key={uuid()}>
                        {item}
                      </s.Link>
                    ) : (
                      item
                    )
                  })}
              </s.Text>
            </s.Div>
            <s.Div col={false}>
              <s.Text>
                {
                  hire.steps.lifeInsurance.containerFirst.content?.textSecond
                    .item
                }
              </s.Text>
              <s.Text spacing={1}>
                {
                  hire.steps.lifeInsurance.containerFirst.content?.textSecond
                    .text
                }
              </s.Text>
            </s.Div>
            <s.DivLast col={false}>
              <s.Text>
                {
                  hire.steps.lifeInsurance.containerFirst.content?.textThird
                    .item
                }
              </s.Text>
              <s.Text spacing={1}>
                {
                  hire.steps.lifeInsurance.containerFirst.content?.textThird
                    .text
                }
              </s.Text>
            </s.DivLast>
          </CardStructure>
          <CardStructure>
            <s.TitleText type="headline" bold spacing={3}>
              {hire.steps.lifeInsurance.containerSecond?.title}
            </s.TitleText>
            <s.Div col={true}>
              <s.OrderedList>
                {secondItems &&
                  secondItems.map((item: string) => {
                    return <s.ItemsList key={uuid()}>{item}</s.ItemsList>
                  })}
              </s.OrderedList>
            </s.Div>
            <s.Divider></s.Divider>
            <s.TitleText type="headline" bold spacing={3}>
              {hire.steps.lifeInsurance.containerSecond?.titleTextArea}
            </s.TitleText>
            <s.DivTextArea col={true}>
              <s.CompTextArea
                disabled={false}
                rows={5}
                cols={3}
                placeholder="Ex:&#x0a;2. Passei por cirurgia de ortondotia de implante dentário&#x0a;..."
              ></s.CompTextArea>
            </s.DivTextArea>
          </CardStructure>
          <CardStructure>
            <s.DivLastComp col={true}>
              {thirdItems &&
                thirdItems.map((item: string) => {
                  return <s.Text key={uuid()}>{item}</s.Text>
                })}
            </s.DivLastComp>
            <s.Divider></s.Divider>
            <s.DivWithoutSpace col={false}>
              <s.CheckboxContainer>
                <Checkbox
                  label={
                    <Text type="body" color="gray5" bold>
                      Confirmo que li e concordo com todas as informações.
                    </Text>
                  }
                  onClick={() => setIsChecked(!isChecked)}
                  checked={isChecked}
                  id="checkbox-accept-alignment-term"
                />
              </s.CheckboxContainer>
            </s.DivWithoutSpace>
          </CardStructure>
        </s.Column>
      </s.ContentContainer>
      <s.FooterContainer>
        <s.ContentWrapperFooter>
          <s.NextButton
            disabled={!isChecked}
            color="secondary"
            onClick={consolidation}
          >
            continuar
          </s.NextButton>
        </s.ContentWrapperFooter>
      </s.FooterContainer>
    </>
  )
}
export default LifeInsurance
