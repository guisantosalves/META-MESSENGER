'use client'
import * as React from 'react'
import useSWR from 'swr';
import fetcher from '../utils/fetchMessages';
import MessageComponent from './MessageComponent';
import { Message } from '../typings';
import { clientPusher } from '../pusher';

// subscribe channel -> channel has an event -> gets the event -> get the data of the event -> update in all application
/*
    como mutate funciona -> Em muitos casos, aplicar mutações locais aos dados é uma boa maneira de fazer 
    alterações parecerem mais rápidas — não precisa esperar para a fonte de dados remota.
    Com mutate, você pode atualizar seus dados localmente, enquanto revalidar e depois substituir por os dados mais recentes.
*/

type Props = {
    initialMessages: Message[]
}

const MessageList = ({initialMessages}: Props) => {

    // getting from the end point
    const { data: messages, error, mutate } = useSWR<Message[]>('/api/getMessages', fetcher)

    React.useEffect(() => {
        const channel = clientPusher.subscribe('messages') // channel

        // bind gets into the event
        channel.bind('new-message', async (data: Message) => {

            // if you sent the message, no need to update cache of swr
            if (messages?.find((item) => item.id === data.id)) return;

            if (!messages) {
                mutate(fetcher)
            } else {
                mutate(fetcher, {
                    optimisticData: [data, ...messages!],
                    rollbackOnError: true,
                })
            }

        })

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [messages, mutate, clientPusher])
    return (
        <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
            {(messages || inititalMessages).map((item, index) => (
                <MessageComponent
                    key={index}
                    message={item}
                />
            ))}
        </div>
    )
}

export default MessageList;