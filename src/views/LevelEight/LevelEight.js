import React, { Component } from 'react';
import { Row,Col,Modal, ModalBody, ModalHeader, Button, NavLink, Spinner } from 'reactstrap';
import { Form, FormGroup, Input,Label } from 'reactstrap';
import ReactGA from 'react-ga';
import RoomEight from 'assets/images/level8/leveleight.jpg'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'


function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_GA_ID);
    ReactGA.pageview('/leveleight');
}

class Python extends Component {
    constructor(props){
        super(props);
        this.state = {
            input : '',
            output : '',
            loading: false,
            code : `#!/usr/bin/python2

import sys

def failed():
    print "Please try again!"
    sys.exit(1)

try:
    user_password = input("Enter door password : ")
except:
    failed()

with open("password.txt") as pass_file:
    door_key = pass_file.readline().strip()
    try:
        if(user_password == int(door_key)):
            print "Door can be opened!"
    except:
        failed()
`
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRun = this.handleRun.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleRun(){
        // this.setState({
        //     output:this.state.input
        // });
        this.setState({ loading: true });
        axios({
            method: "post",
            url: "http://13.232.92.177:3000/api/compile/code",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST'
            },
            data: {
                stdin: this.state.input,
            }
        }).then(response => {
            this.setState({ loading: false });
                this.setState({
                    output:response.data.output
                })
        })
        .catch(error => {
            this.setState({ loading: false });
                toast.error("Input error");
        });
    }
    render(){
        return(
            <div class="h-100 w-100 p-4 d-flex flex-column justify-content-center">
                <Row className="p-4 h-25 w-100 d-flex justify-content-center align-self-center">
                    <Col className="h-100 w-100 d-flex justify-content-center align-items-center">
                        <Input type="textarea" style={{ height: "333px", width: "500px", fontSize: "9px", background: '#000000',resize:"none" }} readOnly name="code" id="code"  value={this.state.code}/>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Enter door password : </Label>
                            <Input type="text" name="input" id="input" value={this.state.input} onChange={this.handleChange}/>
                        </FormGroup>
                        <Button color="success" className="success text-white" onClick={this.handleRun}>{this.state.loading ? <Spinner /> : ""} Run</Button><br /><br />
                        <FormGroup>
                            <Label>Ouput</Label>
                            <Input type="text" name="output" id="output" style={{background:"black"}} value={this.state.output} onChange={this.handleChange} disabled/>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default class LevelEight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terminal: false,
            pass: '',
            modal: false,
            window: false,
            loading: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleWindow = this.toggleWindow.bind(this);
        var item = null;
        document.addEventListener('dragstart', function (e) {
            item = e.target;
            console.log(item.id);
            e.dataTransfer.setData('text', '');

        }, false);
    }
    componentDidMount() {
        this.props.changeNavigation(8)
    }
    toggle() {
        this.setState(prevState => ({
            terminal: !prevState.terminal
        }));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    toggleModal() {
        this.setState({
            modal: !this.state.modal
        })
    }
    toggleWindow() {
        this.setState({
            window: !this.state.window
        })
    }
    handleSubmit(event) {
        this.setState({ loading: true });
        axios({
            method: "post",
            url: "/api/level/completion",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            },
            data: {
                levelId: 8,
                password: this.state.pass
            }
        }).then(response => {
            this.setState({ loading: false });
            if (response.data.status === "Success") {
                toast.success(response.data.message);
                this.props.history.push('/');
            }
        })
            .catch(error => {
                this.setState({ loading: false });
                toast.error(error.response.data.message);
                if (error.response.data.message === "Auth failed. Please Login.") {
                    this.props.history.push("/");
                }
            });
        event.preventDefault();
    }
    render() {
        initializeReactGA();
        if (this.state.terminal === false) {
            return (
                <React.Fragment>
                    <div class="d-flex justify-content-center align-items-center">
                        <img src={RoomEight} alt='Room Eight' useMap='#image-door' />
                        <map name="image-door">
                            {/* <area alt="door" title="door" coords="825,279,825,512,878,541,877,271" shape="poly" onClick={this.toggle} /> */}
                            <area id="Entrance" alt="door2" title="Entrance" coords="351,307,477,516" shape="rect" onClick={this.toggleModal} />
                            <area id='terminal' alt="terminal" title="terminal" coords="229,380,304,422" shape="rect" onClick={this.toggle} />
                    
                        </map>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
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
                    </Modal>
                </React.Fragment>
            )
        } else {
            return (
                <div class='w-100 h-100'>
                    <Python onClick={this.toggle} />
                    <NavLink className="back-button" onClick={() => { this.setState({ terminal: false }) }}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} size="1x" title="Back"></FontAwesomeIcon>
                    </NavLink>
                </div>
            )
        }
    }
}
