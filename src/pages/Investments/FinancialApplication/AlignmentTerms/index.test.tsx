import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import AlignmentTerms from '.'

describe('AlignmentTerms', () => {
  it('Should render aligment term title', () => {
    const { getByText } = renderWithReduxAndTheme(
      <AlignmentTerms
        acceptAlignmentTerms={true}
        onHandleChangeacceptAlignmentTerms={() => {}}
        onHandleCloseAlignmentTerm={() => {}}
        onHandleConfirmNextStep={() => {}}
      />
    )
    expect(getByText('Termo de desenquadramento')).toBeDefined()
  })
  it('Should render aligment term item 1', () => {
    const item =
      '1. A operação que desejo realizar torna meu portfólio de investimentos inadequado ao meu perfil de risco, objetivo de investimento, conhecimento financeiro e/ou minha situação patrimonial;'
    const { getByText } = renderWithReduxAndTheme(
      <AlignmentTerms
        acceptAlignmentTerms={true}
        onHandleChangeacceptAlignmentTerms={() => {}}
        onHandleCloseAlignmentTerm={() => {}}
        onHandleConfirmNextStep={() => {}}
      />
    )
    expect(getByText(item)).toBeDefined()
  })
  it('Should render aligment term item 2', () => {
    const item =
      '2. Ao prosseguir com esta operação, assumirei riscos maiores do que aqueles previstos nos produtos adequados ao meu perfil;'
    const { getByText } = renderWithReduxAndTheme(
      <AlignmentTerms
        acceptAlignmentTerms={true}
        onHandleChangeacceptAlignmentTerms={() => {}}
        onHandleCloseAlignmentTerm={() => {}}
        onHandleConfirmNextStep={() => {}}
      />
    )
    expect(getByText(item)).toBeDefined()
  })
  it('Should render aligment term item 3', () => {
    const item =
      '3. A avaliação dos riscos inerentes à operação que desejo realizar é de minha única e exclusiva responsabilidade, estando a PORTOPAR DTVM LTDA isenta de qualquer responsabilidade em razão da minha decisão de investimento;'
    const { getByText } = renderWithReduxAndTheme(
      <AlignmentTerms
        acceptAlignmentTerms={true}
        onHandleChangeacceptAlignmentTerms={() => {}}
        onHandleCloseAlignmentTerm={() => {}}
        onHandleConfirmNextStep={() => {}}
      />
    )
    expect(getByText(item)).toBeDefined()
  })
  it('Should render aligment term item 4', () => {
    const item =
      '4. Após leitura detalhada e compreensão dos itens acima, decidi realizar a operação.'
    const { getByText } = renderWithReduxAndTheme(
      <AlignmentTerms
        acceptAlignmentTerms={true}
        onHandleChangeacceptAlignmentTerms={() => {}}
        onHandleCloseAlignmentTerm={() => {}}
        onHandleConfirmNextStep={() => {}}
      />
    )
    expect(getByText(item)).toBeDefined()
  })
  it('Should render checkbox to accept aligment term', () => {
    const { getByText } = renderWithReduxAndTheme(
      <AlignmentTerms
        acceptAlignmentTerms={true}
        onHandleChangeacceptAlignmentTerms={() => {}}
        onHandleCloseAlignmentTerm={() => {}}
        onHandleConfirmNextStep={() => {}}
      />
    )
    expect(
      getByText('Confirmo que li e concordo com todas as informações.')
    ).toBeDefined()
  })
  it('Should render aligment term buttons', () => {
    const { getByText } = renderWithReduxAndTheme(
      <AlignmentTerms
        acceptAlignmentTerms={true}
        onHandleChangeacceptAlignmentTerms={() => {}}
        onHandleCloseAlignmentTerm={() => {}}
        onHandleConfirmNextStep={() => {}}
      />
    )
    expect(getByText('voltar')).toBeDefined()
    expect(getByText('continuar')).toBeDefined()
  })
})
