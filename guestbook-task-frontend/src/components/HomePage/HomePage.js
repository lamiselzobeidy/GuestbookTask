import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Form, Button, Tabs, Tab, Row, Alert } from 'react-bootstrap';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shortid from 'shortid';
import axios from 'axios';

const Homepage = () => {
    const [msgText, setMsgText] = useState('');
    const [MsgFlag, SetMsgFlag] = useState(false);
    const [MsgState, SetMsgState] = useState('');
    const [MsgFlagSuccess, SetMsgFlagSuccess] = useState(false);
    const [MsgStateSuccess, SetMsgStateSuccess] = useState('');
    const [messages, setMessages] = useState([]);
    const [replyText, setReply] = useState('');

    useEffect(() => {
        axios.get('http://localhost:9000/messages')
            .then(result => {
                setMessages(result.data);
            })
    }, []);

    const handleChange = event => {
        setMsgText(event.target.value)
    };

    const handleChangeEdited = (message, e) => {
        var array = [...messages];
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === message.id) {
                array[i].text = e.target.value;
                const data = { id: array[i].id, text: e.target.value }
                axios.post('http://localhost:9000/messages/editmessage', data)
                    .then(result => {
                        console.log(result.data)
                    });
            }
        }
        setMessages(array)
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(JSON.parse(sessionStorage.getItem('user')).name)
        addMessage({
            id: shortid.generate(),
            text: msgText,
            sender: JSON.parse(sessionStorage.getItem('user')).name,
            editing: false
        })
        setMsgText('')
    }

    const addMessage = message => {
        setMessages([message, ...messages])
        const data = { id: message.id, sender: message.sender, text: message.text }
        axios.post('http://localhost:9000/messages/addmessage', data)
            .then(result => {
                if (result.data.error) {
                    console.log(result.data.error);
                    SetMsgFlag(true);
                    SetMsgState(result.data.error);
                }
                else{
                    console.log(result.data.status);
                    SetMsgFlagSuccess(true);
                    SetMsgStateSuccess(result.data.status);
                }
            });
    };

    // const addReply = message => {
    //     setMessages([message, ...messages])
    //     const data = { id: message.id, sender: message.sender, text: message.text }
    //     axios.post('http://localhost:9000/messages/addmessage', data)
    //         .then(result => {
    //             if (result.data.error) {
    //                 return result.data
    //             }
    //         });
    // };

    const deleteMessage = (deletedmsg, e) => {
        console.log(messages);
        const data = { id: deletedmsg.id, text: deletedmsg.text }
        axios.post('http://localhost:9000/messages/deletemessage', data)
            .then(result => {
                console.log(result.data)
            });
        setMessages(messages.filter(function (message) {
            return message.id !== deletedmsg.id
        }))
    }

    const editMessage = (message, e) => {
        var array = [...messages];
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === message.id) {
                array[i].editing = true;
            }
        }
        setMessages(array)
    }

    const doneEditing = message => {
        var array = [...messages];
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === message.id) {
                array[i].editing = false;
            }
        }
        setMessages(array)
    }

    return (
        <div className="homepage px-5 pt-5 mx-auto">
            <div className=" homepagetabs pt-1 pl-1 pr-1 pb-2 w-75 mx-auto">
                <Tabs className="" defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="New Message">
                        <Form className="messageform mx-3 my-3 px-3 py-3" onSubmit={handleSubmit} >
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Message</Form.Label>
                                <Form.Control value={msgText} onChange={handleChange} placeholder="enter a new message.." />

                            </Form.Group>
                            {
                            MsgFlag ?
                                <Alert variant="danger" onClose={() => SetMsgFlag(false)}>
                                    <p>{MsgState}</p>
                                </Alert>
                                :
                                null
                        }
                        {
                            MsgFlagSuccess ?
                            <Alert variant="success" onClose={() => SetMsgFlagSuccess(false)} dismissible>
                                    <p>{MsgStateSuccess}</p>
                                </Alert>
                                :
                                null
                        }
                            <div className="text-center">
                                <Button variant="primary" type="submit">send</Button>
                            </div>
                        </Form>
                    </Tab>
                    <Tab eventKey="profile" title="View Messages">
                        <ul className="messages my-3 mr-3">
                            {messages.map(message => (
                                <li key={message.id} className="pl-2 pt-3">
                                    {message.editing ?
                                        <div>
                                            <h6 className="col-9 msgdetail" >Message Sender: {message.sender}</h6>
                                            <input type="text msgdetail" value={message.text} onChange={(e) => handleChangeEdited(message, e)} />
                                            <div className="text-center mt-2"><Button variant="primary" type="submit" onClick={() => doneEditing(message)}>Done</Button></div>
                                        </div>
                                        :
                                        <div>
                                            <Row >
                                                <h6 className="col-10 msgdetail">Message Sender: {message.sender}</h6>
                                                <Button style={{ width: '40px' }} className="mr-1" onClick={(e) => editMessage(message, e)} ><FontAwesomeIcon icon={faEdit} /></Button>
                                                <Button style={{ width: '40px' }} onClick={(e) => deleteMessage(message, e)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </Row>
                                            <p className="msgdetail">{message.text}</p>
                                            {/* <ul className="replies">
                                                {message.replies.map(reply => (
                                                    <li key={reply.id} className="pl-2 pt-3">
                                                        <h6>{reply.sender}</h6>
                                                        <p>{reply.text}</p>
                                                    </li>
                                                ))}
                                            </ul> */}
                                        </div>
                                    }
                                </li>
                            ))}
                        </ul>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default Homepage;