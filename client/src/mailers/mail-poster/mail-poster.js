import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import '../mail.css';
import './mail-poster.css';
import Button from 'react-bootstrap/Button';

class MailPoster extends Component {
    async postMail() {
        // Get the title and content
        let titleDiv = document.getElementById('mailTitle');
        let subjectDiv = document.getElementById('mailSubject');
        let contentDiv = document.getElementById('mailContent');
        let title = titleDiv.value;
        let subject = subjectDiv.value;
        let content = contentDiv.value;

        // Get the variable names
        let variables = content.match(/(?<={)(.*?)(?=})/g).map(function (v) {
            return v;
        });
        console.log(variables);

        let uniqueVariables = [...new Set(variables)];

        let variableString = '';
        for (let i = 0; i < uniqueVariables.length; i++) {
            if (i === uniqueVariables.length - 1) {
                variableString += `${uniqueVariables[i]}`;
            } else {
                variableString += `${uniqueVariables[i]}, `;
            }
        }

        titleDiv.value = "";
        titleDiv.placeholder = `title was: ${title}`;

        subjectDiv.value = "";
        subjectDiv.placeholder = `subject was ${subject}`;

        contentDiv.value = "";
        contentDiv.placeholder = `variables were: ${variableString}`;

        let mailTemplate = {
            title: title,
            subject: subject,
            content: content,
            variables: uniqueVariables
        }
        let url = `http://${(/[^:]*/).exec((window.location + "").substr(7))}:9000/mail`;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(mailTemplate),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    render() {
        return (
            <div className="mail-poster">
                {alert}
                <Form>
                    <Form.Group controlId="mailTitle">
                        <Form.Control
                            type="text"
                            placeholder="Enter mail title"
                        />
                    </Form.Group>
                    <Form.Group controlId="mailSubject">
                        <Form.Control
                            type="text"
                            placeholder="Enter mail subject"
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="mailContent"
                        className="mail-content"
                    >
                        <Form.Control
                            type="text"
                            as="textarea"
                            className="post-textarea"
                            placeholder="Enter mail content"
                        />
                        <Form.Text className="text-muted">
                            Variables are declared by putting them in accolades:{' '}
                            {'{variable}'}
                        </Form.Text>
                    </Form.Group>
                </Form>
                <div className="button-wrapper">
                    <Button
                        variant="dark"
                        onClick={() => {
                            this.postMail();
                        }}
                    >
                        Post template
                    </Button>
                </div>
            </div>
        );
    }
}

export default MailPoster;
