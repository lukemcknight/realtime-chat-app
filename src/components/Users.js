import React from 'react'

function Users({ currentUsers }) {
  return (
    <div className='display-users'>
        <div className='display-users-text'>
            <h3>Current Users:</h3>
            <div className='current-users'>
                {currentUsers.length > 0 ? (
                    currentUsers.map((users, idx) => (
                        <p key={idx}>{users}</p>
                    ))
                ) : (
                    <p>No users</p>
                )
                }
            </div>
        </div>
    </div>
  )
}

export default Users