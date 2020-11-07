import React, { Component } from 'react';
import './app.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import ReactDOM from "react-dom";
import MailGetter from "../mail-getter/mail-getter";
import MailPoster from "../mail-poster/mail-poster";

class App extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={{ span: 8, offset: 2 }} className="wrapper">
                        <Row>
                            <Col xs={12} className="nav-wrapper">
                                <Navbar expand="md">
                                    <Navbar.Brand>Bulk Mailer</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-md-end justify-content-center">
                                        <Button variant="outline-dark controller" onClick={this.showCreate}>Create Template</Button>
                                        <Button variant="outline-dark controller" onClick={this.showSend}>Send Mails</Button>
                                    </Navbar.Collapse>
                                </Navbar>
                            </Col>
                            <Col xs={12} className="content-wrapper" id="content-wrapper">
                                <React.StrictMode>
                                    <MailPoster />
                                </React.StrictMode>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }

    showCreate(){
        // Create the react component place it in root
        ReactDOM.render(
            <MailPoster />,
            document.getElementById('content-wrapper')
        );
    }

    showSend(){
        // Create the react component place it in root
        ReactDOM.render(
            <MailGetter />,
            document.getElementById('content-wrapper')
        );
    }
}

export default App;
