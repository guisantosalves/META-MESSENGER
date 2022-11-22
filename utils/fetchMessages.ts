import { Message } from "../typings";

const fetcher = async () => {
    const responser = await fetch("/api/getMessages")
    const data = await responser.json()

    const messages: Message[] = data.messages

    return messages
}

export default fetcher