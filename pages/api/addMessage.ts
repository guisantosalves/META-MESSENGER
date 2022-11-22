// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from "../../redis"

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    // forcing the endpoint beeing only the POST Method
    if (req.method !== 'POST') {
        res.status(405).json({message: 'method not allowed'})
        return
    }

    const {message} = req.body

    // changing created_at from user to the server
    const newMessage = {
        ...message,
        created_at: Date.now()
    }

    // pushing to upstash
    
}
