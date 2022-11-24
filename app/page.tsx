import * as React from 'react'

// component
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message } from '../typings';
import { unstable_getServerSession } from 'next-auth/next';
import { Providers } from './Providers'

/*
    chat input -> faço o push da menssagem no banco e faço o set dela
    no store do swr pelo mutate -> fazendo isso, não vai precisar refazer 
    validação nenhuma, simplesmente já renderiza

    no caso de outra pessoa no chat:
    messagelist -> ele valida o clientPusher, mutate e o messages,
    ele faz a inserção dos dados do evento a cada evento que 
    é lançado no pusher.
*/
async function HomePage() {
    const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then((res) => {
        return res.json()
    })

    // getting the data in the server
    const messages: Message[] = data.messages;

    const session = await unstable_getServerSession()

    return (
        <Providers session={session}>
            <main>
                {/* message list */}
                <MessageList initialMessages={messages} />

                {/* chat input */}
                <ChatInput session={session} />
            </main>
        </Providers>
    )
}

export default HomePage;