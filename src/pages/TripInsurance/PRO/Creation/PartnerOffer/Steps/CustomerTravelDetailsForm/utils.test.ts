import * as u from './utils'

describe(`'CustomerTravelDetailsForm' utils tests`, () => {
  describe(`genderOptions function`, () => {
    it(`should return a TOption array function and trigger 'onClick' function`, () => {
      const setSelectedGenderMock = jest.fn()

      const response = u.genderOptions(setSelectedGenderMock)

      response[0].onClick && response[0].onClick()
      response[1].onClick && response[1].onClick()

      expect(setSelectedGenderMock).toHaveBeenCalledTimes(2)
    })
  })
  describe(`phoneTypeOptions function`, () => {
    it(`should return a TOption array function and trigger 'onClick' function`, () => {
      const setSelectedPhoneType = jest.fn()

      const response = u.phoneTypeOptions(setSelectedPhoneType)

      response[0].onClick && response[0].onClick()
      response[1].onClick && response[1].onClick()

      expect(setSelectedPhoneType).toHaveBeenCalledTimes(2)
    })
  })
  describe(`getPoliticalyExposedKinshipOptions function`, () => {
    it(`should return a TOption array function and trigger 'onClick' function`, () => {
      const setSelectedPoliticalyExposedKinship = jest.fn()

      const response = u.getPoliticalyExposedKinshipOptions(
        setSelectedPoliticalyExposedKinship
      )

      response[0].onClick && response[0].onClick()

      expect(setSelectedPoliticalyExposedKinship).toHaveBeenCalledTimes(1)
    })
  })
})
