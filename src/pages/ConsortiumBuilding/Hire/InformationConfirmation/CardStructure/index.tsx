import React from 'react'
import { handleGiwRedirect } from 'helpers'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'
import * as s from './styles'

interface ICardStructure {
  children: React.ReactNode
  title?: string
  link?: string
}

const CardStructure: React.FC<ICardStructure> = ({
  children,
  title,
  link,
}: ICardStructure) => {
  const { reset } = useStackFluxManagement<StepComponentProps>()

  const handlerClick = () => {
    handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
    reset()
  }

  return (
    <s.Card data-testid="card-structure-id">
      {title || link ? (
        <s.CardTitleWrapper>
          {title ? (
            <s.CardTitleText
              type="subheading"
              bold
              color="gray5"
              textTransform="uppercase"
            >
              {title}
            </s.CardTitleText>
          ) : null}
          {link ? (
            <s.BtnLink onClick={handlerClick}>
              <s.TextLink
                bold
                type="button"
                color="blue4"
                textTransform="uppercase"
              >
                {link}
              </s.TextLink>
            </s.BtnLink>
          ) : null}
        </s.CardTitleWrapper>
      ) : null}
      {children}
    </s.Card>
  )
}

export default CardStructure
