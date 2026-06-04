import React, { createContext, useEffect, useState } from 'react'

export const UserProvider = createContext();

function ContextProvider({children}) {

    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        const newUserDetails = JSON.parse(localStorage.getItem('user'))
        setUserDetails(newUserDetails)
    }, [])
  return (
    <>

    <UserProvider.Provider value={{userDetails, setUserDetails}}>
        {children}
    </UserProvider.Provider>
    </>
  )
}

export default ContextProvider