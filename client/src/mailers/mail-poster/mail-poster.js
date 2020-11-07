import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import '../mail.css';
import './mail-poster.css';
import Button from 'react-bootstrap/Button';

class MailPoster extends Component {
    render() {
        return (
            <div className="mail-poster">
                <Form>
                    <Form.Group controlId="mailTitle">
                        <Form.Control
                            type="text"
                            placeholder="Enter mail title"
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="mailContent"
                        className="mail-content"
                    >
                        <Form.Control
                            type="text"
                            as="textarea"
                            placeholder="Enter mail content"
                        />
                        <Form.Text className="text-muted">
                            Variables are declared by putting them in accolades:{' '}
                            {'{variable}'}
                        </Form.Text>
                    </Form.Group>
                </Form>
                <div className="button-wrapper">
                    <Button variant="dark">Post template</Button>
                </div>
            </div>
        );
    }
}

export default MailPoster;
