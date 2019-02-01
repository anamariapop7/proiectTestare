import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login, logout } from '../store/actions/authActions';

import { Modal, Button, Form } from 'react-bootstrap';


class LoginBtn extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            username: localStorage.getItem("username") || undefined,
            password: localStorage.getItem("password") || undefined
        };

        this.handleClose = this._handleClose.bind(this);
        this.openLoginModal = this._openLoginModal.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleChange = this._handleChange.bind(this);
        this.handleLogout = this._handleLogout.bind(this);
    };
    _openLoginModal() {
        this.setState({ show: true });
    };
    _handleClose() {
        this.setState({ show: false });
    };
    _handleChange(evt) {
        var that = this;
        that.setState({
            [evt.target.name]: evt.target.value
        });
    };
    _handleSubmit() {
        localStorage.setItem('isLoggedIn', true);
        this.setState({
            show: false,
            isLoggedIn: true
        })
        
    };
    _handleLogout() {
       // logout({
       //      isLoggedIn: false, 
       //      username: this.state.username,
       //      password: this.state.password
       //  })
        localStorage.removeItem('isLoggedIn', true);
        this.setState({
            isLoggedIn: false
        })
    };
    render() {
        const { isLoggedIn } = this.state;

        let content = null;
        if (isLoggedIn) {
            content = ( <Button variant="outline-warning" style={{marginRight: 10}} onClick={this.handleLogout}> {this.props.intlData.Logout} </Button>)
        } else {
            content = (<div>
        
            <Button variant="outline-warning" style={{marginRight: 10}} onClick={this.openLoginModal}> {this.props.intlData.Login} </Button>
           <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> {this.props.intlData.Login} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label> {this.props.intlData.Username} </Form.Label>
                  <Form.Control type="text" name="username" defaultValue={this.state.username} onChange={this.handleChange}/>
                  <Form.Text className="text-muted">
                   {this.props.intlData.HelpTextLogin}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label> {this.props.intlData.Password} </Form.Label>
                  <Form.Control type="password" name="password" defaultValue={this.state.password} onChange={this.handleChange}/>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={this.handleClose}>
                {this.props.intlData.Cancel}
              </Button>
              <Button variant="outline-warning" onClick={this.handleSubmit}>
                {this.props.intlData.Login}
              </Button>
            </Modal.Footer>
          </Modal>
          </div>)
        }
        return (<div className="login-wrapper">
        {content}
        </div>

        );
    }
}

LoginBtn.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired ,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  intlData: state.filters.intlData
});

export default connect(mapStateToProps, { login, logout})(LoginBtn);