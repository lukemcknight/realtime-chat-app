import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function LogIn() {
    const [user, setUser] = useState('');
    const [currentUsers, setCurrentUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        socket.emit('getUser')

        socket.on('receiveUser', (connectedUserList) => {
            setCurrentUsers(connectedUserList);
            console.log(connectedUserList)
        });

        return () => {
            socket.off('receiveUser');
        }
    }, [])

    const sendUsername = (e) => {
        e.preventDefault()
        if(!currentUsers.includes(user)) {
            sessionStorage.setItem("user", user)
            navigate('/chat-page')
        } else {
            console.log("Username is already taken.")
        }
    }

  return (
    <div className='login-page'>
        <h1>Vellum</h1>
        <div className='login-wrapper'>
            <form onSubmit={sendUsername}>
                <label>Username:</label>
                <input 
                    type='text'
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default LogIn