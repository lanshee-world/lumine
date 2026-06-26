import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Makepayment from './components/Makepayment';
import Addproducts from './components/Addproducts';
import Notfound from './components/Notfound';
import Getproducts from './components/Getproducts';
function App() {
  return (
    <Router>
      <div className="App">
      <header className="App-header">
       <h2><i>Feel Welcome at Lumine</i></h2>
       <h3>Where we uplift your value!!</h3>
      </header>
      <nav>
        <Link to="/" className='btn btn-primary btn-sm m-1'>Home</Link>
        <Link to="/addproducts" className='btn btn-success btn-sm m-1'>Add products</Link>
        <Link to="/signin" className='btn btn-danger btn-sm m-1'>Signin</Link>
        <Link to="/signup" className='btn btn-info btn-sm m-1'>Signup</Link>
      </nav>
      <Routes>
       <Route path='/' element={<Getproducts/>}/>
       <Route path='/addproducts' element={<Addproducts/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='/makepayment' element={<Makepayment/>}/>
       <Route path='*' element={<Notfound/>}/> 
      </Routes>
    </div>
    </Router>
  );
}

export default App;
