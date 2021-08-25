import React from 'react'
import { connect } from 'react-redux'
import { DocCSS, DocHTML, DocIMPORTS, DocMocha } from './docSections'
import level, { fetchLevel } from '../store/level';
import Editor from '@monaco-editor/react';
import Anime from 'react-anime';

class SingleLevel extends React.Component {


    constructor() {
        super()
        this.state = {
          js: '',
          doc: '',
          scale: 0
        }
        this.onChange = this.onChange.bind(this)
        this.setDoc = this.setDoc.bind(this)
      }

      async componentDidMount() {
          const currentLevel = await this.props.getLevel(this.props.match.params.id)

          if (currentLevel){
            this.setDoc()
          } else{
            this.props.history.push("/level/unauthorized")
          }
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
      this.setState({
        doc,
        scale: this.state.scale +1
      })

      }

    render () {
      const sampleCode = this.props.level.startingJS
      const level = this.props.level
        return (
          this.props.level.startingJS ?
          <div id="level">
            {(this.props.level.id) && <h2>{this.props.level.name}</h2>}
            {/* <h3>Welcome, {username}</h3> */}
            <div className="codeIframe">
              <iframe id="thing"
                srcDoc={this.state.doc}
                title="output"
                sandbox="allow-scripts allow-top-navigation"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            </div>


              <button className="runButton" onClick={this.setDoc}>Run</button>
            <div className="duckDiv">
            {level.tests && level.tests.map(test => (
              <Anime duration={3500} rotate={[0,-20,0,20,0]} scale={[this.state.scale]} loop={true} >
                <img src="../theEvilRubberDuck.png" className="evilDuck"></img>
              </Anime>
            ))}
            </div>

            <Editor
              height="50vh"
              width="75vw"
              fontsize="12px"
              value={this.state.js}
              defaultLanguage="javascript"
              theme="vs-dark"
              onChange={this.onChange}
              defaultValue={sampleCode}
              options={{
                readOnly: false,
                lineHeight: 25,
              }}
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
