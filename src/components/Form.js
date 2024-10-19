import React from 'react'

function Form({ message, setMessage, sendMessage }) {
  return (
    <div className='form'>
        <form onSubmit={sendMessage}>
          <input 
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Enter your message...'
          />
          <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default Form