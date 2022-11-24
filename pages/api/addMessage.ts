// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serverPusher } from '../../pusher'
import redis from "../../redis"
import { Message } from '../../typings'

type Data = {
    message: Message
}

type ErrorData = {
    body: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
) {

    // forcing the endpoint beeing only the POST Method
    if (req.method !== 'POST') {
        res.status(405).json({ body: 'method not allowed' })
        return
    }

    const { message } = req.body

    // changing created_at from user to the server
    const newMessage = {
        ...message,
        created_at: Date.now()
    }

    // pushing to upstash
    await redis.hset('messages', message.id, JSON.stringify(newMessage))

    // using push
    serverPusher.trigger("messages", "new-message", newMessage)

    res.status(200).json({message: newMessage})
}
