import * as React from 'react'

// component
import MessageList from './MessageList';
import ChatInput from './ChatInput';

function HomePage() {
    return(
        <main>
            {/* message list */}
            <MessageList />

            {/* chat input */}
            <ChatInput />
        </main>
    )
}

export default HomePage;