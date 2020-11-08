import React, { Component } from 'react';
import './app.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import MailGetter from '../mailers/mail-getter/mail-getter';
import MailPoster from '../mailers/mail-poster/mail-poster';

const components = {
    getter: <MailGetter />,
    poster: <MailPoster />,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMode: 'getter',
        };
    }

    getComponent(currentMode) {
        return components[currentMode];
    }

    toggleComponent(nextMode) {
        this.setState({
            currentMode: nextMode,
        });
    }

    render() {
        let { currentMode } = this.state;

        return (
            <Container>
                <Row>
                    <Col xs={{ span: 10, offset: 1 }} className="wrapper">
                        <Row>
                            <Col xs={12} className="nav-wrapper">
                                <Navbar
                                    expand="md"
                                    className="align-items-center"
                                >
                                    <Navbar.Brand>Bulk Mailer</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse
                                        id="basic-navbar-nav"
                                        className="justify-content-md-end justify-content-center"
                                    >
                                        <Button
                                            variant="outline-dark controller"
                                            onClick={() =>
                                                this.toggleComponent('poster')
                                            }
                                            id="poster"
                                        >
                                            Create Template
                                        </Button>
                                        <Button
                                            variant="outline-dark controller"
                                            onClick={() =>
                                                this.toggleComponent('getter')
                                            }
                                            id="getter"
                                        >
                                            Send Mails
                                        </Button>
                                    </Navbar.Collapse>
                                </Navbar>
                            </Col>
                            <Col
                                xs={12}
                                className="content-wrapper"
                                id="content-wrapper"
                            >
                                <React.StrictMode>
                                    {this.getComponent(currentMode)}
                                </React.StrictMode>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
