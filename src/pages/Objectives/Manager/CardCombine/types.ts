import { TAdditional } from 'store/modules/ObjectiveManagement/types'

export interface IProps {
  additional: TAdditional
  onClick: (param?: any) => void
}

export interface IDataLayer {
  name: string
  category: string
  position: number
}
