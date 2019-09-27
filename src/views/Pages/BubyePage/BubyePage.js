import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

class BubyePage extends Component {
    constructor(props){
        super(props);
        this.state={
            flag:1
        }
        this.displayModal = this.displayModal.bind(this);
        // let audio = new Audio("background.mp3");
        // this.play = this.play.bind(this);
    }
    // componentDidMount(){
    //     this.audio.play();
    // }
    displayModal(){
        this.setState({
            flag:0
        });
    }
    render() {
        if(this.state.flag === 1){
            setTimeout(this.displayModal, 5000);
            return (
                <Container className="h-100 w-100 d-flex justify-content-center align-items-center">
                    <Row className="justify-content-center align-items-center">
                        <Col xs="12">
                            <div className="clearfix">
                                {/* <audio controls autoPlay>
                                    <source src="/background.mp3" type="audio/mpeg" />
                                </audio> */}
                                <h1>HACK[IN]</h1><br />
                                <p>
                                    Congratulations user, you've reached the end!<br /> You must feel pretty proud, and you should! <br />What you did was not easy! <br /><br /> YOU DEFEATED....
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            );
        }else{
            return(
                <Container className="h-100 w-100">
                    <Row>
                        <Col xs="4" className="justify-content-center" style={{ marginTop: "25%" }}>
                            COORDINATOR:<br />
                            SURYA PRASATH S<br />
                        </Col>
                        <Col xs="4" style={{ marginTop: "3%" }}>
                            DEVELOPERS:<br />
                            <br />Sandhya S
                            <br />Pradeep Kumar S
                            <br />Prasanth G
                            <br />Nighty
                            <br />Hemadry
                            <br />Jei 
                            <br />Ashfaaq Iqbal Irshad Mohammed
                            <br />Prachi (Iqbal Irshad Mohammed)
                            <br />Karan
                            <br />Sathwik
                            <br />Arav[IN]d 
                            <br />Niteeth
                            <br />Hari Chai 
                            <br />Suku 
                            <br />Padu
                            <br />Rahul-lleoak
                        </Col>

                        <Col xs="4" style={{ marginTop: "3%" }}>
                            TESTERS: <br />
                            <p style={{fontSize:"14px"}}>
                                <br />Aswin
                                <br />Pavan Preetham
                                <br />Thanranitharan
                                <br />Narex
                                <br />Siva Ranjan
                                <br />Adithya
                                <br />Bharathi
                                <br />Janet (Eyyyyy) Macrina
                                <br />Lingeshwaran
                                <br />Kutti Rahul
                                <br />Saroopashree
                                <br />Shreenidhi
                                <br />Sivanandham
                                <br />Thejas
                                <br />Rethink
                                <br />Aadith
                                <br />Ashwhat?
                                <br />Balaguru
                                <br />Kaushik
                                <br />Lakshmitoolongtospell
                                <br />Narendran
                                <br />Pre-Kumar
                                <br />Shuki
                                <br />Log(Yaki)
                                <br />Mohammed
                                <br />Suprise-riya
                            </p>
                        </Col>

                    </Row>
                </Container>
            );

        }
        
    }
}

export default BubyePage;