import React from 'react'
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry'

export default (Wrapped) => {
  const withErrorBoundary = ({ ...props }) => {
    return (
      <ErrorBoundry>
    <Wrapped {...props} />
    </ErrorBoundry>
    )
}
  return withErrorBoundary
}
