import axios from 'axios';
import React, { useState } from 'react'
import { data, useNavigate } from 'react-router-dom';

function Login() {

  const [userCredentials, setUserCredentials] = useState({email: "", password: ""})

  const navigate = useNavigate();

  function handleChange(e){

    const {name, value} = e.target;

    const newUserCredentials = {...userCredentials}
    newUserCredentials[name] = value

    console.log(newUserCredentials)

    setUserCredentials(newUserCredentials);
  }

  async function userLogin(e){
    e.preventDefault();

    try{

      const loginData = await axios.post("http://localhost:4000/auth/login", userCredentials);
      console.log(loginData,"login data");

      navigate("/");

      localStorage.setItem('token', loginData.data.token)
      localStorage.setItem('user', JSON.stringify(loginData.data.userDetails))


    }catch(err){
      console.log(err, err.response)
    }
  }


  return (
    <>

      <div className='h-screen flex justify-center items-center'>
        <form onSubmit={userLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' onChange={handleChange} value={userCredentials.email}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' onChange={handleChange} value={userCredentials.password}/>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>

    </>
  )
}

export default Login