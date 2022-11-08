import React from 'react';
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { logout } from '../../reducers/userReducer';
const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} style={{ height: '40px' }} alt="" className="navbar__logo"/>
                <div className="navbar__header">DISK CLOUD</div>
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Login</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Sign up</NavLink></div>}
                {isAuth && <div className="navbar__registrat" onClick={()=>dispatch(logout())}>Выход</div>}
            </div>
        </div>
    );
};

export default Navbar;