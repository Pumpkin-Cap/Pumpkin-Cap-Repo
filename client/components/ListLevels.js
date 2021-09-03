import React from "react";
import { connect } from "react-redux";
import { fetchLevels } from "../store/level";
import { Link } from "react-router-dom";
import Anime from "react-anime";
import LoadingPage from "./LoadingPage";

class ListLevels extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        openMenu: 'none',
        levelPrompt: '',
        isLoaded: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
}

  async componentDidMount() {
    await this.props.getLevels();
    this.setState({
      isLoaded: true
    })
  }

  handleClick(event){
    this.setState({openMenu: event.target.value});
  }

  handleMouseOver(event){
    this.setState({levelPrompt: event.target.id});
  }

  render() {
    const { levels } = this.props;
    const { isLoaded } = this.state
    let lastCompleted = 1;

    return (
      <div>
        {!isLoaded ? (
          <LoadingPage />
        ) : (
      <Anime duration={1000} opacity={[0,1]}>
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
                  <Link to={`/level/${level.id}`} >
                    <div className="unlocked" onMouseOver={this.handleMouseOver} id={level.prompt}>{level.name}</div>
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
        )}
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
