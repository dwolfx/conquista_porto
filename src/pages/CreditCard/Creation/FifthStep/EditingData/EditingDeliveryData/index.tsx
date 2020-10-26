import React from 'react'

import Drawer from 'components/Drawer'

import * as s from './styles'
import * as t from './types'

const EditingDeliveryData: React.FC<t.IEditingDeliveryData> = ({
  isOpen,
  handleClose,
  formData,
  setFormData,
  ...rest
}) => {
  const title = 'hehe'

  return (
    <Drawer
      size="sm"
      isOpen={isOpen}
      handleClose={handleClose}
      drawerTitle="Alterar endereço de entrega"
      // footer={footerButton()}
      {...rest}
    />
  )
}

export default EditingDeliveryData
