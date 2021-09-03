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

        const dialogs = [
            `It’s important to understand how to compare values. We will often want to do different things depending on if something is greater than, less than, or equal to another value.`,
            `In JavaScript, these conditional operators are written like this:

            Less than:				<
            Less than or equal to:		<=
            Equal to:				===
            Not equal to:			!==
            Greater than:			>
            Greater than or equal to:		>=
            `,
            `And always remember the documentation is there if you need it!`
        ]

        if (this.state.dialogIndex < dialogs.length) {
            return <div style={{backgroundColor: 'blanchedalmond'}}>
                    <div>{dialogs[this.state.dialogIndex]}</div>
                    <button onClick={() => this.nextDialog(dialogs)} >Next</button>
                </div>
        } else {
            return null
        }
    }


}


export default Dialog




