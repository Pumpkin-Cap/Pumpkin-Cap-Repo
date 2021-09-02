import React from "react";
import { connect } from "react-redux";
import { fetchUser, fetchFriends } from "../store/user";
import { fetchAllUsers } from "../store/allUsers";
import { fetchLevels } from "../store/level";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import VerifyPassword from "./VerifyPassword";
import Anime from "react-anime";
import LoadingPage from "./LoadingPage";

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            verified: false,
            rank: 'Cadet',
            friendList: 'hidden',
            search: '',
            displayName: '',
            isLoaded: false
        }

        this.setVerified = this.setVerified.bind(this);
        this.setRank = this.setRank.bind(this);
        this.grabUserAndFriends = this.grabUserAndFriends.bind(this);
        this.toggleFriends = this.toggleFriends.bind(this);
		this.search = this.search.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
        this.hideFriends = this.hideFriends.bind(this);
        this.updateDisplayName = this.updateDisplayName.bind(this);
    }

    componentDidUpdate(prevProps){
        if ((prevProps.location.key !== this.props.location.key)) { this.setState({displayName: ''})  }
        if (this.props.user.username !== this.state.displayName){
            setTimeout(this.updateDisplayName, 1000);
        }
        if ((prevProps.location.key !== this.props.location.key) && this.state.friendList !== 'hidden') { this.setState({ friendList: 'hidden' }) }
    }

    async updateDisplayName(){
        const newUser = await this.props.getUser(this.props.match.params.id);
        this.setState({displayName: newUser.username})
    }

    async componentDidMount() {
        await this.props.getLevels()
        await this.grabUserAndFriends(this.props.match.params.id);
        this.setState({ isLoaded: true })
        let completedLevels = 0
        if (this.props.user.levels && this.props.user.id) (completedLevels = this.props.user.levels.length)

        if (completedLevels <= 5){ this.setRank('Cadet'); }
        else if (completedLevels <= 9){ this.setRank('Private'); }
        else if (completedLevels <= 14){ this.setRank('Specialist'); }
        else if (completedLevels <= 16){ this.setRank('Code Cracker'); }
        else { this.setRank('Senior Level Programmer')}
    }

    async grabUserAndFriends(userId){
        await this.props.getUser(userId);
        await this.props.getFriends(this.props.user);
    }

	handleSearchChange(event) {
		this.setState({ search: event.target.value });
	}

	search(origiRay) {
		let mutaRay = [...origiRay];

		if (this.state.search !== '') {
			mutaRay = mutaRay.filter((element) => element.username.toLowerCase().startsWith(this.state.search.toLowerCase()));
		}

		return mutaRay;
	}

    setVerified(bool){
        this.setState({ verified: bool });
    }

    setRank(currentRank){
        this.setState({ rank: currentRank });
    }

    toggleFriends(){
        if (this.state.friendList === 'active') { this.setState({friendList: 'hidden'}); }
        else { this.setState({friendList: 'active'});}
    }

    hideFriends() {
        this.setState({displayName: ''});
        setTimeout(() => { this.setState({friendList: 'hidden'}) }, 500);
    }

    render() {
        let completedLevels = 0
        if (this.props.user.levels && this.props.user.id) (completedLevels = this.props.user.levels.length)
        const { verified, isLoaded } = this.state;
        const { levels, friends } = this.props.user;
        const { allUsers } = this.props;
        const allLevels = this.props.levels;

        return (
            <div>
                {!isLoaded ? (
                    <LoadingPage />
                ) : (
            <Anime duration={6000} opacity={[0,1]}>

                <div id="profileContainer">
                  <div id="top-profileContainer">
                    <div id="top-profileContainer-leftSection">
                        <div className='search'>
                            <form id='search-form'><label htmlFor='search' className='search-input-label'>Search Users...</label>
                                <input name='search' className='search-input-box' onChange={this.handleSearchChange} value={this.state.search || ''}/>
                            </form>
                        </div>
                        <div id="search-list">{this.state.search !== '' && this.search(allUsers).map((element) => { return (
									<div key={element.id} id='user'>
                                        <Link to={`/user/${element.id}`}>{element.username}</Link>
									</div>
								);})}
                        </div>
                    </div>
                    <div id="top-profileContainer-mainSection">
                        <h1>{this.state.displayName}</h1>
                        {(this.props.auth.id === this.props.user.id) && (verified ? <EditProfile setVerified={this.setVerified} /> : <VerifyPassword setVerified={this.setVerified} />) }
                        {(this.props.auth.id !== this.props.user.id) && (<button>Add Friend</button>)}
                        <h4 style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <div style={{display: "flex", justifyContent: "center"}}>Next Level:</div>
                            {this.props.levels[completedLevels] &&
                            <div id="profile-level-link"><Link to={`/level/${completedLevels+1}`}>
                                <div style={{display: "flex", justifyContent: "center"}}>{Array.isArray(levels) && allLevels[levels.length + 1].category}</div>
                                <div style={{display: "flex", justifyContent: "center"}}>{Array.isArray(levels) && allLevels[levels.length].name}</div>
                            </Link></div>}
                        </h4>
                        <div style={{fontSize: "x-large", marginBottom: "10px"}}>Completion: {completedLevels / this.props.levels.length * 100} %</div>
                        <div style={{fontSize: "large", marginBottom: "20px", fontWeight: "bolder", border: "groove", padding: "3px"}}>Rank: {this.state.rank}</div>
                    </div>
                  <div id="top-profileContainer-rightSection">
                    {this.state.friendList === 'active' ? (Array.isArray(friends) && friends.length > 0  ? ((<div><div style={{display:"flex", justifyContent:"center"}} id="friend-list-title">Friends</div><div id="friend-list">{friends.map((element) =>(<div key={element.id}onClick={this.hideFriends}><Link to={`/user/${element.id}` }>{element.username}</Link></div>))}</div></div>)) : (<div><div style={{display:"flex", justifyContent:"center"}} id="friend-list-title">Friends</div><div id="friend-list" style={{fontSize:"small"}}>You have no friends! How sad. But you can add some by searching for users and visiting their profiles.</div></div>)) : ((<div><div style={{display:"flex", justifyContent:"center"}} id="ghost-friend-list-title">Friends</div><div id="ghost-friend-list"></div></div>))}
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div className="ghost-friends-button"></div><button className="friends-button" onClick={this.toggleFriends}>{this.state.friendList === "active" ? 'Hide Friends' : 'Show Friends'}</button><div className="ghost-friends-button"></div>
                    </div>
                  </div>
                </div>
                    {completedLevels !== 0 && <div style={{marginBottom: "10px", textAlign:"center"}}>Levels Completed:</div>}
                    <div id="profile-completed-levels">
                        <div className="profile-completed-level"><div className="profile-completed-title">Control Flow</div>
                        {Array.isArray(levels) && (levels.filter(element => element.category === 'Control Flow').map((element) =>(<div key={element.id}>{element.name}</div>)))}</div>
                        <div className="profile-completed-level"><div className="profile-completed-title">Loops</div>
                        {Array.isArray(levels) && (levels.filter(element => element.category === 'Loops').map((element) =>(<div key={element.id}>{element.name}</div>)))}</div>
                        <div className="profile-completed-level"><div className="profile-completed-title">Arrays</div>
                        {Array.isArray(levels) && (levels.filter(element => element.category === 'Arrays').map((element) =>(<div key={element.id}>{element.name}</div>)))}</div>
                        <div className="profile-completed-level"><div className="profile-completed-title">Objects</div>
                        {Array.isArray(levels) && (levels.filter(element => element.category === 'Objects').map((element) =>(<div key={element.id}>{element.name}</div>)))}</div>
                    </div>
                </div>
            </Anime>
                )}
            </div>
        )
    }

}

const mapState = (state) => ({
  auth: state.auth,
  user: state.user,
  levels: state.level,
  allUsers: state.allUsers
});

const mapDispatch = (dispatch) => ({
  getUser: (id) => dispatch(fetchUser(id)),
  getLevels: () => dispatch(fetchLevels()),

  getFriends: (user) => dispatch(fetchFriends(user)),
  getAllUsers: () => dispatch(fetchAllUsers(users))

});

export default connect(mapState, mapDispatch)(Profile);
