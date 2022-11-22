'use client'

import * as React from 'react'
import { v4 as uuid } from 'uuid'
import { Message } from '../typings'

const ChatInput = () => {
    // always when we need to do something with state, it's basically a client component.
    const [input, setInput] = React.useState<string>("")

    const addMessage = (e: React.FormEvent<HTMLFormElement>) => {
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
            const response = await fetch('/api/addMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message
                })
            })

            const data = await response.json()
        }

    }

    // flex-1 -> get all the space of a flex container father 
    return (
        <form
            onSubmit={addMessage}
            className={'fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100'}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type={'text'}
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