import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedLayout() {


  const userCredentials = localStorage.getItem("user")
  console.log(userCredentials, 'user credentials')
  if (userCredentials) {
    return <Navigate to="/" />
  }
  return (
    <>
      <Outlet /></>
  )
}

export default ProtectedLayout