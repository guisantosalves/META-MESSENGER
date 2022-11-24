'use client'
import * as React from 'react'
import useSWR from 'swr';
import fetcher from '../utils/fetchMessages';
import MessageComponent from './MessageComponent';

const MessageList = () => {

    // getting from the end point
    const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)

    // we need to get message that the db has but doesn't show it yet
    console.log(messages)
    return (
        <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
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