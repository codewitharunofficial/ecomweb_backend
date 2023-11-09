// import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import About from'./Pages/About';
import Policy from './Pages/Policy';
import Contact from './Pages/Contact';
// import Layout from './Components/Layout/Layout';
import PageNoteFound from './Pages/PageNotFound';
import Login from './Pages/Authentication/Login';
import SignUp from './Pages/Authentication/SignUp';


function App() {
  return (
    <>
    <Routes>
      <Route path='/about'  element={ <About />} />
      <Route path='/policy'  element={ <Policy/> } />
      <Route path='/contact'  element={ <Contact />} />
      <Route path='*'  element={ <PageNoteFound />} />
      <Route path='/'  element={ <HomePage />} />
      <Route path='/user/login'  element={ <Login />} />
      <Route path='/user/signup'  element={ <SignUp />} />
    </Routes>
      
    </>
  );
}

export default App;
