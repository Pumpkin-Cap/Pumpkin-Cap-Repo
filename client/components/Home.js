import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import Anime from 'react-anime';
import BioCard from './BioCard';

export class Home extends React.Component {
	render() {
		console.log(this.props.user);
		let nextLevel = 1;
		let levelCategory = 'Control Flow';
		let levelNumber = 1;

		if (this.props.user.levels) {
			nextLevel = this.props.user.levels.length + 1;
		}

		if (nextLevel <= 5) {
			levelNumber = nextLevel;
		} else if (nextLevel <= 9) {
			levelCategory = 'Loops';
			levelNumber = nextLevel - 5;
		} else if (nextLevel <= 14) {
			levelCategory = 'Arrays';
			levelNumber = nextLevel - 9;
		} else if (nextLevel <= 16) {
			levelCategory = 'Objects';
			levelNumber = nextLevel - 14;
		}

		return (
			// <Anime duration={5000} opacity={[0, 1]}>
			<div id='homepage'>
				<Anime duration={5000} translateX={[-700, -50]} easing={'linear'}>
					{!this.props.username && (
						<img src='../generalJoe.png' className='openingOfficer'></img>
					)}
				</Anime>
				<div className='homeContainer'>
					<h3 style={{ textAlign: 'center' }}>
						{!this.props.username &&
							'Help fight off the oncoming ducks by learning to code!'}
					</h3>
					<h3 style={{ textAlign: 'center' }}>
						{!this.props.username && 'Join the fight!'}
					</h3>
				</div>
				<Anime duration={5000} translateX={[700, 50]} easing={'linear'}>
					{!this.props.username && (
						<img src='../sargeantSarah.png' className='openingOfficer'></img>
					)}
				</Anime>
			</div>
			// {/* <div
			// style={{
			// 		display: 'flex',
			// 		justifyContent: 'center',
			// 		paddingTop: '20px',
			// 	}}>
			// 	<Anime duration={3500} rotate={[0, -20, 0, 20, 0]} loop={true}>
			// 		<img src='theEvilRubberDuck.png' className='evilDuck'></img>
			// 	</Anime>
			// 	<Anime duration={3500} rotate={[0, 20, 0, -20, 0]} loop={true}>
			// 		<img src='theEvilRubberDuck.png' className='evilDuck'></img>
			// 	</Anime>
			// 	<Anime duration={3500} rotate={[0, -20, 0, 20, 0]} loop={true}>
			// 		<img src='theEvilRubberDuck.png' className='evilDuck'></img>
			// 	</Anime>
			// 	<Anime duration={3500} rotate={[0, 20, 0, -20, 0]} loop={true}>
			// 		<img src='theEvilRubberDuck.png' className='evilDuck'></img>
			// 	</Anime>
			// 	<Anime duration={3500} rotate={[0, -20, 0, 20, 0]} loop={true}>
			// 		<img src='theEvilRubberDuck.png' className='evilDuck'></img>
			// 	</Anime>
			// </div> */}
			// {/* <div
			// 	style={{
			// 		display: 'flex',
			// 		justifyContent: 'center',
			// 	}}>
			// 	<div id='homepage'>
			// 		<Anime duration={5000} translateX={[-700, -50]} easing={'linear'}>
			// 			{!this.props.username && (
			// 				<img src='../generalJoe.png' className='openingOfficer'></img>
			// 			)}
			// 		</Anime>
			// 		<div style={{ display: 'flex', flexDirection: 'column' }}>
			// 			<h2 style={{ textAlign: 'center', color: '#333D29' }}>
			// 				{this.props.username && 'Welcome, ' + this.props.username + '.'}
			// 			</h2>
			// 			<h3 style={{ textAlign: 'center', color: '#333D29' }}>
			// 				{this.props.username && (
			// 					<div>
			// 						<Anime delay={1200} duration={1500} opacity={[0, 1]}>
			// 							<>Are you ready for your next mission?</>
			// 						</Anime>
			// 						<Anime delay={2000} duration={2000} opacity={[0, 1]}>
			// 							<div
			// 								style={{ display: 'flex', justifyContent: 'center' }}>
			// 								<Link to={`/level/${nextLevel}`}>
			// 									<div
			// 										className='unlocked'
			// 										style={{
			// 											padding: '0px',
			// 											marginTop: '20px',
			// 											height: '120px',
			// 										}}>
			// 										<h2>{levelCategory}</h2>
			// 										<h4 style={{ marginBottom: '20px' }}>
			// 											Level {levelNumber}
			// 										</h4>
			// 									</div>
			// 								</Link>
			// 							</div>
			// 						</Anime>
			// 					</div>
			// 				)}
			// 			</h3>

			// 			<h3 style={{ textAlign: 'center' }}>
			// 				{!this.props.username &&
			// 					'Help fight off the oncoming ducks by learning to code!'}
			// 			</h3>
			// 			<h3 style={{ textAlign: 'center' }}>
			// 				{!this.props.username && 'Join the fight!'}
			// 			</h3>
			// 			<Anime duration={5000} translateX={[700, 50]} easing={'linear'}>
			// 				{!this.props.username && (
			// 					<img
			// 						src='../sargeantSarah.png'
			// 						className='openingOfficer'></img>
			// 				)}
			// 			</Anime>
			// 		</div>
			// 	</div>
			// 	{/* {!this.props.username && (
			// 	<div
			// 		style={{
			// 			display: 'flex',
			// 			justifyContent: 'center',
			// 			marginTop: '20px',
			// 		}}>
			// 		<Anime duration={6000} translateX={[-7000, 0]} easing={'linear'}>
			// 			<BioCard
			// 				name={'Stephanie Durino'}
			// 				picture={'../womanCommander.jpeg'}
			// 				bio={"Hello, I'm a bio"}
			// 			/>
			// 		</Anime>
			// 		<Anime duration={6100} translateX={[-7200, 0]} easing={'linear'}>
			// 			<BioCard
			// 				name={'James Goering'}
			// 				picture={'../womanCommander.jpeg'}
			// 				bio={"Hello, I'm a bio"}
			// 			/>
			// 		</Anime>
			// 		<Anime duration={6200} translateX={[-7400, 0]} easing={'linear'}>
			// 			<BioCard
			// 				name={'Andrew Kerr'}
			// 				picture={'../womanCommander.jpeg'}
			// 				bio={"Hello, I'm a bio"}
			// 			/>
			// 		</Anime>
			// 		<Anime duration={6300} translateX={[-7600, 0]} easing={'linear'}>
			// 			<BioCard
			// 				name={'Vaughn Pole'}
			// 				picture={'../womanCommander.jpeg'}
			// 				bio={"Hello, I'm a bio"}
			// 			/>
			// 		</Anime>
			// 	</div>
			// )}
			// </div> */}
			// </Anime>
		);
	}
}

const mapState = (state) => {
	return {
		username: state.auth.username,
		user: state.auth,
	};
};

export default connect(mapState)(Home);
