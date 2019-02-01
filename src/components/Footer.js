
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { Nav, Modal, Button } from 'react-bootstrap';


class Footer extends Component {
   constructor() {
        super();
        this.state = {
            showAbout: false,
            showLegal: false,
            showHelp: false
        };

        this.handleAbout = this._handleAbout.bind(this);
        this.handleLegal = this._handleLegal.bind(this);
        this.handleHelp = this._handleHelp.bind(this);
    };
    _handleAbout(){
      this.setState({
        showAbout: !this.state.showAbout
      })
    };
    _handleLegal(){
       this.setState({
        showLegal: !this.state.showLegal
      })
    };
    _handleHelp(){
       this.setState({
        showHelp: !this.state.showHelp
      })
    };
  render() {
     return(<footer className="app-footer">
        <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link href="#" onClick={this.handleAbout}> {this.props.intlData.About} </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={this.handleHelp}> {this.props.intlData.Help} </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={this.handleLegal}> {this.props.intlData.Legal} </Nav.Link>
        </Nav.Item>
      </Nav>
      <Modal show={this.state.showAbout} onHide={this.handleAbout}>
          <Modal.Header closeButton>
            <Modal.Title> {this.props.intlData.About} </Modal.Title>
          </Modal.Header>
          <Modal.Body>About .....</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleAbout}>
              {this.props.intlData.Close}
            </Button>
          </Modal.Footer>
        </Modal>
          <Modal show={this.state.showHelp} onHide={this.handleAbout}>
          <Modal.Header closeButton>
            <Modal.Title> {this.props.intlData.Help} </Modal.Title>
          </Modal.Header>
          <Modal.Body>Help .....</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHelp}>
              {this.props.intlData.Close}
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showLegal} onHide={this.handleLegal}>
          <Modal.Header closeButton>
            <Modal.Title> {this.props.intlData.Legal} </Modal.Title>
          </Modal.Header>
          <Modal.Body>Help .....</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleLegal}>
              {this.props.intlData.Close}
            </Button>
          </Modal.Footer>
        </Modal>
  </footer>)
  }
}

Footer.propTypes = {
  intlData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  intlData: state.filters.intlData
})
export default connect(mapStateToProps, {  })(Footer);
