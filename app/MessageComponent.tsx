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
    return (
        <div className="flex w-fit">
            <div>
                <Image
                    className="rounded-full mx-2"
                    src={message.profilePic}
                    width={50}
                    height={10}
                    alt={"Icon user"}
                />
            </div>

            <div>
                <p>{message.username}</p>
                
                <div>
                    <div>
                       <p>{message.message}</p> 
                    </div>

                    <p>{new Date(message.created_at).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default MessageComponent