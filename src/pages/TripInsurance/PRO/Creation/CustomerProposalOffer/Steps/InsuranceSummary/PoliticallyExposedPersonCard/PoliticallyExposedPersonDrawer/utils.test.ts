import * as u from './utils'

describe(`'PoliticallyExposedPersonDrawer' utils tests`, () => {
  describe(`test 'checkOnChangeCpfValidity' function`, () => {
    it(`should call 'setIsCPFValid' if CPF length is less than 11`, () => {
      const CPF = '0000000019'
      const setIsCPFValidMock = jest.fn()
      const selectedPoliticalyExposedKinshipValue = 1
      const customerCPF = '36275312807'

      u.checkOnChangeCpfValidity(
        CPF,
        setIsCPFValidMock,
        selectedPoliticalyExposedKinshipValue,
        customerCPF
      )

      expect(setIsCPFValidMock).toHaveBeenCalledTimes(1)
    })
    it(`should call 'setIsCPFValid' if CPF length is equal to 11`, () => {
      const CPF = '00000000191'
      const setIsCPFValidMock = jest.fn()
      const selectedPoliticalyExposedKinshipValue = 1
      const customerCPF = '36275312807'

      u.checkOnChangeCpfValidity(
        CPF,
        setIsCPFValidMock,
        selectedPoliticalyExposedKinshipValue,
        customerCPF
      )

      expect(setIsCPFValidMock).toHaveBeenCalledTimes(1)
    })
    it(`should call 'setIsCPFValid' if CPF is equal to customerCPF`, () => {
      const CPF = '36275312807'
      const setIsCPFValidMock = jest.fn()
      const selectedPoliticalyExposedKinshipValue = 2
      const customerCPF = '36275312807'

      u.checkOnChangeCpfValidity(
        CPF,
        setIsCPFValidMock,
        selectedPoliticalyExposedKinshipValue,
        customerCPF
      )

      expect(setIsCPFValidMock).toHaveBeenCalledTimes(2)
    })
  })
  describe(`test 'getPoliticalyExposedKinshipOptions' function`, () => {
    it(`should return a valid array options`, () => {
      const setSelectedPoliticalyExposedKinship = jest.fn()

      expect(
        JSON.stringify(
          u.getPoliticalyExposedKinshipOptions(
            setSelectedPoliticalyExposedKinship
          )
        )
      ).toBe(
        JSON.stringify([
          {
            id: 7,
            text: 'Eu',
            onClick: () => {},
          },
          {
            id: 1,
            text: 'Companheiro(a)',
            onClick: () => {},
          },
          {
            id: 2,
            text: 'Cônjuge',
            onClick: () => {},
          },
          {
            id: 3,
            text: 'Enteado(a)',
            onClick: () => {},
          },
          {
            id: 4,
            text: 'Filho(a)',
            onClick: () => {},
          },
          {
            id: 5,
            text: 'Pai ou mãe',
            onClick: () => {},
          },
          {
            id: 6,
            text: 'Outros',
            onClick: () => {},
          },
        ])
      )
    })
  })
})
