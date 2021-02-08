import React from 'react'
import { IBase64DecodedResponse as Base64Decode } from '../../types'
import { StepComponent as Step } from 'hooks/FluxManagement/types'
import { TSelected as Selected } from 'components/Inputs/Select/types'

export interface IUseHandleScrollReturn {
  activeMenuItem: string
  sectionOne: React.MutableRefObject<HTMLTableSectionElement | null>
  sectionTwo: React.MutableRefObject<HTMLTableSectionElement | null>
  sectionThree: React.MutableRefObject<HTMLTableSectionElement | null>
  sectionFour: React.MutableRefObject<HTMLTableSectionElement | null>
  sectionFive: React.MutableRefObject<HTMLTableSectionElement | null>
  sectionSix: React.MutableRefObject<HTMLTableSectionElement | null>
  scrollToSection: (ref: React.RefObject<HTMLElement>) => false | void
}

export interface ICompanionsData {
  name: string
  status: boolean
}

export interface IHash {
  hash: string
}

export interface IHasError {
  hasError?: boolean
}

export interface IInputState {
  value: string
  touched: boolean
}

export interface ISectionOne {
  setIsSectionValid: React.Dispatch<React.SetStateAction<boolean>>
  brazilianResidentState: [string, React.Dispatch<React.SetStateAction<string>>]
  sectionOneRef: React.MutableRefObject<HTMLTableSectionElement | null>
}

export interface ISectionTwo {
  setIsSectionValid: React.Dispatch<React.SetStateAction<boolean>>
  emailState: [IInputState, React.Dispatch<React.SetStateAction<IInputState>>]
  phoneState: [IInputState, React.Dispatch<React.SetStateAction<IInputState>>]
  selectedPhoneTypeState: [
    TSelected,
    React.Dispatch<React.SetStateAction<TSelected>>
  ]
  sectionTwoRef: React.MutableRefObject<HTMLTableSectionElement | null>
}

export interface ISectionThree {
  setIsSectionValid: React.Dispatch<React.SetStateAction<boolean>>
  sectionThreeRef: React.MutableRefObject<HTMLTableSectionElement | null>
}

export interface ISectionFour {
  setIsSectionValid: React.Dispatch<React.SetStateAction<boolean>>
  sectionFourRef: React.MutableRefObject<HTMLTableSectionElement | null>
}

export interface ISectionFive {
  setIsSectionValid: React.Dispatch<React.SetStateAction<boolean>>
  sectionFiveRef: React.MutableRefObject<HTMLTableSectionElement | null>
}

export interface ISectionSix {
  setIsSectionValid: React.Dispatch<React.SetStateAction<boolean>>
  sectionSixRef: React.MutableRefObject<HTMLTableSectionElement | null>
}

export type StepComponent = Step

export type TSelected = Selected

export type IBase64DecodedResponse = Base64Decode

// interface ICompanion {
//   companions: ICompanionsData[]
// }
