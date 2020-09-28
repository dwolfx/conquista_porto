import { handleGiwRedirect } from 'helpers'

interface ILocationState extends Object {
  idGoal: string
}

export const handleRedirectToLifeInsuranceSimulate = (
  locationState: ILocationState
) => {
  handleGiwRedirect(
    `portaldecliente/conquista/seguro-de-vida/simular?r=true${
      (locationState || {}).idGoal
        ? `&idObjetivo=${(locationState || {}).idGoal}`
        : ''
    }`
  )
}
