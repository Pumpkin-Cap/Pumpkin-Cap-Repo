import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../store/user'
import { fetchLevels } from '../store/level'
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'
import VerifyPassword from './VerifyPassword'
import Anime from 'react-anime'


class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            verified: false
        }

        this.setVerified = this.setVerified.bind(this);
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.id)
        this.props.getLevels()
    }

    setVerified(bool){
        this.setState({ verified: bool });
    }

    render() {

        let completedLevels = 0
        if (this.props.user.levels && this.props.user.id) (completedLevels = this.props.user.levels.length)

        const { verified } = this.state;
        const { levels } = this.props.user;
        const allLevels = this.props.levels;

        return (

            <Anime duration={6000} opacity={[0,1]}>
                <div id="profileContainer">
                    <h1>{this.props.user.username}</h1>
                    {(this.props.auth.id === this.props.user.id) && (verified ? <EditProfile setVerified={this.setVerified} /> : <VerifyPassword setVerified={this.setVerified} />) }
                    <h2>Completion: {completedLevels / this.props.levels.length * 100} %</h2>
                    <h4 style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <div style={{display: "flex", justifyContent: "center"}}>Next Level:</div>
                        {this.props.levels[completedLevels] &&
                        <div id="profile-level-link"><Link to={`/level/${completedLevels+1}`}>
                            <div style={{display: "flex", justifyContent: "center"}}>{allLevels[levels.length + 1].category}</div>
                            <div style={{display: "flex", justifyContent: "center"}}>{allLevels[levels.length + 1].name}</div>
                        </Link></div>}
                    </h4>
                </div>
            </Anime>
        )
    }


}


const mapState = state => ({
    auth: state.auth,
    user: state.user,
    levels: state.level
})

const mapDispatch = dispatch => ({
    getUser: (id) => dispatch(fetchUser(id)),
    getLevels: () => dispatch(fetchLevels())
})


export default connect(mapState,mapDispatch)(Profile)
