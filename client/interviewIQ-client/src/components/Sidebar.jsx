import React from 'react'
import { navItems } from '../utils/navitems'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {

  const navigate = useNavigate();

  function logout(){
    localStorage.clear();
    navigate('/login')

  }
  return (
    <>
    
    <div className='flex flex-col h-screen py-5 pl-2 justify-between'>
      <div>
        <header>
          <h1>Ai-InterviewIQ</h1>
        </header>

        <nav className='mt-10'>
          <ul>
            {navItems.map((item) => {
              return <li key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            })}
          </ul>
        </nav>
      </div>

      <div>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
    
    </>
  )
}

export default Sidebar