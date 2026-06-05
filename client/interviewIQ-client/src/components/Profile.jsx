import React, { useContext, useState } from 'react'
import { UserProvider } from './ContextProvider'
import moment from 'moment';
import PopUp from './PopUp';
import UpdateProfileForm from './UpdateProfileForm';
import { api } from '../apis/interceptors';

function Profile() {

  const { userDetails } = useContext(UserProvider)

  const [isEditing, setIsEditing] = useState(false);

  // const [formData, setFormData] = useState({ name: "", email: "", dob: "", phone: "" });


  function calculateAge(dob) {
    if (!dob) return null;

    const age = moment().diff(dob, 'years');
    // console.log(age, dob)
    return age
  }

  // function editUserDetails() {
  //   setFormData(userDetails);
  //   setIsEditing(true);

  // }

  return (
    <>
      <div className="p-6 relative">
        {isEditing ? <PopUp setIsEditing={setIsEditing} RenderComponent={UpdateProfileForm} /> : null}
        <div className="w-full h-80 border rounded-lg shadow-md p-6">

          <div className="flex justify-end">
            <button className="px-4 py-2 border rounded cursor-pointer" onClick={() => { setIsEditing(!isEditing) }}>
              Edit
            </button>

          </div>

          <div className="mt-6 space-y-3 text-lg">
            <p><strong>Name:</strong> {userDetails?.name}</p>
            <p><strong>Email:</strong> {userDetails?.email}</p>
            <p><strong>Age:</strong>{userDetails.dob ? calculateAge(userDetails.dob) : "N/A"} </p>
            <p><strong>Phone:</strong> {userDetails?.phone}</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Profile