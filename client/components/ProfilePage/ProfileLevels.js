import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../store/user";
import { fetchLevels } from "../../store/level";

class ProfileLevels extends React.Component {

    componentDidMount() {
        this.props.getLevels()
    }

    render() {
        let completedLevels = 0
        if (this.props.user.levels && this.props.user.id) (completedLevels = this.props.user.levels.length)
        const { levels } = this.props.user;

        return (

            <div>
                {completedLevels !== 0 && <div style={{marginBottom: "10px", textAlign:"center"}}>Levels Completed:</div>}
                <div id="profile-completed-levels">
                    <div className="profile-completed-level">
                    {Array.isArray(levels) && (levels.filter(element => element.category === 'Control Flow').map((element) =>(<div key={element.id}>{element.name}</div>)))}
                    <div className="profile-completed-title">Control Flow</div></div>
                    <div className="profile-completed-level">
                    {Array.isArray(levels) && (levels.filter(element => element.category === 'Loops').map((element) =>(<div key={element.id}>{element.name}</div>)))}
                    <div className="profile-completed-title">Loops</div></div>
                    <div className="profile-completed-level">
                    {Array.isArray(levels) && (levels.filter(element => element.category === 'Arrays').map((element) =>(<div key={element.id}>{element.name}</div>)))}
                    <div className="profile-completed-title">Arrays</div></div>
                    <div className="profile-completed-level">
                    {Array.isArray(levels) && (levels.filter(element => element.category === 'Objects').map((element) =>(<div key={element.id}>{element.name}</div>)))}
                    <div className="profile-completed-title">Objects</div></div>
                </div>
            </div>
        )
    }

}

const mapState = (state) => ({
  user: state.user,
  levels: state.level
});

const mapDispatch = (dispatch) => ({
  getUser: (id) => dispatch(fetchUser(id)),
  getLevels: () => dispatch(fetchLevels()),

});

export default connect(mapState, mapDispatch)(ProfileLevels);
