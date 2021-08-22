import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../store/user'
import { fetchLevels } from '../store/level'
import { Link } from 'react-router-dom'


class Profile extends React.Component {

    componentDidMount() {
        this.props.getUser(this.props.match.params.id)
        this.props.getLevels()
    }


    render() {

        let completedLevels = 0
        if (this.props.user.id) (completedLevels = this.props.user.levels.length)

        return (
            <div id="profileContainer">
                Hello, I am a profile for {this.props.user.username}
                <div>
                Completion: {completedLevels / this.props.levels.length * 100} %
                </div>
                <div>Current Level: {this.props.levels[completedLevels] && <Link to={`/level/${completedLevels+1}`} >{this.props.levels[completedLevels].name}</Link>}</div>
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