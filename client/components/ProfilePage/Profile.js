import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchFriends } from '../../store/user';
import { fetchAllUsers } from '../../store/allUsers';
import { fetchLevels } from '../../store/level';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
import VerifyPassword from './VerifyPassword';
import Anime from 'react-anime';
import LoadingPage from '../LoadingPage';
import ProfileLevels from './ProfileLevels';
import FriendsList from './FriendsList';
import UsersList from './UsersList';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			verified: false,
			rank: 'Cadet',
			search: '',
			isLoaded: false,
		};

		this.setVerified = this.setVerified.bind(this);
		this.setRank = this.setRank.bind(this);
		// this.grabUserAndFriends = this.grabUserAndFriends.bind(this);
		this.search = this.search.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location.key !== this.props.location.key) {
			this.props.getUser(this.props.match.params.id);
		}
		if (
			prevProps.location.key !== this.props.location.key &&
			this.state.friendList !== 'hidden'
		) {
			this.setState({ friendList: 'hidden' });
		}
	}

	async componentDidMount() {
		await this.props.getLevels();
		await this.props.getUser(this.props.match.params.id);
		await this.props.getAllUsers();
		this.setState({ isLoaded: true });

		let completedLevels = 0;
		if (this.props.user.levels && this.props.user.id)
			completedLevels = this.props.user.levels.length;

		if (completedLevels <= 5) {
			this.setRank('Cadet');
		} else if (completedLevels <= 9) {
			this.setRank('Private');
		} else if (completedLevels <= 14) {
			this.setRank('Specialist');
		} else if (completedLevels <= 16) {
			this.setRank('Code Cracker');
		} else {
			this.setRank('Senior Level Programmer');
		}
	}

	// async grabUserAndFriends(userId){
	//     console.log("this is in the function: ", userId)
	//     await this.props.getUser(userId);
	// }

	handleSearchChange(event) {
		this.setState({ search: event.target.value });
	}

	search(origiRay) {
		console.log('input in parent function ', origiRay);
		let mutaRay = [...origiRay];
		mutaRay = mutaRay.filter((element) =>
			element.username.toLowerCase().includes(this.state.search.toLowerCase())
		);
		console.log('filtered array in parent function ', mutaRay);

		return mutaRay;
	}

	setVerified(bool) {
		this.setState({ verified: bool });
	}

	setRank(currentRank) {
		this.setState({ rank: currentRank });
	}

	render() {
		let completedLevels = 0;
		if (this.props.user.levels && this.props.user.id)
			completedLevels = this.props.user.levels.length;
		const { verified, isLoaded } = this.state;
		const { levels } = this.props.user;
		const { allUsers } = this.props;
		const allLevels = this.props.levels;

		return (
			<div>
				{!isLoaded ? (
					<LoadingPage />
				) : (
					<Anime duration={6000} opacity={[0, 1]}>
						<div id='profileContainer'>
							<div id='top-profileContainer-leftSection'>
								<div className='search'>
									<form id='search-form'>
										<label htmlFor='search' className='search-input-label'>
											Search Users...
										</label>
										<input
											name='search'
											className='search-input-box'
											onChange={this.handleSearchChange}
											value={this.state.search || ''}
										/>
									</form>
								</div>
								<div id='search-list'>
									{this.state.search !== '' &&
										this.search(allUsers).map((element) => {
											return (
												<div key={element.id} id='user'>
													<Link to={`/user/${element.id}`}>
														{element.username}
													</Link>
												</div>
											);
										})}
								</div>
							</div>
							<div id='top-profileContainer'>
								<div>
									{this.props.auth.id === this.props.user.id &&
										(verified ? (
											<EditProfile setVerified={this.setVerified} />
										) : (
											<VerifyPassword setVerified={this.setVerified} />
										))}
									{this.props.auth.id !== this.props.user.id && (
										<button>Add Friend</button>
									)}
								</div>
								<div id='top-profileContainer-mainSection'>
									<h1>{this.props.user.username}</h1>
									<div style={{ fontSize: 'x-large', marginBottom: '10px' }}>
										Completion:
										{(completedLevels / this.props.levels.length) * 100} %
									</div>
									<div
										style={{
											fontSize: 'large',
											marginBottom: '20px',
											fontWeight: 'bolder',
											border: 'groove',
											padding: '3px',
										}}>
										Rank: {this.state.rank}
									</div>
									<h4
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
										}}>
										<div style={{ display: 'flex', justifyContent: 'center' }}>
											Next Level:
										</div>
										{this.props.levels[completedLevels] && (
											<div id='profile-level-link'>
												<Link to={`/level/${completedLevels + 1}`}>
													<div
														style={{
															display: 'flex',
															justifyContent: 'center',
														}}>
														{Array.isArray(levels) &&
															allLevels[levels.length + 1].category}
													</div>
													<div
														style={{
															display: 'flex',
															justifyContent: 'center',
														}}>
														{Array.isArray(levels) &&
															allLevels[levels.length].name}
													</div>
												</Link>
											</div>
										)}
									</h4>
								</div>
								<FriendsList />
							</div>
							{completedLevels !== 0 && <ProfileLevels />}
						</div>
					</Anime>
				)}
			</div>
		);
	}
}

const mapState = (state) => ({
	auth: state.auth,
	user: state.user,
	levels: state.level,
	allUsers: state.allUsers,
});

const mapDispatch = (dispatch) => ({
	getUser: (id) => dispatch(fetchUser(id)),
	getLevels: () => dispatch(fetchLevels()),

	//   getFriends: (user) => dispatch(fetchFriends(user)),
	getAllUsers: () => dispatch(fetchAllUsers()),
});

export default connect(mapState, mapDispatch)(Profile);
