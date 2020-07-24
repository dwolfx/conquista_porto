import { formatNumber } from 'helpers'

export const handleVariance = (
  benchmark?: string,
  value1: string = '0',
  value2: string = '0'
) => {
  let response
  if (benchmark && benchmark.toLowerCase() === 'cdi') {
    response = +value1 / +value2
  } else {
    response = +value1 - +value2
  }
  return response > 0 ? formatNumber(response.toFixed(2)) : '---'
}
