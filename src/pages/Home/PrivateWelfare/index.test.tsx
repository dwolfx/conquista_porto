import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import { storeFactory } from 'setupTests'

import privateWelfareResponse from 'mocks/privateWelfare.json'
import privateWelfateWithStatusPREResponse from 'mocks/privateWelfateWithStatusPRE.json'

import { IPrivateWelfare } from 'store/modules/PrivateWelfare/types'
import PrivateWelfareSection from '.'

// @ts-ignore
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    container.setAttribute('role', 'main')
    document.body.appendChild(container)
  }
  return container
}
// garante que o retorno será um array
const newData = [privateWelfareResponse].flatMap(item => item)

// pega todas as previdências que não possuem status 'CAN' ou 'RCH' ou 'ERR
// @ts-ignore
const filteredData: IPrivateWelfare[] = [...newData].filter(
  // @ts-ignore
  (pv: IPrivateWelfare) =>
    pv.status !== 'CAN' && pv.status !== 'RCH' && pv.status !== 'ERR'
)

// garante que o retorno do campo 'benefits' será um array
const filteredDataWithNewBenefitsArrayMock = [...filteredData].map(pv => ({
  ...pv,
  benefits: [pv.benefits].flatMap(item => item),
}))

const INITIAL_STATE = {
  data: filteredDataWithNewBenefitsArrayMock,
  hasError: false,
  isLoading: false,
  isEmpty: false,
  dataStatusPRE: privateWelfateWithStatusPREResponse,
  hasErrorStatusPRE: false,
  isLoadingStatusPRE: false,
}
describe('PrivateWelfareSection - Home', () => {
  it('component should exist', () => {
    expect(PrivateWelfareSection).toBeDefined()
  })
  it('should show PrivateWelfareLoadingState component', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
        isLoading: true,
      },
    })
    renderWithReduxAndTheme(<PrivateWelfareSection />, { store })
    expect(
      screen.getByText('Aguarde, estamos buscando suas informações...')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  // it('should show PrivateWelfareErrorState component', () => {
  //   const store = storeFactory({
  //     privateWelfare: {
  //       ...INITIAL_STATE,
  //       hasError: true,
  //     },
  //   })
  //   renderWithReduxAndTheme(<PrivateWelfareSection />, { store })

  //   expect(
  //     screen.getByText(
  //       'Desculpe, não foi possível carregar suas informações. Aguarde alguns instantes e tente novamente.'
  //     )
  //   ).toBeInTheDocument()
  //   expect(
  //     screen.getByRole('button', { name: /tentar novamente/i })
  //   ).toBeInTheDocument()
  // })
  it('should be able to render EmptyState properly', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
        data: [],
        isEmpty: true,
      },
    })
    renderWithReduxAndTheme(<PrivateWelfareSection />, { store })

    expect(screen.getByText('Viver melhor hoje e amanhã')).toBeInTheDocument()
  })
  it('should show PrivateWelfare component', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
      },
    })
    renderWithReduxAndTheme(<PrivateWelfareSection />, { store })

    expect(screen.getAllByText('Produto')).toHaveLength(3)
    expect(screen.getAllByText('Saldo bruto')).toHaveLength(3)
    expect(screen.getAllByText('Contribuição mensal')).toHaveLength(3)
    expect(screen.getAllByText('Tributação')).toHaveLength(3)
    expect(
      screen.getByRole('button', { name: /gerenciar/i })
    ).toBeInTheDocument()
  })
  it('should redirect to private welfare page', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
      },
    })
    // @ts-expect-error
    delete window.location
    window.location = {
      ...window.location,
      href: '/',
    }

    renderWithReduxAndTheme(<PrivateWelfareSection />, { store })
    fireEvent.click(screen.getByRole('button', { name: /gerenciar/i }))
    expect(window.location.href).toBe(
      'https://cliente.portoseguro.com.br/react/previdencia.html#/previdencia-privada/visualizar/980130000'
    )
  })
  it('should be able to dispatch action GetPrivateWelfareRequest on useEffect', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
        data: null,
      },
    })

    renderWithReduxAndTheme(<PrivateWelfareSection />, { store })

    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should be able to dispatch action GetPrivateWelfareWithStatusPRERequest on useEffect', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
        dataStatusPRE: null,
      },
    })

    renderWithReduxAndTheme(<PrivateWelfareSection />, { store })

    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should show Popover Ballance message', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
      },
    })
    renderWithReduxAndTheme(<PrivateWelfareSection />, {
      store,
      container: createRootContainer(),
    })
    const infoBallancePopoverElement = screen.getByRole('button', {
      name: 'info-ballance',
    })
    fireEvent.mouseOver(infoBallancePopoverElement)
    expect(
      screen.getByText(
        'Valor disponível em conta, sem desconto de taxas e impostos.'
      )
    ).toBeInTheDocument()
  })
  it('should show Popover Contibution message', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
      },
    })
    renderWithReduxAndTheme(<PrivateWelfareSection />, {
      store,
      container: createRootContainer(),
    })
    const infoContributionPopoverElement = screen.getByRole('button', {
      name: 'info-contribution',
    })
    fireEvent.mouseOver(infoContributionPopoverElement)
    expect(
      screen.getByText('Aplicação de um mesmo valor todos os meses.')
    ).toBeInTheDocument()
  })
  it('should show Popover Taxes message', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
      },
    })
    renderWithReduxAndTheme(<PrivateWelfareSection />, {
      store,
      container: createRootContainer(),
    })
    const infoTaxPopoverElement = screen.getByRole('button', {
      name: 'info-tax',
    })
    fireEvent.mouseOver(infoTaxPopoverElement)
    expect(
      screen.getByText(
        'O valor do tributo a ser cobrado aumenta de acordo com a renda.'
      )
    ).toBeInTheDocument()
  })
  it('should render mobile correctly', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
      },
    })
    window.resizeTo(400, 600)
    renderWithReduxAndTheme(<PrivateWelfareSection />, {
      store,
      container: createRootContainer(),
    })

    const infoBallancePopoverElement = screen.getByRole('button', {
      name: 'info-ballance',
    })
    const infoContributionPopoverElement = screen.getByRole('button', {
      name: 'info-contribution',
    })
    const infoTaxPopoverElement = screen.getByRole('button', {
      name: 'info-tax',
    })

    fireEvent.mouseOver(infoBallancePopoverElement)
    expect(
      screen.getByText(
        'Valor disponível em conta, sem desconto de taxas e impostos.'
      )
    ).toBeInTheDocument()

    fireEvent.mouseOver(infoContributionPopoverElement)
    expect(
      screen.getByText('Aplicação de um mesmo valor todos os meses.')
    ).toBeInTheDocument()

    fireEvent.mouseOver(infoTaxPopoverElement)
    expect(
      screen.getByText(
        'O valor do tributo a ser cobrado aumenta de acordo com a renda.'
      )
    ).toBeInTheDocument()

    expect(screen.getAllByText('Produto')).toHaveLength(3)
    expect(screen.getAllByText('Saldo bruto')).toHaveLength(3)
    expect(screen.getAllByText('Contribuição mensal')).toHaveLength(3)
    expect(screen.getAllByText('Tributação')).toHaveLength(3)
    expect(
      screen.getByRole('button', { name: /gerenciar/i })
    ).toBeInTheDocument()
  })
  it('should redirect to private welfare page on mobile', () => {
    const store = storeFactory({
      privateWelfare: {
        ...INITIAL_STATE,
      },
    })

    // @ts-expect-error
    delete window.location
    window.location = {
      ...window.location,
      href: '/',
    }

    window.resizeTo(400, 600)
    renderWithReduxAndTheme(<PrivateWelfareSection />, { store })
    fireEvent.click(screen.getByRole('button', { name: /gerenciar/i }))
    expect(window.location.href).toBe(
      'https://cliente.portoseguro.com.br/react/previdencia.html#/previdencia-privada/visualizar/980130000'
    )
  })
})
