import React from "react";
import { connect } from "react-redux";
import { fetchLevels } from "../store/level";
import { Link } from "react-router-dom";
import Anime from "react-anime";

class ListLevels extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        openMenu: 'none',
        levelPrompt: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
}

  componentDidMount() {
    this.props.getLevels();
  }

  handleClick(event){
    this.setState({openMenu: event.target.value});
  }

  handleMouseOver(event){
    this.setState({levelPrompt: event.target.value});
  }

  render() {
    const { levels } = this.props;
    let lastCompleted = 1;

    return (

      <Anime duration={6000} opacity={[0,1]}>
        <div id="level-menu">
          <div id="level-topics">
            <button className="topic-card" onClick={this.handleClick} value="Tutorials">Tutorials</button>
            <button className="topic-card" onClick={this.handleClick} value="Control Flow">Control Flow</button>
            <button className="topic-card" onClick={this.handleClick} value="Loops">Loops</button>
            <button className="topic-card" onClick={this.handleClick} value="Arrays">Arrays</button>
            <button className="topic-card" onClick={this.handleClick} value="Objects">Objects</button>
          </div>

          <div id="level-list-menu">

          {Array.isArray(levels) && levels.filter(element => element.category === this.state.openMenu).map((level) => {
            level.users.length > 0 && lastCompleted++;
            let levelUnlocked = false;
            if ( lastCompleted === level.id || level.users.length > 0 ) { levelUnlocked = true; }

            return (
              <div className="levelCard" key={level.id}>
                {levelUnlocked ? (
                  <Link to={`/level/${level.id}`} onMouseOver={this.handleMouseOver} value={level.prompt}>
                    <div className="unlocked">{level.name}</div>
                  </Link>
                ) : (
                  <div className="locked">
                    <div  style={{color: "#A9A9A9"}}>{level.name}</div><div><i style={{fontSize: "small", color: "#A9A9A9"}}>Locked</i></div>
                  </div>
                )}
              </div>
            );
          })}

          </div>

          {this.state.levelPrompt !== '' ? (<div id="level-description">{this.state.levelPrompt}</div>) : (<div id="ghost-level-description"></div>)}
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
