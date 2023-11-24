import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,114,121,1) 0%, rgba(0,212,255,1) 100%)'}}>
     <h4 className='text-center'>
      All Right Reserved &copy;CodeWithArun
     </h4>
     <p className="text-center mt-3">
      <Link to='/about'>About</Link> |
      <Link to='/contact'>Contact</Link>|
      <Link to='/policy'>Privacy Policy</Link>|
     </p>
    </div>
  )
}

export default Footer