import React, { Component } from 'react';
import './Navbar.css';
import { Navbar } from 'react-bootstrap';
import Logo from './logo.png';

const Navbarr = () => {

        return (
            <div>
                <Navbar id="navbar">
                    <Navbar.Collapse className="justify-content-center" id="logo">
                        <Navbar.Brand className="navlink mx-auto" href="#home">
                            <img alt="" src={Logo} width="30" height="30" className="d-inline-block align-top" />{' '}
                            The Guest Book
                        </Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

export default Navbarr;