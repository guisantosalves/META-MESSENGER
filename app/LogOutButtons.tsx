"use client"
import * as React from 'react'

// when I want declare that it's a cliente need to set "use client"
const LogOutButton = () => {
    return(
        <button
            onClick={()=>console.log("hello")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            <p>Sign Out</p>
        </button>
    )
}

export default LogOutButton;