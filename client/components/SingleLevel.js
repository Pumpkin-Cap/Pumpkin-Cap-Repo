import React from 'react';
import { connect } from 'react-redux';
import { DocCSS, DocHTML, DocIMPORTS, DocMocha } from './docSections';
import level, { fetchLevel, nextLevel } from '../store/level';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Anime from 'react-anime';

class SingleLevel extends React.Component {
	constructor() {
		super();
		this.state = {
			js: '',
			doc: '',
			scale: 0,
			animationIsDone: false,
			testResults: [],
		};
		this.onChange = this.onChange.bind(this);
		this.setDoc = this.setDoc.bind(this);
		this.setAnimationDone = this.setAnimationDone.bind(this);
		this.handleNextLevel = this.handleNextLevel.bind(this);
	}

	async componentDidMount() {
		setTimeout(this.setAnimationDone, 6300);
		const userHasAccesToLevel = await this.props.getLevel(
			this.props.match.params.id
		);

		if (userHasAccesToLevel) {
			this.setDoc(true);
		} else {
			this.props.history.push('/level/unauthorized');
		}

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
	}

	// async componentDidUpdate() {

	// 	console.log('hello there')
	// 	const userHasAccesToLevel = await this.props.getLevel(
	// 		this.props.match.params.id
	// 	);

	// 	if (userHasAccesToLevel) {
	// 		this.setDoc(true);
	// 	}
	// }

	setAnimationDone() {
		this.setState({
			animationIsDone: true,
		});
	}

	onChange(newValue) {
		this.setState({
			js: newValue,
		});
	}

	async handleNextLevel() {
		await this.props.newLevel(this.props.level.id);
		this.props.history.push(`/level/${this.props.level.id}`);
		this.setState({js: this.props.level.startingJS, testResults: [], scale: 0})
		this.setDoc(true)
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
      `;
		if (canDo) {
			let scale = this.state.scale;
			if (scale >= 6) {
				scale = 6;
			} else {
				scale += 1;
			}
			this.setState({
				doc,
				scale,
			});
		}
	}

	render() {
		console.log('TEST RESULTS:', this.state.testResults);
		const sampleCode = this.props.level.startingJS;
		const level = this.props.level;
		return this.props.level.startingJS ? (
			<Anime duration={6000} opacity={[0, 1]}>
				<div id='level'>
					{this.props.level.id && (
						<div>
							<Anime
								duration={3000}
								translateX={[-1000, -500]}
								easing={'linear'}>
								<img src='../generalJoe.png' className='generalJoe'></img>
							</Anime>
							<h2>{this.props.level.name}</h2>
						</div>
					)}
					{/* <h3>Welcome, {username}</h3> */}
					<div id='codeIframe'>
						<iframe
							id='thing'
							srcDoc={this.state.doc}
							title='output'
							sandbox='allow-scripts allow-top-navigation allow-same-origin'
							frameBorder='0'
							width='100%'
							height='100%'
						/>
					</div>

					<button
						className='runButton'
						onClick={() => this.setDoc(this.state.animationIsDone)}>
						Run
					</button>
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
												src='../theDocileRubberDuck.jpg'
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
							}) && (
								<div id='popup'>
									<i id='fa fa-check'></i>
									<div id='success'>Success!!</div>
									<div id='popup-desc'>You did it!</div>
									<button className='next-level' onClick={this.handleNextLevel}>
										Go to the next Level!
									</button>
								</div>
							)}
					</div>
					<Editor
						height='50vh'
						width='75vw'
						fontsize='12px'
						value={this.state.js}
						defaultLanguage='javascript'
						theme='vs-dark'
						onChange={this.onChange}
						defaultValue={sampleCode}
						options={{
							readOnly: false,
							lineHeight: 25,
						}}
					/>
				</div>
			</Anime>
		) : null;
	}
}

const mapState = (state) => ({
	level: state.level,
});

const mapDispatch = (dispatch, { history }) => ({
	getLevel: (id) => dispatch(fetchLevel(id)),
	newLevel: (id) => dispatch(nextLevel(id, history)),
});

export default connect(mapState, mapDispatch)(SingleLevel);
