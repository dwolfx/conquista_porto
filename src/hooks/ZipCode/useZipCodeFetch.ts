import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  GetZipCodeeDataClean,
  GetZipCodeeDataRequest,
} from 'store/modules/ZipCode/action'
import { ZipCodeState } from 'store/modules/ZipCode/types'

interface IUseZipCodeFetch {
  data: ZipCodeState
  isLoading: boolean
  hasError: boolean
  searchZipCode: (zipcode: string) => void
}

export default function useZipCodeFetch(): IUseZipCodeFetch {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [data, setData] = useState<ZipCodeState>({
    data: null,
    isLoading: false,
    hasError: false,
  })

  const zipcodeData = useSelector((state: any) => state.zipCode)

  const dispatch = useDispatch()

  const searchZipCode = useCallback(
    (zipcode: string) => {
      if (zipcode && zipcode.length === 9) {
        setIsLoading(true)
        dispatch(GetZipCodeeDataRequest(zipcode))
      }
    },
    [dispatch]
  )

  const cleanZip = useCallback(() => dispatch(GetZipCodeeDataClean()), [
    dispatch,
  ])

  useEffect(() => {
    setHasError(zipcodeData?.hasError || false)
    if (zipcodeData && zipcodeData.data) {
      setData(zipcodeData)
      cleanZip()
    }
    setIsLoading(zipcodeData?.isLoading || false)
  }, [cleanZip, zipcodeData])

  return { data, searchZipCode, isLoading, hasError }
}
