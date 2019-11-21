/* eslint-disable react/no-array-index-key */
import React from 'react'
import { CrumbText, CrumbCurrentPage } from './styles'

const isLastCrumb = length => currentIndex => length === currentIndex + 1

const getCrumbTag = isLast => (isLast ? CrumbCurrentPage : CrumbText)

export default function Breadcrumb({ crumbs }) {
  return (
    <>
      {crumbs.map((crumb, index) => {
        const isLast = isLastCrumb(crumbs.length)(index)
        const CrumbTag = getCrumbTag(isLast)
        return (
          <CrumbTag key={`crumbKey-${index}`}>
            {crumb}
            {!isLast && ' »'}
          </CrumbTag>
        )
      })}
    </>
  )
}
