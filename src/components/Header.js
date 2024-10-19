import React from 'react'

function Header({ user }) {
  return (
    <div className='chat-header'>
      <div className='chat-title'>
        <h1>Vellum</h1>
      </div>
      <div className='chat-username-display'>
        <h2>Username: {user}</h2>
      </div>
    </div>
  )
}

export default Header