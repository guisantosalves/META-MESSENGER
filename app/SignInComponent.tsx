'use client'
import * as React from 'react';
import { getProviders } from "next-auth/react"
import { signIn } from "next-auth/react"

// trick to get the type
type Props = {
    providers: Awaited<ReturnType<typeof getProviders>>
}

const SignInComponent = ({ providers }: Props) => {

    return (
        <div className='flex justify-center'>
            {Object.values(providers!).map((provider, index) => (
                <div key={index}>
                    <button 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => signIn(provider.id, {
                        callbackUrl: process.env.VERCEL || "http://localhost:3000"
                    })}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default SignInComponent