import React from 'react'
import Modal from "react-modal"
import {authenticate} from '../store'
import { Button, Input, InputLabel, Select, MenuItem, FormControl, FormControlLabel, Checkbox } from "@material-ui/core";
import { connect } from 'react-redux';
import EditProfile from './EditProfile';
import { verifyUser } from '../store/user';

const modalStyle = () => ({
    content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    width: "400px",
    height: "350px",
    },
})

class VerifyPassword extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false
        }

        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleVerifyPassword = this.handleVerifyPassword.bind(this)

        this.customStyles = modalStyle()

        this.subtitle = '';

    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = "rgb(39, 39, 230)";
        this.subtitle.style.fontFamily = "'Roboto Mono', monospace";
    }

    openModal() {
        this.setState({ modalOpen: true });
    }

    closeModal() {
        this.setState({ modalOpen: false, error: null });
    }

    async handleVerifyPassword(event) {
        event.persist()
        event.preventDefault()

        const confirmBool = await this.props.verifyUser(this.props.user.id, event.target.password.value)
        if (confirmBool) {
            this.closeModal();
            this.props.setVerified(true);
        } else {
            const codeError = { response: { data: "Invalid Password" } }
            this.setState({ error: codeError });
        }
    }



    render() {
        return (
        <>
            <button onClick={this.openModal}>Edit Profile</button>
            <Modal
                isOpen={this.state.modalOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={this.customStyles}
                contentLabel="Edit Profile Modal"
                ariaHideApp={false}
            >
                <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
                >
                <h2 ref={(_subtitle) => (this.subtitle = _subtitle)}>{this.displayName}</h2>
                <Button onClick={this.closeModal}>close</Button>
                </div>
                <form onSubmit={this.handleVerifyPassword} name={this.name}>
                    <FormControl style={{ marginTop: "50px" }}>
                    <InputLabel
                        style={{ transform: "translateX(15px)", fontSize: "12px" }}
                        id="label"
                    >
                        Verify Password
                    </InputLabel>
                    <Input
                        variant="outlined"
                        name="password"
                        type="password"
                    />
                    <>
                    <Button
                        style={{ marginTop: "50px" }}
                        type="submit"
                        variant="outlined"
                    >
                        Confirm
                    </Button>

                </>
                    <FormControl style={{ display: "flex", flexWrap: "wrap", maxWidth: "100px" }}>
                    {this.state.error && this.state.error.response && <div> {this.state.error.response.data} </div>}
                    </FormControl>
                    </FormControl>
                </form>

            </Modal>
        </>
        );
    }
}

const mapState = state => ({
    user: state.auth
})

const mapDispatch = dispatch => ({
    verifyUser: (id, enteredPass) => dispatch(verifyUser(id, enteredPass))
  })

export default connect(mapState, mapDispatch)(VerifyPassword)







