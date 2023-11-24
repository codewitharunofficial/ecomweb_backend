import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {FaShopify} from 'react-icons/fa';

const Header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,114,121,1) 0%, rgba(0,212,255,1) 100%)'}}>
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
  <Link className="navbar-brand" to="/"> <FaShopify />Ecommerce App</Link>
    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/user/signup">SignUp</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/user/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/cart">Cart(0)</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/categories" id="navbarDropdownMenuLink" aria-expanded="false">
          Categories
        </NavLink>
      </li>
    </ul>
  </div>
</nav>

    
    
    </>
  )
}

export default Header