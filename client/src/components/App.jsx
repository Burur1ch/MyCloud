import React from 'react';
import Navbar from "./Navbar/Navbar";
import './app.css'
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Registration from "./registration/Registration";
import Login from './registration/Login';
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";

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
                {!isAuth &&
                <Routes>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
                {/* <Route path="/registration" element={Registration}/> */}
            </Routes>
                }
                  
              </div>
          </div>
      </Router>
  );
}


export default App;
