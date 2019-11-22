import React from 'react'
import renderer from 'react-test-renderer'

import PageContent from '../../../../components/Management/PageContent'

it('PageContent renders correctly', () => {
  const tree = renderer
    .create(
      <PageContent>
        <span>testando</span>
      </PageContent>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
