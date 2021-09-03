import React from 'react';
import Modal from 'react-modal';
import { authenticate } from '../store';
import {
	Button,
	Input,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import { connect } from 'react-redux';
// import { toast } from 'react-toastify';
// import modalStyle from './modalStyle';

const modalStyle = () => ({
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		zIndex: 20,
		width: '400px',
		height: '350px',
		backgroundColor: '#c4c4c4',
		borderWidth: '10px',
		borderColor: '#8a8a8a',
		borderStyle: 'ridge',
	},
});

class AuthForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
		};

		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleLogin = this.handleLogin.bind(this);

		this.customStyles = modalStyle();

		if (props.name === 'signup') this.customStyles.content.height = '420px';

		this.subtitle = '';

		this.name = props.name;
		this.displayName = props.displayName;
		this.handleSubmit = props.handleSubmit;
		this.error = props.error;
	}

	async handleLogin(event) {
		event.persist();
		event.preventDefault();

		const formName = event.target.name;
		const username = event.target.username.value;
		const password = event.target.password.value;

		// let email = ''
		// if (event.target.email) email = event.target.email.value

		if (username === '' || password === '') {
			const nameError = { response: { data: 'All fields required' } };
			this.setState({ error: nameError });
		} else {
			await this.props.authen(username, password, formName);

			if (!this.props.error) {
				this.closeModal();
				// toast.success(`Logged in as ${username}`, {position: toast.POSITION.TOP_CENTER, autoClose: 1500})
			} else {
				this.setState({
					error: this.props.error,
				});
			}
		}
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#000';
		this.subtitle.style.fontFamily = "'Roboto Mono', monospace";
	}

	openModal() {
		this.setState({ modalOpen: true });
	}

	closeModal() {
		this.setState({ modalOpen: false, error: null });
	}

	// modalForm() {
	render() {
		return (
			<>
				<a onClick={this.openModal}>{this.displayName}</a>
				<Modal
					isOpen={this.state.modalOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={this.customStyles}
					contentLabel='Login Modal'
					ariaHideApp={false}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<h2 ref={(_subtitle) => (this.subtitle = _subtitle)}>
							{this.displayName}
						</h2>
						<Button onClick={this.closeModal}>close</Button>
					</div>
					<form
						onSubmit={this.handleLogin}
						name={this.name}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						{/* {this.name === 'signup' && <FormControl style={{ marginTop: "50px" }}>
                    <InputLabel
                        style={{ transform: "translateX(15px)", fontSize: "12px" }}
                        id="label"
                    >
                        Email
                    </InputLabel>
                    <Input
                        variant="outlined"
                        name="email"
                    />
                    </FormControl>} */}
						<FormControl style={{ marginTop: '50px' }}>
							<InputLabel
								style={{ transform: 'translateX(15px)', fontSize: '12px' }}
								id='label'>
								Username
							</InputLabel>
							<Input variant='outlined' name='username' />
						</FormControl>

						<FormControl style={{ marginTop: '50px' }}>
							<InputLabel
								style={{ transform: 'translateX(15px)', fontSize: '12px' }}
								id='label'>
								Password
							</InputLabel>
							<Input variant='outlined' name='password' type='password' />
							<Button
								style={{ marginTop: '50px' }}
								type='submit'
								variant='outlined'>
								{this.displayName}
							</Button>
							<FormControl
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									maxWidth: '100px',
								}}>
								{this.state.error && this.state.error.response && (
									<div> {this.state.error.response.data} </div>
								)}
							</FormControl>
						</FormControl>
					</form>
				</Modal>
			</>
		);
	}
}

const mapLogin = (state) => ({
	name: 'login',
	displayName: 'Login',
	error: state.auth.error,
});

const mapSignup = (state) => ({
	name: 'signup',
	displayName: 'Sign up',
	error: state.auth.error,
});

const mapDispatch = (dispatch) => ({
	authen: (username, password, formName) =>
		dispatch(authenticate(username, password, formName)),
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
