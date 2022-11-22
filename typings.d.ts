// generally we need to set the data types when we want to send and get data.

export type Message = {
    id: string;
    message: string;
    created_at: number;
    username: string;
    profilePic: string;
    email: string;
}