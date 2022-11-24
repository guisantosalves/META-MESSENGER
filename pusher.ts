import Pusher from "pusher";
import ClientPusher from "pusher-js"

/*
    basically pusher will make a verification of what in database changes and change the all store
    in swr
*/

// pusher -> server
export const serverPusher = new Pusher({
    appId: "1513213",
    key: "12aeea28cbf24366feb1",
    secret: "d95d722979b52e52c3d3",
    cluster: "us2",
    useTLS: true
})

// ClientPusher -> client
export const clientPusher = new ClientPusher('12aeea28cbf24366feb1', {
    cluster: 'us2',
    forceTLS: true,
})