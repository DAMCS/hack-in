import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Typed from 'typed.js';
import ReactTerminal from 'react-terminal-component';
import { EmulatorState, FileSystem, OutputFactory, Outputs, History,defaultCommandMapping,CommandMapping} from 'javascript-terminal';
import {Form,FormGroup,Input} from 'reactstrap';
export default class LevelTwo extends Component{
    constructor(props){
        super(props);
        this.state={
            pass:''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        if(this.state.pass == 'pass'){
            alert('Success');
        }
    }
    componentDidMount(){
        const strings=["Look here...we got a terminal!!!"]
        const options = {
            strings: strings,
            typeSpeed: 30
        };
        this.typed = new Typed(this.el, options);
    }
    componentWillUnmount() {
        this.typed.destroy();
    }
    render(){
        let customState = EmulatorState.create({
            'fs': FileSystem.create({
                '/home': {},
                '/bin': {},
                '/bin/passwd': { content: 'You are not allowed to access this file' },
                '/etc': {},
                '/Network': {},
                '/NetWork/netstat':{content : 'You are not allowed to access this file'},
                '/OS': {},
                '/OS/boot':{content : 'Contains boot information'},
                '/home/README': { content: 'This is a text file' },
                '/home/users/hacker': {},
                '/home/user/hacker/passwd': { content: 'You fool!!!'},
                '/etc/passwd':{content : "Does'nt work like unix :)"}
            }),
            'commandMapping': CommandMapping.create({
                ...defaultCommandMapping,
                'man': {
                    'function': (state, opts) => {
                        let code="Hackin: All basic linux comands are supported!!!"
                        return {
                            output: OutputFactory.makeTextOutput(code)
                        };
                    },
                    'optDef': {}
                },
                'sudo': {
                    'function': (state, opts) => {
                        let code = "Hackin: You are not a super user"
                        return {
                            output: OutputFactory.makeTextOutput(code)
                        };
                    },
                    'optDef': {}
                },
                'run': {
                    'function': (state, opts) => {
                        const input = opts.join(' ');
                        let code = ''
                        if (input === "passwd") {
                            code = 'A*&^vdcvW$'
                        } else if (input === '') {
                            code = 'Please give a filename'
                        }
                        else {
                            code = 'Wrong file'
                        }
                        return {
                            output: OutputFactory.makeTextOutput(code)
                        };
                    },
                    'optDef': {}
                }
            })
        });
        const defaultOutputs = customState.getOutputs();

        const newOutputs = Outputs.addRecord(
            defaultOutputs, OutputFactory.makeTextOutput(
                `Welcome Hacker to TERMINAL`
            )
        );
        customState = customState.setOutputs(newOutputs);
        const defaultHistory = customState.getHistory();
        const newHistory = History.recordCommand(defaultHistory, 'history');
        customState = customState.setHistory(newHistory);
        return(
            <React.Fragment>
                <div class="h-100 w-100 d-flex flex-column justify-content-center">
                    <Row className="d-flex justify-content-center align-self-center mb-4">
                        <Col>
                            <span
                                style={{ whiteSpace: 'pre' }}
                                ref={(el) => { this.el = el; }}
                            />
                        </Col>
                    </Row>
                    <Row className="h-100 w-100 border border-primary d-flex mx-auto my-auto align-self-center" >
                        <Col>
                            <ReactTerminal theme={
                                {
                                    background: 'black',
                                    promptSymbolColor: '#00de4a',
                                    commandColor: '#00de4a',
                                    outputColor: '#00de4a',
                                    errorOutputColor: '#FF0000',
                                    fontSize: '1.1rem',
                                    spacing: '1%',
                                    fontFamily: 'monospace',
                                    width: '100%',
                                    height: '100%'
                                }
                            } promptSymbol='guest@Hackin>' emulatorState={customState} clickToFocus autoFocus={false}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <FormGroup>
                                    <Input value={this.state.value} onChange={this.handleChange} type="password" name="pass" placeholder="Pascode" />
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}