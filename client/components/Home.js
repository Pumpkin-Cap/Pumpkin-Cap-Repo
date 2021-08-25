import React from 'react'
import {connect} from 'react-redux'
import anime from 'animejs/lib/anime.es.js';
import Anime from 'react-anime'


export class Home extends React.Component {

  render() {
    return (
      <Anime duration={6000} opacity={[0,1]}>
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
      </Anime>
    )
  }
  
}

const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
