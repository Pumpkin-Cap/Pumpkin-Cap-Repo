import React from 'react'
import Editor from '@monaco-editor/react';



class TutorialDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogIndex: 1,
            doc: this.props.tutorial.dialogs[0].content
        }
        this.nextDialog = this.nextDialog.bind(this)
        this.setDoc = this.setDoc.bind(this)
    }

    componentDidMount(){
        console.log('dialogue array: ', this.props.tutorial.dialogs)
    }

    nextDialog(dialogs) {
        this.setState({
            dialogIndex: this.state.dialogIndex + 1
        })
        this.setState({doc: this.props.tutorial.dialogs[this.state.dialogIndex].content})

        if (this.state.dialogIndex + 1 === dialogs.length) {
            this.props.closeDialog()
        }
    }


	setDoc() {
		const doc = `
        ${this.props.tutorial.dialogs[this.state.dialogIndex].content}

      `
      this.setState({ doc });
      }



    render() {
        const dialogs = this.props.tutorial.dialogs || []

        if (this.state.dialogIndex < dialogs.length) {
            return (
            <div><Editor
            height="75vh"
            width="75vw"
            fontsize="12px"
            value={this.state.doc}
            defaultLanguage="javascript"
            theme="vs-dark"
            options={{
              readOnly: true,
              lineHeight: 18,
              wordWrap: "on",
              wrappingIndent: "same"
            }}/>
                <button onClick={() => this.nextDialog(dialogs)} >Next</button>
            </div>
            )
        } else {
            return null
        }
    }


}


export default TutorialDialog




