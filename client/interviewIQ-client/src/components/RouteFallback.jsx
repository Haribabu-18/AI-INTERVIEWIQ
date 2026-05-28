import React from 'react'

function RouteFallback() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">Home</Link>
    </>
  )
}

export default RouteFallback