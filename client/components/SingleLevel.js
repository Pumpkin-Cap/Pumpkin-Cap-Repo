import React from 'react'
import { connect } from 'react-redux'
import { DocCSS, DocHTML, DocIMPORTS, DocMocha } from './docSections'
import { fetchLevel } from '../store/level';
import ace from "ace-builds"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";


class SingleLevel extends React.Component {


    constructor() {
        super()
        this.state = {
          js: '',
          doc: ''
        }
        this.onChange = this.onChange.bind(this)
        this.setDoc = this.setDoc.bind(this)
      }
  
      async componentDidMount() {
          await this.props.getLevel(this.props.match.params.id)
          this.setDoc()
      }

      onChange(newValue) {
        this.setState({
          js: newValue
        })
      }

      setDoc() {
        const doc = `
        <html>
          <body>
          ${DocHTML(this.props.level)}
          </body>
          <style>
          ${DocCSS}
          </style>
          ${DocIMPORTS}
          <script>
          ${DocMocha(this.props.level)}
          ${this.state.js}
          </script>
        </html>
      `
        console.log(doc)
      this.setState({
        doc
      })

      }

    render () {
      console.log(this.props.level);
      const sampleCode = this.props.level.startingJS
        return (
          this.props.level.startingJS ?
          <div>
            {(this.props.level.id) && <div>{this.props.level.name}</div>}
            {/* <h3>Welcome, {username}</h3> */}
            <div className="pane">
              <iframe id="thing"
                srcDoc={this.state.doc}
                title="output"
                sandbox="allow-scripts allow-top-navigation"
                frameBorder="0"
                width="100%"
                height="100%"
              />
              <button onClick={this.setDoc}>Run</button>
            </div>
            <AceEditor
                setOptions={{ useWorker: false }}
                mode="javascript"
                theme="github"
                onChange={this.onChange}
                name="unique_id"
                style={{height:'250px'}}
                editorProps={{ $blockScrolling: true }}
                defaultValue={`${this.props.level.startingJS}`}
            />
          </div> : null
        )
      }



}


const mapState = state => ({
    level: state.level
})

const mapDispatch = dispatch => ({
    getLevel: (id) => dispatch(fetchLevel(id))
})


export default connect(mapState, mapDispatch)(SingleLevel)
