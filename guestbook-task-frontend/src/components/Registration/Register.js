import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Register.css';

const Registeration = (props) => {
    const userData = {
        name: '',
        email: '',
        password: '',
    };
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello form submission");
        userData.name = name;
        userData.email = email;
        userData.password = password;
        console.log(userData);
        axios.post('http://localhost:9000/users/register', userData)
            .then(result => {
                console.log(result.data)
                sessionStorage.setItem("user", JSON.stringify(userData));
                return (window.location = `/homepage`);
            });
    }
    return (

        <div className="row h-100">
            <div className="col align-self-center">
                <div className="row h-100 w-100 mx-auto text-center">
                    <h3 className="w-100 mx-auto text-center logHeading">Create Account</h3>
                </div>
                <div className="row">
                    <Form className="h-100 px-3 py-3 mx-auto w-75" noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Control className="fontAwesome FormInput" type="text" placeholder="&#xf2bd; Name" name="name" value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control className="fontAwesome FormInput" type="email" placeholder="&#xf0e0; Email Address" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control className="fontAwesome FormInput" type="password" placeholder="&#xf0eb; Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <div id="btn" className="text-center">
                            <Button type="submit">Sign Up</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Registeration;