// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from "../../redis"
import { Message } from '../../typings'

type Data = {
    message: Message
}

type ErrorData = {
    body: string
}

type DataResponse = {
    messages: Message[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData | DataResponse>
) {

    // forcing the endpoint beeing only the POST Method
    if (req.method !== 'GET') {
        res.status(405).json({ body: 'method not allowed' })
        return
    }

    const messageResponse = await redis.hvals('messages')
    
    // making map and sorting data by date
    const messages: Message[] = 
        messageResponse
        .map((item, index) => JSON.parse(item))
        .sort((a, b) => b.created_at - a.created_at)

    res.status(200).json({messages: messages})
}
