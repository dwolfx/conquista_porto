import React from 'react'

import ProposalStatusSuccess from './Success'
import ProposalStatusError from './Error'

interface IProps {
  status: 'success' | 'error'
  customerName: string
}
const ProposalStatus = ({ status, customerName }: IProps) => {
  return (
    <>
      {status === 'success' && <ProposalStatusSuccess customerName={customerName} />}
      {status === 'error' && <ProposalStatusError />}
    </>
  )
}

export default ProposalStatus