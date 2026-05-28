import React, { useState } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

function Signup() {
    const [formValues, setFormValues] = useState({ name: "", email: "", age: "", phone: "", password: "", confirmPassword: "" })

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
            age: formValues.age,
            phone: formValues.phone,
            password: formValues.password
        }


        try {
            const dataFromSignUp = await axios.post("http://localhost:4000/auth/signup", body);
            console.log(dataFromSignUp, "data from signup");

            navigate("/login");

        } catch (err) {
            console.log(err.message)
        }

    }
    return (
        <>
            <div className='h-screen flex justify-center items-center'>
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
                        <label htmlFor='age'>Age</label>
                        <input className='border-1' type='number' name='age' id='age' value={formValues.age} onChange={updateFormData} />
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
            </div>
        </>
    )
}

export default Signup