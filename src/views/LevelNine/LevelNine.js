import React, { Component } from 'react';
import { Row, Col, Button, Input ,NavLink } from 'reactstrap';
import ReactGA from 'react-ga';
import RoomNine from 'assets/images/level9/levelnine.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

function initializeReactGA() {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.pageview('/levelnine');
}

export default class LevelNine extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            language: 'C++',
            text: `In computer terminology, a honeypot is a computer security mechanism set to detect, deflect, or, in some manner, counteract attempts at unauthorized use of information systems. Generally, a honeypot consists of data (for example, in a network site) that appears to be a legitimate part of the site, but is actually isolated and monitored, and that seems to contain information or a resource of value to attackers, who are then blocked. This is similar to police sting operations, colloquially known as "baiting" a suspect.[1]`,
            terminal: false
        }
        this.toggle = this.toggle.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
		this.props.changeNavigation(9);
    }

    toggle() {
		this.setState(prevState => ({
			terminal: !prevState.terminal
		}));
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
        var oFReader = new FileReader();
        console.log(document.getElementById("upload"))
        oFReader.readAsDataURL(document.getElementById("upload").files[0]);
        oFReader.onload = oFREvent => {

            var contents = oFREvent.target.result;

            var text = contents.split(',');
            text = text[1];

            // var language = this.state.language;
            console.log(text);
            // axios.post('https://hack-a-venture.psglogin.in/botwar.php', {
            //     data: text,
            //     lang: language,
            //     game: "Proximity"
            // }, function (data) {
            //     console.log(data);
            //     Stop_splash();
            //     displayOutput(data);

            // });
        }
    }
    
    render() {
        initializeReactGA();
        if (this.state.terminal === false) {
            return (
                <React.Fragment>
                    <div class="d-flex justify-content-center align-items-center">
                        <img src={RoomNine} alt='Room Nine' useMap='#image-door' />
                        <map name="image-door">
                            <area alt="window" title="window" coords="511,427,440,382" shape="rect" onClick={this.toggle} />
                        </map>
                    </div>
                    {/* <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader>Enter the Passcode</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Input value={this.state.pass} onChange={this.handleChange} type="password" name="pass" placeholder="passcode" />
                                </FormGroup>
                                <Button color="success" disabled={this.state.loading} type="submit" className="success text-white">{this.state.loading ? <Spinner /> : ""} Submit</Button>&nbsp;
								<Button color="danger" onClick={this.toggleModal} className="danger text-white">Close</Button>
                            </Form>
                        </ModalBody>
                    </Modal> */}
                </React.Fragment>
            );
        }else {
            return (
                <div class="h-100 w-100 p-4 d-flex flex-column justify-content-center">
                    <Row className="p-4 h-30 w-100 d-flex justify-content-center align-self-center">
                        <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                            <Input style={{ background: 'black', height: '250px' }} type="textarea" name="input" id="input" value={this.state.text} onChange={this.handleChange} disabled />
                        </Col>
                    </Row>
                    <Row className="p-1 h-10 w-100 d-flex justify-content-center align-self-center">
                        <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                            <Button color="success" className="success text-white" onClick={() => { return window.open("/cpp.zip") }}> Download C++</Button>
                        </Col>
                        <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                            <Button color="success" className="success text-white" onClick={() => { return window.open('/user_defined_bot.java') }}>Download Java</Button>
                        </Col>
                        <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                            <Button color="success" className="success text-white" onClick={() => { return window.open('/player2.py') }}> Download python</Button>
                        </Col>
                    </Row>
                    <Row className="p-4 h-10 w-50 d-flex justify-content-center align-self-center">
                        <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                            <Input type="select" name="language" value={this.state.language} onChange={this.handleChange}>
                                <option>C++</option>
                                <option>Java</option>
                                <option>Python</option>
                            </Input>&nbsp;
                        </Col>
                        <Col className="h-100 w-100 d-flex justify-content-center align-items-center" >
                            <Input type="file" style={{ opacity: "0", position: 'absolute' }} id="upload" name="file-upload" onChange={this.handleUpload} />
                            <p style={{ marginLeft: '10px', marginTop: '15px' }}>
                                Upload
                            </p>
                        </Col>
                    </Row>
                    <Row className="p-1 h-10 w-100 d-flex justify-content-center">
                        <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                            <Button color="success" className="success text-white" onClick={() => { return window.open('/sample.html') }}> Sample</Button> &nbsp;
                            <Button color="success" className="success text-white" onClick={this.handleDownload}>Output</Button>
                        </Col>
                    </Row>
                    <Row className="p-1 h-10 w-100 d-flex justify-content-center">
                        <Col className="h-50 w-100 d-flex justify-content-center align-items-left">
                            <NavLink className="back-button" onClick={() => { this.setState({ terminal: false }) }}>
                                <FontAwesomeIcon icon={faChevronCircleLeft} size="1x" title="Back"></FontAwesomeIcon>
                            </NavLink>
                        </Col>
                    </Row>
                    
                </div>);
            }
    }
}