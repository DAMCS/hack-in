import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Input } from 'reactstrap';
import ReactGA from 'react-ga';

function initializeReactGA() {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.pageview('/levelnine');
}

export default class LevelNine extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            language: 'C++',
            text: `In computer terminology, a honeypot is a computer security mechanism set to detect, deflect, or, in some manner, counteract attempts at unauthorized use of information systems. Generally, a honeypot consists of data (for example, in a network site) that appears to be a legitimate part of the site, but is actually isolated and monitored, and that seems to contain information or a resource of value to attackers, who are then blocked. This is similar to police sting operations, colloquially known as "baiting" a suspect.[1]`
        }
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }
    componentDidMount() {
		this.props.changeNavigation(9);
    }
    handleDownload() {
        //
    }

    handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
        });
    }
    
    handleUpload() {
        console.log(this.state.language);
	}
    render() {
        initializeReactGA();
        return (
            <div class="h-100 w-100 p-4 d-flex flex-column justify-content-center">
                <Row className="p-4 h-30 w-100 d-flex justify-content-center align-self-center">
                    <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                        <Input style={{background:'black', height:'250px'}} type="textarea" name="input" id="input" value={this.state.text} onChange={this.handleChange} disabled/>
                    </Col>
                </Row>
                <Row className="p-4 h-10 w-100 d-flex justify-content-center align-self-center">
                    <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                    <Button color="success" className="success text-white" onClick={this.handleDownload}> Download C++</Button>
                    </Col>
                    <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                    <Button color="success" className="success text-white" onClick={this.handleDownload}>Download Java</Button>
                    </Col>
                    <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                    <Button color="success" className="success text-white" onClick={this.handleDownload}> Download python</Button>
                    </Col>
                </Row>
                <Row className="p-4 h-10 w-50 d-flex justify-content-center align-self-center">
                    <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                        <Input type="select" name="language" value={this.state.language} onChange={this.handleChange}>
                            <option>C++</option>
                            <option>Java</option>
                            <option>Python</option>
                        </Input>&nbsp;
                        <Button color="success" className="success text-white" onClick={this.handleUpload}> Upload</Button> 
                    </Col>
                </Row>
                <Row className="p-4 h-10 w-50 d-flex justify-content-center align-self-center">
                    <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                        <Button color="success" className="success text-white" onClick={}> Sample</Button> &nbsp;
                        <Button color="success" className="success text-white" onClick={this.handleDownload}>Output</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}