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
      <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
        {isEditing ? (
          <PopUp setIsEditing={setIsEditing} RenderComponent={UpdateProfileForm} />
        ) : null}

        <div className="max-w-4xl mx-auto">

          {/* Page Header */}
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Profile</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your personal information</p>
          </header>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Profile Banner */}
            <div className="px-6 py-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="h-14 w-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <span className="text-xl font-semibold text-blue-600">
                    {userDetails?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-800">
                    {userDetails?.name || "User"}
                  </p>
                  <p className="text-xs text-slate-500">{userDetails?.email || ""}</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            {/* Info Grid */}
            <div className="p-6 grid md:grid-cols-2 gap-4">

              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Full Name</p>
                <p className="text-sm font-semibold text-slate-800">
                  {userDetails?.name || "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Email Address</p>
                <p className="text-sm font-semibold text-slate-800">
                  {userDetails?.email || "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Age</p>
                <p className="text-sm font-semibold text-slate-800">
                  {userDetails?.dob ? calculateAge(userDetails.dob) : "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Phone Number</p>
                <p className="text-sm font-semibold text-slate-800">
                  {userDetails?.phone || "N/A"}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-6 relative">
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
      </div> */}
    </>
  )
}

export default Profile