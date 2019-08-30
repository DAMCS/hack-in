import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Typed from 'typed.js'

class TypedReactDemo extends React.Component {
    componentDidMount() {
        const { strings } = this.props;
        const options = {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 50
        };
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <div className="wrap">
                <div className="type-wrap">
                    <span
                        style={{ whiteSpace: 'pre' }}
                        ref={(el) => { this.el = el; }}
                    />
                </div>
                <a onClick={() => this.typed.start()}><i class="fa fa-play-circle" aria-hidden="true"></i></a>&nbsp;&nbsp;
                <a onClick={() => this.typed.stop()}><i class="fa fa-pause-circle" aria-hidden="true"></i></a>&nbsp;&nbsp;
                <a onClick={() => this.typed.reset()}><i class="fa fa-repeat" aria-hidden="true"></i></a>&nbsp;&nbsp;
            </div>
        );
    }
}

export default class StoryLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <a color="primary" onClick={this.toggle}><i class="fa fa-video-camera" aria-hidden="true"></i></a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}><img width="100%" src={require('./story.gif')} /></ModalHeader>
            <ModalBody>
                    <TypedReactDemo
                        strings={[
                            'Some <i>strings</i> are slanted <br/>lsjfhjkdsfh dsfjhsgj',
                            'Some <strong>strings</strong> are bold',
                            'HTML characters &times; &copy;'    
                        ]}
                    />
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
      </div>
    );
  }
}

// export default StoryLine;