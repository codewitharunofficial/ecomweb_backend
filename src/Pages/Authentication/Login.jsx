import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
    }
  
    
  return (
    <Layout title="Ecommerce App - Log In">
        <div className='p-4 mb-4' style={{ background: 'linear-gradient(0deg, rgba(34,195,178,1) 13%, rgba(45,170,253,1) 71%)', width:'auto', height:'100%', padding:'20px', alignItems:'center', justifyContent:'center'}}>
    <div className='container' style={{width: '70%'}}>
        <form onSubmit={handleSubmit} className='p-4'>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" value={email} aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" value={password} id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary mt-3">Sign In</button>
</form>
</div>
</div>
    </Layout>
  )
}

export default Login