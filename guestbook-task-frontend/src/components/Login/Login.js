import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Login.css';


const Signin = (props) => {
    const userData = {
        name: '',
        email: '',
        password: '',
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello from submission");
        userData.name = "";
        userData.email = email;
        userData.password = password;
        console.log(userData);
        axios.post('http://localhost:9000/users/login', userData)
            .then(result => {
                if (result.data.error) {
                    console.log("error");
                } else {
                    userData.name = result.data.name
                    sessionStorage.setItem("user", JSON.stringify(result.data));
                    console.log(sessionStorage.getItem('user'));
                    return (window.location = `/homepage`);
                }
            });
    }

    return (
        <div className="row h-100">
            <div className="col align-self-center">
                <div className="row h-100 w-100 mx-auto text-center">
                    <h3 className="w-100 mx-auto text-center logHeading">Hello Again</h3>
                </div>
                <div className="row">
                    <Form className="h-100 px-3 py-3 mx-auto w-75" noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control className="fontAwesome FormInput" type="email" placeholder="&#xf0e0; Email Address" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control className="fontAwesome FormInput" type="password" placeholder="&#xf0eb; Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <div id="btn" className="text-center">
                            <Button type="submit">Sign In</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Signin;