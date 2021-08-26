import React from "react";
import { connect } from "react-redux";
import { fetchLevels } from "../store/level";
import { Link } from "react-router-dom";
import Anime from "react-anime";

class ListLevels extends React.Component {
  componentDidMount() {
    this.props.getLevels();
  }

  render() {
    const { levels } = this.props;
    let lastCompleted = 1;
    return (

      <Anime duration={6000} opacity={[0,1]}>
      <div className="levelListContainer">
        {Array.isArray(levels) &&
          levels.map((level) => {
            level.users.length > 0 && lastCompleted++;
            let levelUnlocked = false;
            if (
              lastCompleted === level.id ||
              level.users.length > 0
            ) {
              levelUnlocked = true;
            }

            return (
              <div className="levelCard" key={level.id}>
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
      </Anime>
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
