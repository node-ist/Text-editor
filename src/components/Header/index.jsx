import React from 'react';
import { Link } from 'react-router-dom';


const HeaderComponent = () => (
  <div className='header'>
      <Link to="/" className='title'>Text redactor</Link>
      <Link to="/about" className='link'>About</Link>
  </div>
)

export default HeaderComponent