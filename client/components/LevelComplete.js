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
		zIndex: 10,
		width: '200px',
		height: '200px',
	},
});

export default class LevelComplete extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: true,
		};

		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.customStyles = modalStyle();

		this.subtitle = '';
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = 'rgb(39, 39, 230)';
		this.subtitle.style.fontFamily = "'Roboto Mono', monospace";
	}

	openModal() {
		this.setState({ modalOpen: true });
	}

	closeModal() {
		this.setState({ modalOpen: false });
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
					contentLabel='success modal'
					ariaHideApp={false}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignContent: 'center',
							textAlign: 'center',
							justifyContent: 'space-between',
						}}>
						<div id='success'>Success!!</div>
						<div className='lvl-desc'>Congrats you did it!</div>
						<button className='next-level' onClick={this.props.handleNextLevel}>
							Go to the next Level!
						</button>
					</div>
				</Modal>
			</>
		);
	}
}
