import React from 'react';
import './style.scss'

const Header = () => {
  return (
    <div className='header'>
      <p>Employee Dashboard</p>
        <input type="text" placeholder='Search...' />
    </div>
  )
}

export default Header