import { handleGiwRedirect } from 'helpers'

interface ISuitabilityInfo {
  CotistaContaOrdemPortoPar?: string
  codigo_status_cotista: string
  id_cotista?: string
  investidor_profissional?: string
  investidor_qualificado?: string
  status_cotista: boolean
  status_data_vencimento_cadastro?: boolean
  status_data_vigencia_suitability?: boolean
  status_possui_suitability?: boolean
}

interface ICustomerProfile {
  cpfCnpj: string
  customerName: string
}

interface IObjValidate {
  [index: string]: {}
}

const SCENARIOS_TYPES = {
  // NÃO POSSUI SUITABILITY - NÃO COTISTA
  NOT_SUITABILITY_AND_NOT_QUOTIST: 'NOT_SUITABILITY_AND_NOT_QUOTIST',
  // PROBLEMA NO PERFIL
  PROFILE_PROBLEM: 'PROFILE_PROBLEM',
  // CADASTRO DO PERFIL VENCIDO
  EXPIRED_PROFILE: 'EXPIRED_PROFILE',
  // NÃO POSSUI SUITABILITY
  NOT_SUITABILITY: 'NOT_SUITABILITY',
  // SUITABILITY VENCIDO
  EXPIRED_SUITABILITY: 'EXPIRED_SUITABILITY',
  // CADASTRO EM ANÁLISE
  REGISTRATION_UNDER_ANALYSIS: 'REGISTRATION_UNDER_ANALYSIS',
}

const getInvestmentModalContent = (
  validateCase: string,
  customerProfile?: ICustomerProfile
) => {
  const objValidateInvestButton = {
    NOT_SUITABILITY_AND_NOT_QUOTIST: {
      isOpen: true,
      title: 'Falha ao processar solicitação',
      description:
        'Para investir, você precisa definir o seu perfil investidor.',
      button: {
        dataGtmName: 'definir agora',
        dataGtmType: 'click',
        dataGtmClicktype: 'button',
        handleClick: () =>
          handleGiwRedirect('portaldecliente/conquista/perfil?r=true'),
        buttonName: 'Definir agora',
      },
    },
    PROFILE_PROBLEM: {
      isOpen: true,
      title: 'Falha ao processar solicitação',
      description:
        'Não foi possível prosseguir com a aplicação. Para resolver este problema, converse com um de nossos atendentes.',
      button: {
        dataGtmName: 'conversar',
        dataGtmType: 'click',
        dataGtmClicktype: 'button',
        handleClick: () => {
          window.location.href = `https://wwws.portoseguro.com.br/bot/conquista/index.html?cpf=${
            customerProfile ? customerProfile.cpfCnpj : ''
          }&nome=${customerProfile ? customerProfile.customerName : ''}`
        },
        buttonName: 'Conversar',
      },
    },
    EXPIRED_PROFILE: {
      isOpen: true,
      title: 'Falha ao processar solicitação',
      description:
        'Seu cadastro está vencido. Para continuar, você precisa atualizá-lo.',
      button: {
        dataGtmName: 'atualizar cadastro',
        dataGtmType: 'click',
        dataGtmClicktype: 'button',
        handleClick: () =>
          handleGiwRedirect(`portaldecliente/conquista/perfil?r=true`),
        buttonName: 'Atualizar cadastro',
      },
    },
    NOT_SUITABILITY: {
      isOpen: true,
      title: 'Falha ao processar solicitação',
      description:
        'Para investir, você precisa definir o seu perfil investidor.',
      button: {
        dataGtmName: 'definir agora',
        dataGtmType: 'click',
        dataGtmClicktype: 'button',
        handleClick: () =>
          handleGiwRedirect(
            `portaldecliente/conquista/suitability?vgnextnomenu=1&vgnextnoice=1&tela=perfil&r=true`
          ),
        buttonName: 'Definir agora',
      },
    },
    EXPIRED_SUITABILITY: {
      isOpen: true,
      title: 'Falha ao processar solicitação',
      description:
        'Seu perfil investidor está desatualizado. Refaça-o para investir.',
      button: {
        dataGtmName: 'refazer',
        dataGtmType: 'click',
        dataGtmClicktype: 'button',
        handleClick: () =>
          handleGiwRedirect(
            `portaldecliente/conquista/suitability?vgnextnomenu=1&vgnextnoice=1&tela=perfil&r=true`
          ),
        buttonName: 'Refazer',
      },
    },
    REGISTRATION_UNDER_ANALYSIS: {
      isOpen: true,
      title: 'Falha ao processar solicitação',
      description:
        'Seu cadastro está em análise. Em até 48 horas, você poderá investir.',
      button: {
        dataGtmName: 'fechar',
        dataGtmType: 'click',
        dataGtmClicktype: 'button',
        handleClick: null,
        buttonName: 'Fechar',
      },
    },
  } as IObjValidate

  return objValidateInvestButton[validateCase]
}

export const handleInvestButton = (
  suitabilityInfo: ISuitabilityInfo,
  customerProfile: ICustomerProfile
) => {
  switch (true) {
    case !suitabilityInfo.status_cotista:
      return getInvestmentModalContent(
        SCENARIOS_TYPES.NOT_SUITABILITY_AND_NOT_QUOTIST
      )
    case suitabilityInfo.CotistaContaOrdemPortoPar === 'N' &&
      suitabilityInfo.status_cotista:
      return getInvestmentModalContent(
        SCENARIOS_TYPES.PROFILE_PROBLEM,
        customerProfile
      )
    case suitabilityInfo.status_data_vencimento_cadastro:
      return getInvestmentModalContent(SCENARIOS_TYPES.EXPIRED_PROFILE)
    case !suitabilityInfo.status_possui_suitability:
      return getInvestmentModalContent(SCENARIOS_TYPES.NOT_SUITABILITY)
    case !suitabilityInfo.status_data_vigencia_suitability:
      return getInvestmentModalContent(SCENARIOS_TYPES.EXPIRED_SUITABILITY)
    case suitabilityInfo.codigo_status_cotista !== '30' &&
      suitabilityInfo.codigo_status_cotista !== '122':
      return getInvestmentModalContent(
        SCENARIOS_TYPES.REGISTRATION_UNDER_ANALYSIS
      )
    default:
      return { isValid: true }
  }
}

const getRedeemModalContent = (
  validateCase: string,
  customerProfile?: ICustomerProfile
) => {
  const objValidateRedeemButton = {
    PROFILE_PROBLEM: {
      isOpen: true,
      title: 'Falha ao processar solicitação',
      description:
        'Não foi possível prosseguir com o resgate. Para resolver este problema, converse com um de nossos atendentes.',
      button: {
        dataGtmName: 'conversar',
        dataGtmType: 'click',
        dataGtmClicktype: 'button',
        handleClick: () => {
          window.location.href = `https://wwws.portoseguro.com.br/bot/conquista/index.html?cpf=${
            customerProfile ? customerProfile.cpfCnpj : ''
          }&nome=${customerProfile ? customerProfile.customerName : ''}`
        },
        buttonName: 'Conversar',
      },
    },
    REGISTRATION_UNDER_ANALYSIS: {
      isOpen: true,
      title: 'Falha ao processar solicitação',
      description:
        'Seu cadastro está em análise. Em até 48 horas, você poderá fazer o resgate.',
      button: {
        dataGtmName: 'fechar',
        dataGtmType: 'click',
        dataGtmClicktype: 'button',
        handleClick: null,
        buttonName: 'Fechar',
      },
    },
  } as IObjValidate
  return objValidateRedeemButton[validateCase]
}

export const handleRedeemButton = (
  suitabilityInfo: ISuitabilityInfo,
  customerProfile: ICustomerProfile
) => {
  switch (true) {
    case suitabilityInfo.CotistaContaOrdemPortoPar === 'N' &&
      suitabilityInfo.status_cotista:
      return getRedeemModalContent(
        SCENARIOS_TYPES.PROFILE_PROBLEM,
        customerProfile
      )
    case suitabilityInfo.codigo_status_cotista !== '30' &&
      suitabilityInfo.codigo_status_cotista !== '122':
      return getRedeemModalContent(SCENARIOS_TYPES.REGISTRATION_UNDER_ANALYSIS)
    default:
      return { isValid: true }
  }
}

const getWithdrawModalContent = (
  validateCase: string,
  customerProfile?: ICustomerProfile
) => {
  const objValidateWithdrawButton = {
    PROFILE_PROBLEM: {
      isOpen: true,
      title: 'Falha ao processar solicitação',
      description:
        'Não foi possível retirar o valor. Para resolver este problema, converse com um de nossos atendentes.',
      button: {
        dataGtmName: 'conversar',
        dataGtmType: 'click',
        dataGtmClicktype: 'button',
        handleClick: () => {
          window.location.href = `https://wwws.portoseguro.com.br/bot/conquista/index.html?cpf=${
            customerProfile ? customerProfile.cpfCnpj : ''
          }&nome=${customerProfile ? customerProfile.customerName : ''}`
        },
        buttonName: 'Conversar',
      },
    },
    REGISTRATION_UNDER_ANALYSIS: {
      isOpen: true,
      title: 'Falha ao processar solicitação',
      description:
        'Seu cadastro está em análise. Em até 48 horas, você poderá fazer a retirada.',
      button: {
        dataGtmName: 'fechar',
        dataGtmType: 'click',
        dataGtmClicktype: 'button',
        handleClick: null,
        buttonName: 'Fechar',
      },
    },
  } as IObjValidate
  return objValidateWithdrawButton[validateCase]
}

export const handleWithdrawButton = (
  suitabilityInfo: ISuitabilityInfo,
  customerProfile: ICustomerProfile
) => {
  switch (true) {
    case suitabilityInfo.CotistaContaOrdemPortoPar === 'N' &&
      suitabilityInfo.status_cotista:
      return getWithdrawModalContent(
        SCENARIOS_TYPES.PROFILE_PROBLEM,
        customerProfile
      )
    case suitabilityInfo.codigo_status_cotista !== '30' &&
      suitabilityInfo.codigo_status_cotista !== '122':
      return getWithdrawModalContent(
        SCENARIOS_TYPES.REGISTRATION_UNDER_ANALYSIS
      )
    default:
      return { isValid: true }
  }
}
