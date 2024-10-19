import React, { useEffect } from 'react'
import { useRef } from 'react';
import { Socket } from 'socket.io-client';

export function ChatSender({ chats, user }) {
    const chatStyle = {
        backgroundColor: '#D9D9D9',
        padding: '8px',
        borderRadius: '7px',
        margin: '5px 0',
        textAlign: 'right',
        alignSelf: 'flex-end',
        maxWidth: '80%',
        wordWrap: 'break-word',
        marginLeft: 'auto',
    };

    const chatStyle1 = {
        backgroundColor: '#EFEFEF',
        padding: '8px',
        borderRadius: '7px',
        margin: '5px 0',
        textAlign: 'left',
        alignSelf: 'flex-start',
        maxWidth: '80%',
        wordWrap: 'break-word',
        marginLeft: 'auto',
    };

    const chatsRef = useRef(null);

    const scrollToBottom = () => {
        const chatsDiv = chatsRef.current;
        chatsDiv.scrollTop = chatsDiv.scrollHeight;
    }

    useEffect(() => {
        scrollToBottom();
    }, [])

    useEffect(() => {
        const chatsDiv = chatsRef.current;
        if (chatsDiv && chats.length > 0) {
          // Access the last message
          const lastMessage = chats[chats.length - 1];
          
          // Check if the last message was sent by the current user
          if (lastMessage.user === user) {
            scrollToBottom(); // Scroll to the bottom if the last message is from the current user
          }
        }
    }, [chats, user]);

  return (
    <div className='chats' ref={chatsRef} style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='chat-box'>
            {chats.length > 0 ? (
                chats.map((msg, idx) => (
                    <p key={idx} style={msg.user === user ? chatStyle : chatStyle1}><strong>{msg.user}:</strong>{msg.message}</p>
                ))
            ) : (
                <p></p>
            )}
        </div>
    </div>
  )
}
