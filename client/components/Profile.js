import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../store/user'
import { fetchLevels } from '../store/level'
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'
import VerifyPassword from './VerifyPassword'


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

        return (
            <div id="profileContainer">
                Hello, I am a profile for {this.props.user.username}
                <div>
                Completion: {completedLevels / this.props.levels.length * 100} %
                </div>
                <div>Current Level: {this.props.levels[completedLevels] && <Link to={`/level/${completedLevels+1}`} >{this.props.levels[completedLevels].name}</Link>}</div>
                {(this.props.auth.id === this.props.user.id) && (verified ? <EditProfile setVerified={this.setVerified} /> : <VerifyPassword setVerified={this.setVerified} />) }
            </div>
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
