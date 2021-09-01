import React from 'react'



class Dialog extends React.Component {

    constructor() {
        super()
        this.state = {
            dialogIndex: 0
        }
        this.nextDialog = this.nextDialog.bind(this)
    }

    nextDialog() {
        this.setState({
            dialogIndex: this.state.dialogIndex + 1
        })
    }


    render() {

        const dialogs = [
            "hello",
            "hi",
            "how are you?",
            "good, and you?"
        ]

        if (this.state.dialogIndex < dialogs.length) {
            return <>
                <div>{dialogs[this.state.dialogIndex]}</div>
                <button onClick={this.nextDialog} >Next</button>
                </>
        } else {
            return null
        }
    }


}


export default Dialog




