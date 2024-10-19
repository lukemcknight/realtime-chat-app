import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Header from './Header';
import { ChatSender } from './Chat';
import Form from './Form';
import Users from './Users';

const socket = io.connect('http://localhost:5000');

function ChatContainer() {
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState(() => {
        try {
            const storedChats = sessionStorage.getItem("chats");
            return storedChats ? JSON.parse(storedChats) : []; 
        } catch (error) {
            console.error("Error parsing chats from sessionStorage:", error);
            return []; 
        }
    });
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [currentUsers, setCurrentUsers] = useState([]);

    useEffect(() => {
        socket.emit('getUser', user);
        
        socket.on('receiveUser', (connectedUserList) => {
            setCurrentUsers(connectedUserList);
        });

        socket.on('userDisconnected', (disconnectedUser) => {
            setCurrentUsers(prevUsers => prevUsers.filter(user => user !== disconnectedUser))
        })

        return () => {
            socket.off('receiveUser');
            socket.off('userDisconnected');
        }
    }, [socket, user])

    useEffect(() => {
        socket.on('receiveMessage', (newMessage) => {
            const updatedChats = [...chats, newMessage.message]; 
            setChats(updatedChats);
            sessionStorage.setItem("chats", JSON.stringify(updatedChats)); 
        });

        return () => socket.off('receiveMessage'); 
    }, [chats]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {  
            socket.emit('sendMessage', { user, message });
            setMessage(''); 
        }
    };

    return (
      <div className='chat-page'>
        <Header user={user} />
        <ChatSender chats={chats} user={user} />
        <Form message={message} setMessage={setMessage} sendMessage={sendMessage} />
        <Users currentUsers={currentUsers} />
      </div>
    );
}

export default ChatContainer;

