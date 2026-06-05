import React, { useState } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

function Signup() {
    const [formValues, setFormValues] = useState({ name: "", email: "", dob: "", phone: "", password: "", confirmPassword: "" })

    const navigate = useNavigate();

    function updateFormData(e) {
        const { name, value } = e.target;

        console.log(name, value)

        //create a new object copy formValues
        const updatedFormValues = { ...formValues }

        updatedFormValues[name] = value;

        //checking for phone number
        if (name == "phone" && value.length > 10) {
            console.log("enter correct number")
            return
        }

        setFormValues(updatedFormValues);
    }

    async function signUp(e) {
        e.preventDefault();

        if (formValues.password !== formValues.confirmPassword) {
            // toast('Password Does not Match', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: false,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            //     // transition: Bounce,
            // });
            return
        }

        const body = {
            name: formValues.name,
            email: formValues.email,
            dob: formValues.dob,
            phone: formValues.phone,
            password: formValues.password
        }


        try {
            const dataFromSignUp = await axios.post("http://localhost:4000/auth/signup", body);
            console.log(dataFromSignUp, "data from signup");

            navigate("/login");

        } catch (err) {
            console.log(err.messdob)
        }

    }
    return (
        <>
            {/* <div className='h-screen flex justify-center items-center'>
                <form className='flex flex-col gap-2' onSubmit={signUp}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input className='border-1' type='text' name='name' value={formValues.name} id='name' onChange={updateFormData} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input className='border-1' type='email' name='email' value={formValues.email} id='email' onChange={updateFormData} />
                    </div>
                    <div>
                        <label htmlFor='dob'>Dob</label>
                        <input className='border-1' type='date' name='dob' id='dob' value={formValues.dob} onChange={updateFormData} />
                    </div>
                    <div>
                        <label htmlFor='phone'>Phone</label>
                        <input className='border-1' type='text' name='phone' value={formValues.phone} id='phone' onChange={updateFormData} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input className='border-1' type='password' name='password' value={formValues.password} id='password' onChange={updateFormData} />
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input className='border-1' type='password' name='confirmPassword' value={formValues.confirmPassword} id='confirmPassword' onChange={updateFormData} />
                    </div>
                    <div>
                        <input type="Submit" />
                    </div>
                </form>
            </div> */}
            <div className="h-screen bg-[#f5f7fb] flex items-center justify-center overflow-hidden">
                <div className="w-[95%] h-[92vh] max-w-7xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">

                    {/* Left Section */}
                    <div className="px-10 lg:px-14 py-6 flex flex-col justify-center relative">

                        <div className="absolute top-6 left-6 border border-gray-300 rounded-full px-5 py-2">
                            <span className="font-semibold text-[#2976DD]">
                                AI-InterviewIQ
                            </span>
                        </div>

                        <div className="mt-6">
                            <h1 className="text-4xl font-bold text-gray-800">
                                Create an Account
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Start your AI interview preparation journey
                            </p>
                        </div>

                        <form className="mt-6 flex flex-col gap-3" onSubmit={signUp}>

                            <input
                                className="bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2976DD]"
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formValues.name}
                                onChange={updateFormData}
                            />

                            <input
                                className="bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2976DD]"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={updateFormData}
                            />

                            <input
                                className="bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2976DD]"
                                type="date"
                                name="dob"
                                value={formValues.dob}
                                onChange={updateFormData}
                            />

                            <input
                                className="bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2976DD]"
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formValues.phone}
                                onChange={updateFormData}
                            />

                            <input
                                className="bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2976DD]"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={updateFormData}
                            />

                            <input
                                className="bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2976DD]"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formValues.confirmPassword}
                                onChange={updateFormData}
                            />

                            <button
                                type="submit"
                                className="bg-[#2976DD] hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
                            >
                                Create Account
                            </button>
                        </form>
                    </div>

                    {/* Right Section */}
                    <div className="hidden lg:block relative">
                        <img
                            src="/signup.jpg"
                            alt="AI Interview"
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute top-10 left-10 bg-[#2976DD] text-white px-6 py-4 rounded-2xl shadow-lg">
                            <h3 className="font-semibold">
                                AI Mock Interview
                            </h3>

                            <p className="text-sm opacity-90">
                                Practice • Analyze • Improve
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Signup