import React from 'react'
import UpdateProfileForm from './UpdateProfileForm'

function PopUp({ setIsEditing, RenderComponent }) {
    return (
        <div className='absolute h-[400px] shadow-2xl flex  bg-white left-[25%] w-[400px]'>
            <div className='w-full'>
                <div className=' flex justify-end' >
                    <button onClick={() => {setIsEditing(false)}}>Close</button>
                </div>
                <div>
                   <RenderComponent/>
                </div>
            </div>
        </div>
    )
}

export default PopUp