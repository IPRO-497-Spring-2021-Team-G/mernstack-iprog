import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

// Container is the component hooked to redux
class LoginModal extends Component {
    state = {
        // Represents whether modal is open
        modal: false,
        // Form 
        email: '',
        password: '',
        // Display error message
        msg: null
    };

    // Add prop types
    static propTypes = {
        // not required, could be null
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    // Lifecycle method
    // What's prevProps??
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            // Check for a login error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear error before setting the state to open or close modal
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    // onChange takes an event parameter
    onChange = (e) => {
        // Get name from the target
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } =  this.state;

        const user = { 
            email, 
            password 
        }

        // Attempt to login
        this.props.login(user);
    };

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="mb-3"
                                onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="mb-3"
                                onChange={this.onChange}
                                />
                                <Button color="dark" style={{marginTop: '2rem'}} block>
                                    Login
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // Get values from auth reducer
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps, 
    { login, clearErrors }
    )(LoginModal);