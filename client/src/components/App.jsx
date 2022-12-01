import React, { useEffect } from 'react';
import Navbar from "./Navbar/Navbar";
import './app.css'
import {BrowserRouter as Router,Routes, Route,Navigate} from "react-router-dom";
import Registration from "./registration/Registration";
import First from "./FirstPage/First";
import Login from './registration/Login';
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";
import Disk from './disk/Disk';

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(auth())
    }, [])

  return (
    
      <Router>
          <div className='app'>
              <Navbar/>
              <div className="wrap">
              {!isAuth ? (
          <Routes>
            <Route path='/' element={<First/>}/>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Disk />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
        )}
        
                  
              </div>
          </div>
      </Router>
  );
}


export default App;
