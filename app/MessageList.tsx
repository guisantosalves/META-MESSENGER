'use client'
import * as React from 'react'
import useSWR from 'swr';
import fetcher from '../utils/fetchMessages';
import MessageComponent from './MessageComponent';

const MessageList = () => {

    // getting from the end point
    const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)

    console.log(messages)
    return (
        <div>
            {messages?.map((item, index) => (
                <MessageComponent
                    key={index}
                    message={item}
                />
            ))}
        </div>
    )
}

export default MessageList;