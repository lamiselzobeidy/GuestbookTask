import React from 'react';
import './MainNavbar.css';
import Logo from './logo.png';

const MainNavbar = () => {
    const username = JSON.parse(sessionStorage.getItem('user')).name;

    return (
        <nav class="navbar navbar-light bg-light" id="navbar">
            <a class="navbar-brand" id="MainLink"><img alt="" src={Logo} width="30" height="30" className="d-inline-block align-top" />{' '}The Guest Book</a>
            <form class="form-inline">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {username}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" onClick={() => { sessionStorage.removeItem("user"); return (window.location = `/`); }}>Logout</a>
                    </div>
                </div>
            </form>
        </nav>
    )
}

export default MainNavbar;