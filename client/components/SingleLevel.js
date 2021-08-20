import React from 'react'
import { connect } from 'react-redux'
import { DocCSS, DocHTML, DocIMPORTS, DocMocha } from './docSections'
import { fetchLevel } from '../store/level';
import ace from "ace-builds"
import AceEditor from "react-ace";

// ace.config.setModuleUrl('ace/mode/php_worker', require('../../node_modules/ace-builds/src-noconflict/worker-php.js'))
// ace.config.setModuleUrl('ace/mode/php_json', require('../../node_modules/ace-builds/src-noconflict/worker-json.js'))
// ace.config.setModuleUrl('ace/mode/php_javascript', require('../../node_modules/ace-builds/src-noconflict/worker-javascript.js'))
// ace.config.setModuleUrl('ace/mode/javascript', require('../../node_modules/ace-builds/src-noconflict/mode-javascript.js'))
// ace.config.setModuleUrl('ace/mode/javascript_worker', require('../../node_modules/ace-builds/src-noconflict/worker-javascript.js'))
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/webpack-resolver";
// import "ace-builds/src-noconflict/javascript_worker";


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
    
      componentDidMount() {
          this.props.getLevel(this.props.match.params.id)
      }
    
      onChange(newValue) {
        this.setState({
          js: newValue
        })
        // console.log("LEVEL ON PROPS: ", this.props);
      }
    
      setDoc() {
        const doc = `
        <html>
          <body>
          ${DocHTML}
          </body>
          <style>
          ${DocCSS}
          </style>
          ${DocIMPORTS}
          <script>
          ${DocMocha()}
          ${this.state.js}
          </script>
        </html>
      `
    
      this.setState({
        doc
      })
    
      }
      
    render () {
        return (
        
    
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
            />
          </div>
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
