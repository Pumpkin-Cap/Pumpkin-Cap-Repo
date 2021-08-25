import React from 'react'
import {connect} from 'react-redux'
import anime from 'animejs/lib/anime.es.js';
import Anime from 'react-anime'


export class Home extends React.Component {

  render() {
    return (
      <div style={{display: 'flex'}}>
        {this.props.username && ('Welcome, ' + this.props.username)}
        <Anime duration={3500} rotate={[0,-20,0,20,0]} loop={true} >
          <img src="theEvilRubberDuck.png" className="evilDuck"></img>
        </Anime>
        <Anime duration={3500} rotate={[0,20,0,-20,0]} loop={true} >
          <img src="theEvilRubberDuck.png" className="evilDuck"></img>
        </Anime>
        <Anime duration={3500} rotate={[0,-20,0,20,0]} loop={true} >
          <img src="theEvilRubberDuck.png" className="evilDuck"></img>
        </Anime>
        <Anime duration={3500} rotate={[0,20,0,-20,0]} loop={true} >
          <img src="theEvilRubberDuck.png" className="evilDuck"></img>
        </Anime>
        <Anime duration={3500} rotate={[0,-20,0,20,0]} loop={true} >
          <img src="theEvilRubberDuck.png" className="evilDuck"></img>
        </Anime>
      </div>
    )
  }
  
}

const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
