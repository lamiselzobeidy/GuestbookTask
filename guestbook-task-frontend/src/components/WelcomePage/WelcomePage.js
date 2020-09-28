import React, { useState } from 'react';
import './WelcomePage.css';
import Login from '../Login/Login';
import Registration from '../Registration/Register'
import Navbar from '../Navbar/Navbar';
import {Button} from 'react-bootstrap';

const WelcomePage = () => {

    const [state, setState] = useState(false);

    if (!state) {
        return (
            <div className="container-fluid h-100 w-100 WelcomePageContainer">
                <Navbar />
                <div className="row align-self-center h-100 w-50 mx-auto my-auto">
                    <div className="col align-self-center my-auto mx-auto RegistrationForm">
                        <div className="row h-100 w-100">
                            <div className="col col-7 my-auto h-100" style={{ backgroundColor: "white", borderRadius: "10px 0px 0px 10px" }}>
                                <Login />
                            </div>
                            <div className="col col-5 h-75 my-auto mx-auto">
                                <div className="row h-100">
                                    <div className="col align-self-center" style={{ color: "white" }}>
                                        <h3 className="w-100 mx-auto mb-3 logHeading">Hello There!</h3>
                                        <p className="mb-3">You're missing a lot, sign up now and join us in whatever we're doing.</p>
                                        <Button className="text-center SwitchButton" type="submit" onClick={() => { setState(true) }}>Sign Up</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="container-fluid h-100 w-100 WelcomePageContainer">
                <Navbar />
                <div className="row align-self-center h-100 w-50 mx-auto my-auto">
                    <div className="col align-self-center my-auto mx-auto RegistrationForm">
                        <div className="row h-100 w-100">
                            <div className="col col-7 my-auto h-100" style={{ backgroundColor: "white", borderRadius: "10px 0px 0px 10px" }}>
                                <Registration />
                            </div>
                            <div className="col col-5 h-75 my-auto mx-auto">
                                <div className="row h-100">
                                    <div className="col align-self-center" style={{ color: "white" }}>
                                        <h3 className="w-100 mx-auto mb-3 logHeading">welcome back!</h3>
                                        <p className="mb-3">To keep connected with us please login with your personnel info</p>
                                        <Button className="text-center SwitchButton" type="submit" onClick={() => { setState(false) }}>Sign IN</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WelcomePage;