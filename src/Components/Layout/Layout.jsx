import React from 'react'
import Header from './Header';
import Footer from './Footer'
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({ children, title, description, author, keywords }) => {
  return (
    <div>
      <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ width: '100%', height: '80vh', marginTop: '20px', marginBottom: '20px', background: 'linear-gradient(0deg, rgba(34,195,178,1) 13%, rgba(45,170,253,1) 71%)' }}>
        {children}
        <ToastContainer/>
      </main>

      <Footer />

    </div>
  )
}

export default Layout