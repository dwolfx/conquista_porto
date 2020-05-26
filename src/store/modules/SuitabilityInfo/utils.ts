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

interface IBankData {
  DadosContaPortoSeguro: { cpf: string; titular: string }
}

export const handleInvestButton = (
  suitabilityInfo: ISuitabilityInfo,
  bankData: IBankData
) => {
  switch (true) {
    case !suitabilityInfo.status_cotista:
      return {
        isOpen: true,
        title: 'Falha ao processar solicitação',
        description:
          'Para investir, você precisa definir o seu perfil investidor.',
        button: {
          dataGtmName: 'definir agora',
          dataGtmType: 'click',
          dataGtmClicktype: 'button',
          handleClick: () =>
            handleGiwRedirect(`portaldecliente/conquista/perfil?r=true`),
          buttonName: 'Definir agora',
        },
      }
    case suitabilityInfo.CotistaContaOrdemPortoPar === 'N' &&
      suitabilityInfo.status_cotista:
      return {
        isOpen: true,
        title: 'Falha ao processar solicitação',
        description:
          'Não foi possível prosseguir com a aplicação. Para resolver este problema, converse com um de nossos atendentes.',
        button: {
          dataGtmName: 'conversar',
          dataGtmType: 'click',
          dataGtmClicktype: 'button',
          handleClick: () => {
            window.location.href = `https://wwws.portoseguro.com.br/bot/conquista/index.html?cpf=${bankData.DadosContaPortoSeguro.cpf}&nome=${bankData.DadosContaPortoSeguro.titular}`
          },
          buttonName: 'Conversar',
        },
      }
    case suitabilityInfo.codigo_status_cotista !== '30' &&
      suitabilityInfo.codigo_status_cotista !== '122':
      return {
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
      }
    case suitabilityInfo.status_data_vencimento_cadastro:
      return {
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
      }
    case !suitabilityInfo.status_possui_suitability:
      return {
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
      }
    case !suitabilityInfo.status_data_vigencia_suitability:
      return {
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
      }
    default:
      return { isValid: true }
  }
}
export const handleRedeemButton = (
  suitabilityInfo: ISuitabilityInfo,
  bankData: IBankData
) => {
  switch (true) {
    case suitabilityInfo.CotistaContaOrdemPortoPar === 'N' &&
      suitabilityInfo.status_cotista:
      return {
        isOpen: true,
        title: 'Falha ao processar solicitação',
        description:
          'Não foi possível prosseguir com o resgate. Para resolver este problema, converse com um de nossos atendentes.',
        button: {
          dataGtmName: 'conversar',
          dataGtmType: 'click',
          dataGtmClicktype: 'button',
          handleClick: () => {
            window.location.href = `https://wwws.portoseguro.com.br/bot/conquista/index.html?cpf=${bankData.DadosContaPortoSeguro.cpf}&nome=${bankData.DadosContaPortoSeguro.titular}`
          },
          buttonName: 'Conversar',
        },
      }
    case suitabilityInfo.codigo_status_cotista !== '30' &&
      suitabilityInfo.codigo_status_cotista !== '122':
      return {
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
      }
    default:
      return { isValid: true }
  }
}
export const handleWithdrawButton = (
  suitabilityInfo: ISuitabilityInfo,
  bankData: IBankData
) => {
  switch (true) {
    case suitabilityInfo.CotistaContaOrdemPortoPar === 'N' &&
      suitabilityInfo.status_cotista:
      return {
        isOpen: true,
        title: 'Falha ao processar solicitação',
        description:
          'Não foi possível retirar o valor. Para resolver este problema, converse com um de nossos atendentes.',
        button: {
          dataGtmName: 'conversar',
          dataGtmType: 'click',
          dataGtmClicktype: 'button',
          handleClick: () => {
            window.location.href = `https://wwws.portoseguro.com.br/bot/conquista/index.html?cpf=${bankData.DadosContaPortoSeguro.cpf}&nome=${bankData.DadosContaPortoSeguro.titular}`
          },
          buttonName: 'Conversar',
        },
      }
    case suitabilityInfo.codigo_status_cotista !== '30' &&
      suitabilityInfo.codigo_status_cotista !== '122':
      return {
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
      }
    default:
      return { isValid: true }
  }
}
