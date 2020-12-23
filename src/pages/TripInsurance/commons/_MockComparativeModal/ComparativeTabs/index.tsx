import React, { useEffect, useState } from 'react'
import { uuid } from 'uuidv4'

import VerticalList from 'components/VerticalList'
import { Tab } from 'components/Tab/NewTab'

import * as t from '../types'
import * as s from './styles'

interface IComparativeTabs {
  travelPlans: t.ITravelPlans[]
}

const ComparativeTabs: React.FC<IComparativeTabs> = ({
  travelPlans,
  ...rest
}) => {
  const [planContent, setPlanContent] = useState<t.ITravelCoverage[]>([])

  useEffect(() => {
    if (travelPlans.length > 0) {
      setPlanContent(travelPlans[0].viagemCobertura)
    }
  }, [travelPlans])

  const renderItems = (planContent: t.ITravelCoverage[]) =>
    planContent.map((item, index) => (
      <div key={uuid()}>
        <VerticalList
          elements={[
            <s.LabelText>{item.descricao}</s.LabelText>,
            <s.ValueText>{item.valor}</s.ValueText>,
          ]}
        />
        {index + 1 === planContent.length ? null : <s.Divisor />}
      </div>
    ))

  const renderTabs = () => (
    <s.StyledTabs
      name="tab-planos"
      initialValue={`tab-plano-${travelPlans[0].nomePlano
        .replace(' ', '')
        .replace('Brasil', '')}`}
      initialReset
      {...rest}
    >
      <s.StickyContent>
        <s.StyledTabList
          ariaLabel="Detalhes do fundo"
          data-testid="drawer-tabs"
        >
          {travelPlans.map(plan => {
            const planName = plan.nomePlano
              .replace(' ', '')
              .replace('Brasil', '')

            return (
              <Tab
                name={`tab-plano-${planName}`}
                key={uuid()}
                onClick={() => setPlanContent(plan.viagemCobertura)}
                data-gtm-type="click"
                data-gtm-clicktype="button"
                data-gtm-subname={`Plano ${planName}`}
                data-gtm-name="Modal Comparativo"
              >
                {planName}
              </Tab>
            )
          })}
        </s.StyledTabList>
      </s.StickyContent>

      <s.PlansData>{renderItems(planContent)}</s.PlansData>
    </s.StyledTabs>
  )

  return travelPlans.length > 0 ? renderTabs() : null
}

export default ComparativeTabs
