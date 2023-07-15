import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import './Nav.css';

function Nav() {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();
    const transitionNavbar = () => {
        if(window.scrollY > 5) {
            handleShow(true);
        }
        else {
            handleShow(false);
        }
    }

    useEffect(()=> {
        window.addEventListener("scroll", transitionNavbar);
        return () => window.removeEventListener("scroll", transitionNavbar);
    }, [])
  return (
    <div className={`nav ${show && 'nav__black'}`}>

        <div className="nav_contents">
            <img
            onClick={() => navigate("/")}
            className='nav__logo'
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
            alt="" />
            <img
            onClick={() => navigate("/profile")}
            className='nav__avatar'
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
            alt="" />

        </div>
        
    </div>
  )
}

export default Nav