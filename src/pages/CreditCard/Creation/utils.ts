import { TOptions, TSelected } from 'components/Inputs/Select/types'

export function optionsToSelected(options: TOptions): TSelected {
  return {
    id: Number(options.id),
    name: options.text,
  }
}
