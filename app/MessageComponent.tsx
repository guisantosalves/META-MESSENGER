import * as React from "react"
import { Message } from "../typings";
import Image from 'next/image'

type Props = {
    message: Message;
}

/*
    width: fit-content -> Use the space you can (available) but never less than your min-content and never more than your max-content 
*/
const MessageComponent = ({ message }: Props) => {

    const isUser = true;
    
    return (
        <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
            <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
                <Image
                    className="rounded-full mx-2"
                    src={message.profilePic}
                    width={50}
                    height={10}
                    alt={"Icon user"}
                />
            </div>

            <div>
                <p className={`text-[0.65rem] px-[2px] pb-[2px] 
                ${isUser ? 'text-blue-400 text-right' : 'text-red-400 text-left'}`}>
                    {message.username}
                </p>

                <div className="flex items-end">
                    <div className={`px-3 py-2 rounded-lg w-fit text-white
                    ${isUser ? 'bg-blue-400 ml-auto order-2 text-right' : 'bg-red-400 text-left'}`}>
                        <p>{message.message}</p>
                    </div>

                    <p className={`text-[0.65rem] italic px-2 text-gray-400 
                    ${isUser && 'text-right'}`}>
                        {new Date(message.created_at).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MessageComponent