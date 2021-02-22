import Divisor from 'components/Divisor'
import AddressForm from 'components/Form/AddressForm'
import { TSelected } from 'components/Inputs/Select/types'
import React from 'react'
import { IAddressConsortiumBuilding } from '../types'

import * as s from './styles'

const AddressCard: React.FC<IAddressConsortiumBuilding> = ({
  texts,
  addressData: [addressData, setAddressData],
}: IAddressConsortiumBuilding) => {
  const [addressFormEdit, setAddressFormEdit] = React.useState<boolean>(false)
  const [zipCodeDataDisplay, setZipCodeDataDisplay] = React.useState<string>('')
  const [addressDataDisplay, setAddressDataDisplay] = React.useState<string>('')

  const [cep, setCep] = React.useState<string>('')
  const [streetAddress, setStreetAddress] = React.useState<string>('')
  const [number, setNumber] = React.useState<string>('')
  const [complement, setComplement] = React.useState<string>('')
  const [neighbourhood, setNeighbourhood] = React.useState<string>('')
  const [city, setCity] = React.useState<string>('')
  const [type, setType] = React.useState<string>('Rua')
  const [state, setState] = React.useState<TSelected>({
    id: 0,
    name: '',
  })

  React.useEffect(() => {
    if (
      addressData &&
      addressData.bairro &&
      addressData.cidade &&
      addressData.complementoCep &&
      addressData.logradouro &&
      addressData.numero &&
      addressData.uf &&
      addressData.numeroCep &&
      !addressFormEdit
    ) {
      const {
        bairro,
        cidade,
        logradouro,
        complementoCep,
        complemento,
        uf,
        numeroCep,
        numero,
      } = addressData

      setZipCodeDataDisplay(`${numeroCep}-${complementoCep}`)
      setAddressDataDisplay(
        `${logradouro}, ${numero} - ${complemento} - ${bairro} - ${cidade} - ${uf}`
      )
    }

    if (
      addressData &&
      !addressData.bairro &&
      !addressData.cidade &&
      !addressData.complementoCep &&
      !addressData.logradouro &&
      !addressData.numero &&
      !addressData.uf &&
      !addressData.numeroCep &&
      !addressFormEdit
    ) {
      setAddressFormEdit(true)
    }
  }, [addressData, addressFormEdit])

  React.useEffect(() => {
    if (
      cep !== undefined ||
      streetAddress !== undefined ||
      number !== undefined ||
      complement !== undefined ||
      neighbourhood !== undefined ||
      city !== undefined ||
      type !== undefined ||
      state.name !== undefined
    ) {
      setAddressData({
        complemento: complement,
        bairro: neighbourhood,
        numero: number,
        logradouro: streetAddress,
        cidade: city,
        uf: state.name,
        numeroCep: cep && cep.length === 9 ? cep.slice(0, 5) : '',
        complementoCep: cep && cep.length === 9 ? cep.slice(-3) : '',
        tipo: type,
      })
    }
  }, [
    cep,
    streetAddress,
    number,
    complement,
    neighbourhood,
    city,
    type,
    state,
    setAddressData,
  ])

  const dataDisplay = () => (
    <s.WrapperAddressCard data-testid="wrapper-address-card-id">
      <s.DataDisplay label={texts.label.zipCode} value={zipCodeDataDisplay} />
      <Divisor />
      <s.DataDisplay label={texts.label.address} value={addressDataDisplay} />
    </s.WrapperAddressCard>
  )

  return (
    <>
      {addressFormEdit ? (
        <s.WrapperAddressForm data-testid="wrapper-address-form-id">
          <s.WrapperTextsAddressForm>
            <s.TextAddressCard>{texts.form.descriptionFirst}</s.TextAddressCard>
            <s.TextAddressCard>
              {texts.form.descriptionSecond}
            </s.TextAddressCard>
          </s.WrapperTextsAddressForm>
          <AddressForm
            cep={[cep, setCep]}
            type={[type, setType]}
            streetAddress={[streetAddress, setStreetAddress]}
            number={[number, setNumber]}
            complement={[complement, setComplement]}
            neighbourhood={[neighbourhood, setNeighbourhood]}
            city={[city, setCity]}
            state={[state, setState]}
          />
        </s.WrapperAddressForm>
      ) : (
        dataDisplay()
      )}
    </>
  )
}

export default AddressCard
