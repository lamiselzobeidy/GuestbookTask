import React from 'react';
import './MainNavbar.css';
import Logo from './logo.png';

const MainNavbar = () => {
    const username = JSON.parse(sessionStorage.getItem('user')).name;

    return (
        <nav className="navbar navbar-light bg-light" id="navbar">
            <a className="navbar-brand" id="MainLink"><img alt="" src={Logo} width="30" height="30" className="d-inline-block align-top" />{' '}The Guest Book</a>
            <form className="form-inline">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {username}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" onClick={() => { sessionStorage.removeItem("user"); return (window.location = `/`); }}>Logout</a>
                    </div>
                </div>
            </form>
        </nav>
    )
}

export default MainNavbar;