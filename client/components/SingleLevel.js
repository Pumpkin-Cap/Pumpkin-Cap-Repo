import React from 'react';
import { connect } from 'react-redux';
import { DocCSS, DocHTML, DocIMPORTS, DocMocha } from './docSections';
import level, { fetchLevel, nextLevel } from '../store/level';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Anime from 'react-anime';
import socket from '../socket';
import { changeCode } from '../store/code';
import LevelComplete from './LevelComplete';
import BottomBar from './BottomBar';
import Dialog from './Dialog';
import LoadingPage from './LoadingPage';


class SingleLevel extends React.Component {


    constructor() {
        super()
        this.state = {
			js: '',
			doc: '',
			scale: 0,
			animationIsDone: true,
			testResults: [],
			dialogOpen: true,
      isLoaded: false
        }
        this.onChange = this.onChange.bind(this)
        this.setDoc = this.setDoc.bind(this)
        this.setAnimationDone = this.setAnimationDone.bind(this)
		this.handleNextLevel = this.handleNextLevel.bind(this);
		this.closeDialog = this.closeDialog.bind(this)
      }

      async componentDidMount() {
        //   setTimeout(this.setAnimationDone, 6300);
          const userHasAccesToLevel = await this.props.getLevel(this.props.match.params.id)

          if (userHasAccesToLevel){
            this.setDoc(true)
          } else{
            this.props.history.push("/level/unauthorized")
          }

          // Create IE + others compatible event handler
          var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
          var eventer = window[eventMethod];
          var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
          function eventFunction(e) {
            if (typeof e.data === 'string') {
              this.setState({testResults: JSON.parse(e.data)})
            }
          }

          // Listen to message from child window
          eventer(messageEvent,eventFunction.bind(this),false);
          this.setState({ isLoaded: true });
      }

      componentDidUpdate() {
        if (this.props.code != this.state.js) {
          this.setState({js: this.props.code})
        }
      }

      setAnimationDone() {
        this.setState({
          animationIsDone: true
        })
      }

      onChange(newValue) {
        socket.emit('change-code', {roomName: this.props.room.roomName, userName: this.props.user.username, code: newValue})
        this.props.changeCode(newValue)
      }



	async handleNextLevel() {
		const nextLevel = await this.props.newLevel(this.props.level.id);
		this.props.history.push(`/level/${this.props.level.id}`);

    this.props.changeCode(nextLevel.startingJS);
		this.setState({
			js: nextLevel.startingJS,
			testResults: [],
			scale: 0,
			dialogOpen: true
		});
		this.setDoc(true);
	}

	closeDialog() {
		this.setState({
			dialogOpen: false
		})
	}


	setDoc(canDo) {
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
        if (canDo) {
          let scale = this.state.scale
          if (scale >= 8) {
            scale = 8
          } else {
            scale += 1
          }
          this.setState({
            doc,
            scale
          })
        }
      }

    render () {
      const sampleCode = this.props.level.startingJS
      const level = this.props.level
      const { isLoaded } = this.state
        return (
          <div>
            {!isLoaded ? (
              <LoadingPage />
            ) : (
          this.props.level.startingJS ? <>
			<Anime duration={3000} translateX={[-1000, 100]} easing={'linear'}>
				<img src="../generalJoe.png" className="generalJoe"></img>
			</Anime>
			{this.state.dialogOpen && <Dialog closeDialog={this.closeDialog}/>}
          <div id="level">
            {(this.props.level.id) && <div>
                  <h2>{this.props.level.name}</h2>
                  <h3>{this.props.level.prompt}</h3>
                  </div>}
            <div id="codeIframe">
              <iframe id="thing"
                srcDoc={this.state.doc}
                title="output"
                sandbox="allow-scripts allow-top-navigation allow-same-origin"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            </div>

            <button className="runButton" onClick={() => this.setDoc(this.state.animationIsDone)}>Run</button>

					<div className='duckDiv'>
						{level.tests &&
							level.tests.map((test, index) => {
								if (this.state.testResults[index] === 'PASSED') {
									return (
										<Anime
											duration={3000}
											rotate={[0, 20, 0, -20]}
											loop={true}
											direction={'alternate'}>
											<img
												src='../theDocileRubberDuck.png'
												className='goodDuck'></img>
										</Anime>
									);
								} else {
									return (
										<Anime
											duration={3000}
											rotate={[0, -20, 0, 20]}
											scale={[this.state.scale]}
											loop={true}
											direction={'alternate'}>
											<img
												src='../theEvilRubberDuck.png'
												className='evilDuck'></img>
										</Anime>
									);
								}
							})}
					</div>

					<div id='popbox'>
						{level.tests &&
							level.tests.every((test, index) => {
								if (this.state.testResults[index] === 'PASSED') {
									return true;
								}
							}) && <LevelComplete handleNextLevel={this.handleNextLevel} />}
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

			<BottomBar />
          </div> </> : null
            )}
      </div>
        )
      }
}

const mapState = state => ({
	user: state.auth,
    level: state.level,
    code: state.code,
	room: state.room
})

const mapDispatch = dispatch => ({
    getLevel: (id) => dispatch(fetchLevel(id)),
	newLevel: (id) => dispatch(nextLevel(id)),
    changeCode: (code) => dispatch(changeCode(code))
})


export default connect(mapState, mapDispatch)(SingleLevel);
