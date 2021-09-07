import React from 'react';
import { connect } from 'react-redux';
import { DocCSS, DocHTML, DocIMPORTS, DocMocha } from './docSections';
import tutorial, { fetchTutorial, nextTutorial } from '../store/tutorial';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Anime from 'react-anime';
import socket from '../socket';
import { changeCode } from '../store/code';
import TutorialComplete from './TutorialComplete';
import BottomBar from './VideoChat/BottomBar';
import TutorialDialog from './TutorialDialog';
import LoadingPage from './LoadingPage';
import TutorialDuckList from './LevelPage/TutorialDuckList';

class SingleTutorial extends React.Component {
	constructor() {
		super();
		this.state = {
			js: '',
			doc: '',
			scale: 0,
			animationIsDone: true,
			testResults: [],
			dialogOpen: true,
			isLoaded: false,
		};
		this.onChange = this.onChange.bind(this);
		this.setDoc = this.setDoc.bind(this);
		this.setAnimationDone = this.setAnimationDone.bind(this);
		this.handleNextTutorial = this.handleNextTutorial.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
	}

	async componentDidMount() {
		await this.props.getTutorial(this.props.match.params.id);

		this.setDoc(true);

		// Create IE + others compatible event handler
		var eventMethod = window.addEventListener
			? 'addEventListener'
			: 'attachEvent';
		var eventer = window[eventMethod];
		var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
		function eventFunction(e) {
			if (typeof e.data === 'string') {
				this.setState({ testResults: JSON.parse(e.data) });
			}
		}

		// Listen to message from child window
		eventer(messageEvent, eventFunction.bind(this), false);
		this.setState({ isLoaded: true });
	}

	componentDidUpdate(prevProps) {
		if (this.props.code != this.state.js) {
			this.setState({ js: this.props.code });
		}
		if (prevProps.location.key !== this.props.location.key) {
			this.props.getTutorial(this.props.match.params.id);

			this.setDoc(true);
		}
	}

	setAnimationDone() {
		this.setState({
			animationIsDone: true,
		});
	}

	onChange(newValue) {
		socket.emit('change-code', {
			roomName: this.props.room.roomName,
			userName: this.props.user.username,
			code: newValue,
		});
		this.props.changeCode(newValue);
	}

	async handleNextTutorial() {
		const nextTutorial = await this.props.newTutorial(this.props.tutorial.id);
		this.props.history.push(`/level/tutorial/${this.props.tutorial.id}`);
console.log('the next tutorial' ,nextTutorial)
		this.props.changeCode(nextTutorial.startingJS);
		this.setState({
			js: nextTutorial.startingJS,
			testResults: [],
			scale: 0,
			dialogOpen: true,
		});
		this.setDoc(true);
	}

	closeDialog() {
		this.setState({
			dialogOpen: false,
		});
	}

	setDoc(canDo) {
		const doc = `
        <html>
          <body>
          ${DocHTML(this.props.tutorial)}
          </body>
          <style>
          ${DocCSS}
          </style>
          ${DocIMPORTS}
          <script>
          ${DocMocha(this.props.tutorial)}
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
      const sampleCode = this.props.tutorial.startingJS
      const tutorial = this.props.tutorial
      const { isLoaded } = this.state
        return (
          <div>
            {!isLoaded ? (
              <LoadingPage />
            ) : (
          this.props.tutorial.startingJS ? <>
			<Anime duration={3000} translateX={[-1000, 100]} easing={'linear'}>
				<img src="../generalJoe.png" className="generalJoe"></img>
			</Anime>
			{this.state.dialogOpen ? (Array.isArray(tutorial.dialogs) ? <TutorialDialog tutorial={tutorial} closeDialog={this.closeDialog}/> : null) :
          <div id="tutorial">
            <div id="tutorial-left">
            {(this.props.tutorial.id) && <div>
                  <h2>{this.props.tutorial.name}</h2>
                  <h3>{this.props.tutorial.prompt}</h3>
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
						<button className="nextTutorialButton" onClick={() => this.handleNextTutorial()}>Next Tutorial</button>

					<div id='popbox'>
						{tutorial.tests &&
							tutorial.tests.every((test, index) => {
								if (this.state.testResults[index] === 'PASSED') {
									return true;
								}
							}) && <TutorialComplete handleNextTutorial={this.handleNextTutorial} />}
					</div>

              <Editor
                height="75vh"
                width="75vw"
                fontsize="12px"
                value={this.state.js}
                defaultLanguage="javascript"
                theme="vs-dark"
                onChange={this.onChange}
                defaultValue={sampleCode}
                options={{
                  readOnly: false,
									lineHeight: 18,
									wordWrap: "on",
									wrappingIndent: "same"
                }}
              />
          </div>
          <TutorialDuckList results={this.state.testResults} scale={this.state.scale}/>
          <BottomBar />
          </div>
          } </>  : null)}
      </div>
        )
      }
}

const mapState = (state) => ({
	user: state.auth,
	tutorial: state.tutorial,
	code: state.code,
	room: state.room,
});

const mapDispatch = (dispatch) => ({
	getTutorial: (id) => dispatch(fetchTutorial(id)),
	newTutorial: (id) => dispatch(nextTutorial(id)),
	changeCode: (code) => dispatch(changeCode(code)),
});

export default connect(mapState, mapDispatch)(SingleTutorial);
