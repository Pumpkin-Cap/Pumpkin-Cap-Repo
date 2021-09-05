import React from 'react'



class Dialog extends React.Component {

    constructor() {
        super()
        this.state = {
            dialogIndex: 0,
        }
        this.nextDialog = this.nextDialog.bind(this)
    }

    nextDialog(dialogs) {
        this.setState({
            dialogIndex: this.state.dialogIndex + 1
        })

        if (this.state.dialogIndex + 1 === dialogs.length) {
            this.props.closeDialog()
        }
    }



    render() {
        console.log(this.props.level)
        const dialogs = this.props.level.dialogs || []

        if (this.state.dialogIndex < dialogs.length) {
            return <div className="dialogueContainer">
                    <div className="dialogue">{dialogs[this.state.dialogIndex].content}</div>
                    <button onClick={() => this.nextDialog(dialogs)}>Next</button>
                </div>
        } else {
            return null
        }
    }


}


export default Dialog




