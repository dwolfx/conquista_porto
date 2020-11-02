import moment from 'moment'

export function calculateDepositPercentages(
  monthObject: any,
  monthNumber: number,
  year: number
) {
  let depositPercentage = 0

  if (!monthObject) {
    return {
      deposited: 0,
      missingDeposit: 0,
    }
  }

  if (monthObject && monthObject.deposit === 0) {
    if (depositPercentage !== 0) depositPercentage = 0
  } else {
    depositPercentage =
      monthObject &&
      Math.round((monthObject.deposit * 100) / monthObject.expected_deposit)
  }

  const formattedMonth = monthNumber < 10 ? `0${monthNumber}` : monthNumber
  if (moment(`${year}-${formattedMonth}`).isBefore(moment(), 'month')) {
    // essa validação tem o intuito de identificar se estamos checando um mês passado,
    // para então pintá-lo com as duas cores, baseado nas porcentagens relacionadas ao depósito.
    return {
      deposited: depositPercentage > 100 ? 100 : depositPercentage,
      missingDeposit: 100 - (depositPercentage > 100 ? 100 : depositPercentage),
    }
  }

  if (
    moment(`${year}-${formattedMonth}`).isSame(moment(), 'month')
    // essa verificação tem o intuito de identificar se estamos verificando o mês corrente,
    // para então pintá-lo apenas de azul
  ) {
    return {
      deposited: depositPercentage > 100 ? 100 : depositPercentage,
      missingDeposit: 0,
    }
  }

  // se for um mês futuro, deixaremos com background 'transparente' (gray)
  return {
    deposited: 0,
    missingDeposit: 0,
  }
}

export function calcBarSize(monthNumber: number, vertical: boolean) {
  const scale = vertical ? 14 : 20
  return monthNumber * scale
}
