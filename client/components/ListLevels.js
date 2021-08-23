import React from "react";
import { connect } from "react-redux";
import { fetchLevels } from "../store/level";
import { Link } from "react-router-dom";

class ListLevels extends React.Component {
  componentDidMount() {
    this.props.getLevels();
  }

  render() {
    const { levels } = this.props;
    let completedUsernames = [];
    let lastCompleted = 1;
    return (
      <div className="levelListContainer">
        {Array.isArray(levels) &&
          levels.map((level) => {
            completedUsernames = level.users.map((user) => user.username);
            completedUsernames.includes(this.props.user.username) &&
              lastCompleted++;
            let levelUnlocked = false;
            if (
              lastCompleted === level.id ||
              completedUsernames.includes(this.props.user.username)
            ) {
              levelUnlocked = true;
            }

            return (
              <div className="level" key={level.id}>
                {levelUnlocked ? (
                  <Link to={`/level/${level.id}`}>
                    <div className="unlocked">Go to level {level.id}</div>
                  </Link>
                ) : (
                  <div className="locked">
                    level {level.id} Not unlocked yet
                  </div>
                )}
              </div>
            );
          })}
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.auth,
  levels: state.level,
});

const mapDispatch = (dispatch) => ({
  getLevels: () => dispatch(fetchLevels()),
});
export default connect(mapState, mapDispatch)(ListLevels);
