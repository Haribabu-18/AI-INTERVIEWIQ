import React, { useContext, useState } from 'react'
import { UserProvider } from './ContextProvider'
import { api } from '../apis/interceptors';

function UpdateProfileForm() {

    const { userDetails } = useContext(UserProvider);

    const [user, setUser] = useState(userDetails);

    function updateForm(value, keyName) {
        const newUser = { ...user }
        newUser[keyName] = value
        setUser(newUser)
    }

    async function updateProfile(e) {
        e.preventDefault()

        // Compare prev data (userDetails) and new data (user)

        const updatedRecords = {} // {name : "nitesh"}

        for (let key in userDetails) {
            // If userDetails[name] !== user[name] then updatedRecords[name] = user.name
            if (userDetails[key] !== user[key]) updatedRecords[key] = user[key]
        }

        try {
            const update = await api.patch("/user/updateProfile", updatedRecords)
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <>
            <div>
                <form onSubmit={updateProfile} className='flex flex-col gap-2'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input className='border-1' type='text' name='name' id='name' value={user.name} onChange={(e) => updateForm(e.target.value, 'name')} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input className='border-1' type='email' name='email' id='email' value={user.email} onChange={(e) => updateForm(e.target.value, 'email')} />
                    </div>
                    <div>
                        <label htmlFor='dob'>Dob</label>
                        <input className='border-1' type='date' name='dob' id='dob' value={user.dob} onChange={(e) => updateForm(e.target.value, 'dob')} />
                    </div>
                    <div>
                        <label htmlFor='phone'>Phone</label>
                        <input className='border-1' type='text' name='phone' id='phone' value={user.phone} onChange={(e) => updateForm(e.target.value, 'phone')} />
                    </div>
                    <div>
                        <input type="Submit" />
                    </div>
                </form>
            </div>

        </>
    )
}

export default UpdateProfileForm