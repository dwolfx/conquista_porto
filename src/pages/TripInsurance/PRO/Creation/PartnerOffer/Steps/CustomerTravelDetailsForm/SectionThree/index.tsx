import React from 'react'

import * as s from '../styles'
import * as t from '../types'

export const SectionThree: React.FC<t.ISectionThree> = ({
  setIsSectionValid,
  sectionThreeRef,
  ...rest
}) => (
  <section id="section-3" ref={sectionThreeRef} {...rest}>
    <s.Card>
      <s.CardTitle bold type="subheading" color="gray5">
        PESSOA POLITICAMENTE EXPOSTA (PPE)
      </s.CardTitle>
      <s.ContentWrapper>
        <s.Text bold type="headline">
          Segurado é ou possui parentesco com uma pessoa politicamente exposta?
        </s.Text>
        <s.Text bold color="gray5">
          Pessoa Exposta Politicamente é aquela que desempenha ou desempenhou
          nos últimos cinco anos, cargos, empregos ou funções públicas
          relevantes como chefes de estado e de governo, políticos, altos
          servidores dos poderes públicos, magistrados ou militares de alto
          nível, dirigentes de empresas públicas ou dirigentes de partidos
          políticos.
        </s.Text>
        <s.RadioOptionsWrapper>
          <s.Radio
            id="sim"
            name="is-ppe"
            label="Sim"
            value={1}
            checked={false}
            handleChange={() => null}
            disabled
          />
          <s.Radio
            id="nao"
            name="is-ppe"
            label="Não"
            value={0}
            checked
            handleChange={() => null}
          />
        </s.RadioOptionsWrapper>
      </s.ContentWrapper>
    </s.Card>
  </section>
)

export default SectionThree
