import React, { Component } from 'react';
import '../mail.css';
import './mail-getter.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'


class MailGetter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            chosenTitle: "",
        }
    }

    async componentDidMount() {
        this.fetchData()
            .then((state) => this.setState(state))
    }

    render(){
        let {templates, chosenTitle} = this.state;
        let div, titleSelector;
        if(templates.length === 0){
            div = (<p>Loading...</p>)
        } else {
            // Get available titles
            let templateTitles = [];
            for (let i in templates){
                let template = templates[i];
                templateTitles.push(<option value={template._id}>{template.title}</option>)
            }

            titleSelector = (<div className="template-selector">
                                    <Form.Control id="template-selector" as="select" custom onChange={() => {this.changePreview()}}>
                                        {templateTitles}
                                    </Form.Control>
                                </div>)

            let index = -1;
            // Check whether an id is identified
            if(chosenTitle === "")
                index = 0;

            // Get the index
            for(let i in templates){
                if(templates[i]._id === chosenTitle){
                    index = i;
                    break;
                }
            }

            let template = templates[index];
            let variables = []
            template.variables.forEach((elem)=>{
                variables.push(<Form.Group as={Col} md="4">
                    <Form.Control
                        required
                        type="text"
                        id={elem}
                        onChange={() => {this.changeMail()}}
                        placeholder={elem}
                    />
                </Form.Group>)
            })


            div = (<div className="mail-variables">
                <Form.Row>
                    <Form.Group as={Col} md="12">
                        <Form.Row>
                            <Form.Control
                                required
                                type="text"
                                id="subject"
                                value={template.subject}
                            />
                        </Form.Row>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Control
                            required
                            type="text"
                            id="username"
                            placeholder="Mail-address"
                            className="credentials"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Control
                            required
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="credentials"
                        />
                    </Form.Group>
                    {variables}
                </Form.Row>
                <Form.Row className="text-row">
                    <Form.Group
                        class="send-wrapper"
                        controlId="mailContent"
                        className="mail-content"
                    >
                        <Form.Control
                            type="text"
                            as="textarea"
                            id="mail"
                            className="send-textarea"
                            value={template.content}
                        />
                    </Form.Group>
                </Form.Row>
                <div className="button-wrapper">
                    <Button
                        variant="dark"
                        onClick={() => {
                            this.postMail();
                        }}
                    >
                        Send mail
                    </Button>
                </div>
                </div>)
        }
        return(<div>
            {titleSelector}
            {div}
        </div>)
    }

    changePreview(){
        let form = document.getElementById("template-selector");
        let value = form.value
        this.setState({
            chosenTitle: value
        })
    }

    changeMail(){
        let mailDiv = document.getElementById("mail");
        let { templates, chosenTitle } = this.state;
        // Get the index
        let index = 0;
        for(let i in templates){
            if(templates[i]._id === chosenTitle){
                index = i;
                break;
            }
        }

        let template = templates[index];

        // Get the variables
        let mail = template.content;
        template.variables.forEach(function(elem){
            while(mail.includes(`{${elem}}`)){
                let elemValue = document.getElementById(elem).value
                if(elemValue !== ""){
                    mail = mail.replace(`{${elem}}`, elemValue)
                } else {
                    break;
                }
            }
        })
        mailDiv.value = mail
    }

    async fetchData(){
        let url = `http://${(/[^:]*/).exec((window.location + "").substr(7))}:9000/mail`;

        let data = await fetch(url)
            .then(response => response.json())

        this.setState({
            templates: data
        })
    }
}

export default MailGetter;