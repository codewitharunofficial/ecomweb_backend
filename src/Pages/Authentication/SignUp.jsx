import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout';
import {toast} from 'react-toastify';

const SignUp = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(name, email, password, address, phone);
}


  return (
    <Layout title='Ecommerce App - Sign Up'>
    <div className='text' style={{ background: 'linear-gradient(0deg, rgba(34,195,178,1) 13%, rgba(45,170,253,1) 71%)', width:'auto', height:'100%', padding:'20px', marginBottom:'20px', alignItems:'center', justifyContent: 'center'}}>
    <div>
        <form onSubmit={handleSubmit} className='p-4'>
  <div className="form-row">
    <div className="form-group col-md-4">
      <label htmlFor="inputEmail4">Email</label>
      <input onChange={(e)=> setEmail(e.target.value)} type="email" value={email} className="form-control" id="inputEmail4" placeholder="Email" />
    </div>
    <div className="form-group col-md-4">
      <label htmlFor="inputPassword4">Password</label>
      <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className="form-control" id="inputPassword4" placeholder="Password" />
    </div>
    <div className="form-group col-md-4">
    <label htmlFor="inputAddress">Phone</label>
    <input onChange={(e)=> setPhone(e.target.value)} value={phone} type="number" className="form-control" id="inputAddress" placeholder="+911234567890" />
  </div>
  </div>
  
  <div className="form-group">
    <label htmlFor="inputAddress2">Address</label>
    <input onChange={(e)=> setAddress(e.target.value)} value={address} type="text" className="form-control" id="phone" placeholder="125/2, Kund-Dahina Road, khol, Rewari, Haryana " />
  </div>
  <div className="form-row">
    <div className="form-group col-md-4">
      <label htmlFor="inputCity">Name</label>
      <input onChange={(e)=> setName(e.target.value)} value={name} placeholder='Arun' type="text" className="form-control" id="inputCity" />
    </div>
  </div>
  <div className="form-group">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck" />
      <label className="form-check-label" htmlFor="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">Sign Up</button>
</form>

    </div>
    </div>
    </Layout>
  )
}

export default SignUp