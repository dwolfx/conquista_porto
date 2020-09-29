import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import CreditProductCard from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const values = {
  name: 'Valor a Contratar',
  value: 478688.72,
  checked: false,
}

const notAProduct = {
  name: 'Whatever',
  values,
}

const creditProductFinancing = {
  name: 'Financiamento de Veículo',
  values,
}

const creditProductVehicle = {
  name: 'Consórcio de Veículo',
  values,
}

const creditProductBuilding = {
  name: 'Consórcio de Imóvel',
  values,
}

describe("Recommendation's Credit Product Card", () => {
  it('should be null if product is not "Financiamento de Veículo" or "Consórcio de Veículo" or "Consórcio de Imóvel"', () => {
    const { container } = setup(
      <CreditProductCard creditProduct={notAProduct} />
    )

    expect(container.firstElementChild).toBeNull()
  })
  it('should display infos of credit product: financing type', () => {
    const { getByText } = setup(
      <CreditProductCard creditProduct={creditProductFinancing} />
    )

    expect(getByText('Financiamento')).toBeTruthy()
  })
  it('should display infos of credit product: vehicle consortium type', () => {
    const { getByText } = setup(
      <CreditProductCard creditProduct={creditProductVehicle} />
    )

    expect(getByText('Consórcio')).toBeTruthy()
  })
  it('should display infos of credit product: building consortium type', () => {
    const { getByText } = setup(
      <CreditProductCard creditProduct={creditProductBuilding} />
    )

    expect(getByText('Consórcio')).toBeTruthy()
  })
})
