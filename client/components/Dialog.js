import React from 'react'
import Editor from '@monaco-editor/react';



class Dialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogIndex: 1,
            doc: this.props.level.dialogs[0].content
        }
        this.nextDialog = this.nextDialog.bind(this)
        this.setDoc = this.setDoc.bind(this)
    }

    // componentDidMount(){
    //     console.log('level: ',this.props.level)
    //     this.setState({doc: this.props.level.dialogs[0].content});

    // }

    // componentDidUpdate(prevProps){
    //     if (prevProps.level.id !== this.props.level.id){
    //         this.setState({doc: this.props.level.dialogs[0].content});
    //     }

    // }

    nextDialog(dialogs) {
        this.setState({
            dialogIndex: this.state.dialogIndex + 1
        })
        this.setState({doc: this.props.level.dialogs[this.state.dialogIndex].content})

        if (this.state.dialogIndex + 1 === dialogs.length) {
            this.props.closeDialog()
        }
    }


	setDoc() {
		const doc = `
        ${this.props.level.dialogs[this.state.dialogIndex].content}

      `
      this.setState({ doc });
      }



    render() {

        const dialogs = this.props.level.dialogs || []

        if (this.state.dialogIndex < dialogs.length) {

            return (
            <div className="dialogueBox"><Editor
            height="45vh"
            width="45vw"
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


export default Dialog




