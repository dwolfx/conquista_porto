import React from 'react'

import * as s from '../styles'
import * as t from '../types'

export const SectionFive: React.FC<t.ISectionFive> = ({
  setIsSectionValid,
  sectionFiveRef,
  ...rest
}) => (
  <section id="section-5" ref={sectionFiveRef} {...rest}>
    <s.Card>
      <s.CardTitle bold type="subheading" color="gray5">
        CONTATO EM CASO DE ACIDENTES
      </s.CardTitle>
      <s.ContentWrapper>
        <s.InputsWrapper>
          <s.TextInputMedium
            label="NOME"
            value=""
            placeholder="Digite aqui... "
          />
          <s.TextInput
            label="TELEFONE"
            value=""
            placeholder="Ex: (12) 34567890"
          />
        </s.InputsWrapper>
      </s.ContentWrapper>
    </s.Card>
  </section>
)

export default SectionFive
