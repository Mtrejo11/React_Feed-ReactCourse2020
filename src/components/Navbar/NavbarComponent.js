import React, { useState } from 'react'
import './Navbar.css'
import {  withRouter } from 'react-router-dom'
const NavbarComponent = (props) => {

    const [username] = useState(localStorage.getItem('username'))

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
            <h1 className="text-white cursored" onClick={()=> props.history.push('/')}>React Feed</h1>

            <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
                <ul className="navbar-nav">

                    <li className="nav-item mr-5 h5">
                            <span className='nav-link text-white text-uppercase' onClick={()=> props.history.push('/personal')}  > {username}'s posts</span>
                    </li>
                    <li className="nav-item active">
                        <button type="button" className="btn btn-danger nav-link" onClick={props.logOutHandler}><span className='text-white'>Log out</span></button>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default  withRouter(NavbarComponent) 