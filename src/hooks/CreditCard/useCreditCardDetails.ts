import { useEffect, useState } from 'react'

import { FLAGS } from "pages/CreditCard/Creation/types";
import { getCreditCardDetails } from 'helpers';

export default function useCreditCardDetails(flagCode: FLAGS | null) {
  const [flagName, setFlagName] = useState<string | null>('')

  useEffect(() => {
    setFlagName(getCreditCardDetails(flagCode as FLAGS).flagName)
  }, [flagName, flagCode])

  return {
    flagName,
    flagCode
  }
} 