import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'
import Home from './Components/Home'
import Register from './Components/Register'
import Logout from './Components/Logout'




function App() {
  return (
<BrowserRouter>
            <Routes>
                
                <Route  index path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>}/>
                  
                <Route path="/register" element={<Register/>}/>
                <Route path="/logout" element={<Logout/>}/>

                

                
            </Routes>
        </BrowserRouter>


    );
}

export default App;
