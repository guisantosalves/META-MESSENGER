import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Header() {

    const session = false;

    if(session) return (
        <header className='stick top-0 z-50 bg-white flex justify-center items-start p-10 shadow-sm'>
            <div className='flex space-x-2'>
                {/* <Image src={}/> */}
                <h1>header if I am logged in</h1>
            </div>
        </header>
    )

    return (
        <header className='stick top-0 z-50 bg-white flex justify-center items-start p-10 shadow-sm'>
            <div className='flex flex-col items-center space-y-5'>
                <div className='flex space-x-2 items-center'>
                    <Image
                        src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png"
                        alt="logo meta"
                        height={10}
                        width={50}
                    />
                    <p className='text-blue-400'>Welcome to Metas Messenger</p>
                </div>

                <Link 
                    href={'/second'}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Sign In
                </Link>
            </div>
        </header>
    )
}

export default Header