'use client'

import * as React from 'react'
import { v4 as uuid } from 'uuid'
import { Message } from '../typings'
import useSWR from 'swr'
import fetcher from '../utils/fetchMessages'
import { unstable_getServerSession } from 'next-auth/next';

type Props = {
    session: Awaited<ReturnType<typeof unstable_getServerSession>>
}

const ChatInput = ({session}: Props) => {
    // always when we need to do something with state, it's basically a client component.
    const [input, setInput] = React.useState<string>("")
    
    // rename data
    const {data: messages, error, mutate} = useSWR("/api/getMessages", fetcher) // using get endpoint

    const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        // look at the return in vscode and set it
        e.preventDefault();

        if (!input) return;

        const id = uuid();

        const messageToSend = input;
        setInput('');

        // object that I will send to the redis
        const message: Message = {
            id: id,
            message: messageToSend,
            created_at: Date.now(),
            username: 'bunny girl',
            profilePic: 'https://pbs.twimg.com/media/FHLbQgnXMAMVbRn.jpg',
            email: 'bunny.work@gmail.com'
        }

        const uploadMessageToUpstash = async () => {
            const data = await fetch('/api/addMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message
                })
            }).then(res => res.json()) // using post endpoint

            
            return [data.message, ...messages!] // getting from useSWR
        }

        // basically making dispatch in data layer
        await mutate(uploadMessageToUpstash, {
            optimisticData: [message, ...messages!], // setting in cache of swr before the val before the call
            rollbackOnError: true,
        }) // -> update the store when I send a message
       
    }

    // flex-1 -> get all the space of a flex container father 
    return (
        <form
            onSubmit={addMessage}
            className={'fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100 bg-white'}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type={'text'}
                disabled={!session}
                placeholder={"Enter a Message here..."}
                className="
                flex-1 rounded border border-gray-300 focus:outline-none 
                focus:ring-2 focus:ring-blue-600 focus:border-transparent 
                px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed
            " />

            <button
                disabled={!input}
                type={'submit'}
                className="
                bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
                  px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed
            ">
                Send
            </button>
        </form>
    )
}

export default ChatInput;