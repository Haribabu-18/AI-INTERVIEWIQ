import axios from 'axios';
import React, { useState } from 'react'
import { data, useNavigate } from 'react-router-dom';

function Login() {

  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" })

  const navigate = useNavigate();

  function handleChange(e) {

    const { name, value } = e.target;

    const newUserCredentials = { ...userCredentials }
    newUserCredentials[name] = value

    console.log(newUserCredentials)

    setUserCredentials(newUserCredentials);
  }

  async function userLogin(e) {
    e.preventDefault();

    try {

      const loginData = await axios.post("http://localhost:4000/auth/login", userCredentials);
      console.log(loginData, "login data");

      navigate("/");

      localStorage.setItem('token', loginData.data.token)
      localStorage.setItem('user', JSON.stringify(loginData.data.userDetails))


    } catch (err) {
      console.log(err, err.response)
    }
  }


  return (
    <>
      {/* 
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
      </div> */}

      <div className="min-h-screen bg-white flex justify-center items-center p-6">
        <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

          {/* Left */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">

            <div className="mb-12">
              <h2 className="font-bold text-[#2976DD] text-xl">
                AI-InterviewIQ
              </h2>
            </div>

            <h1 className="text-5xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-3 mb-8">
              Continue your interview preparation journey
            </p>

            <form onSubmit={userLogin} className="space-y-5">

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={userCredentials.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-[#2976DD] outline-none"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userCredentials.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-[#2976DD] outline-none"
              />

              <div className="flex justify-between text-sm text-gray-500">
                <label className="flex gap-2 items-center">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-[#2976DD]"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2976DD] hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
              >
                Sign In
              </button>

              <p className="text-center text-gray-500">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-[#2976DD] cursor-pointer font-semibold"
                >
                  Sign Up
                </span>
              </p>

            </form>
          </div>

          {/* Right */}
          <div className="hidden lg:block">
            <img
              src="/signup.jpg"
              alt="AI Interview IQ"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

    </>
  )
}

export default Login