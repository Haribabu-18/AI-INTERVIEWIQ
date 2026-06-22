import React from 'react'
import UpdateProfileForm from './UpdateProfileForm'

function PopUp({ setIsEditing, RenderComponent }) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
                        <div>
                            <h2 className="text-base font-semibold text-slate-800">Update Profile</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Edit your personal information</p>
                        </div>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <RenderComponent />
                    </div>

                </div>
            </div>
        </>
        // <div className='absolute h-[400px] shadow-2xl flex  bg-white left-[25%] w-[400px]'>
        //     <div className='w-full'>
        //         <div className=' flex justify-end' >
        //             <button onClick={() => {setIsEditing(false)}}>Close</button>
        //         </div>
        //         <div>
        //            <RenderComponent/>
        //         </div>
        //     </div>
        // </div>
    )
}

export default PopUp