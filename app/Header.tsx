import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// components
import LogOutButton from './LogOutButtons';

// every component that has any interactive action, that's gonna be a client component
// however we need build a component for that
function Header() {

    const session = true;

    if(session) return (
        <header className='stick top-0 z-50 bg-white flex justify-between items-start p-10 shadow-sm'>
            <div className='flex space-x-2'>
                <Image 
                    src={'https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png'}
                    className="rounded-full mx-2 object-contain"
                    height={10}
                    width={50}
                    alt={'Profile Picture'}
                />
                <div>
                   <p className="text-blue-500">Logged in as:</p>
                   <p className="font-bold text-lg">Guilherme Santos</p>
                </div>
                  
            </div>

            <LogOutButton />
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