import React from 'react'

import * as s from '../styles'
import * as t from '../types'

export const SectionFour: React.FC<t.ISectionFour> = ({
  setIsSectionValid,
  sectionFourRef,
  ...rest
}) => (
  <section id="section-4" ref={sectionFourRef} {...rest}>
    <s.Card>
      <s.CardTitle bold type="subheading" color="gray5">
        ENDEREÇO
      </s.CardTitle>
    </s.Card>
  </section>
)

export default SectionFour
