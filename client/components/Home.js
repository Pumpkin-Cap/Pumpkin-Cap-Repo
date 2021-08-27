import React from 'react'
import {connect} from 'react-redux'
import anime from 'animejs/lib/anime.es.js';
import Anime from 'react-anime'


export class Home extends React.Component {

  render() {
    return (
      <Anime duration={5000} opacity={[0,1]}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
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
      <div style={{display: 'flex', justifyContent: "center"}}>
        <Anime duration={5000} translateX={[-700,-50]} easing={'linear'}>
        {!this.props.username && <img src="../generalJoe.png" className="openingOfficer"></img>}
        </Anime>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h2 style={{textAlign: "center", color: "#333D29"}}>{this.props.username && ('Welcome, ' + this.props.username + '.')}</h2>
          <h3 style={{textAlign: "center", color: "#333D29"}}>{this.props.username && (<Anime delay={1000} duration={1300} opacity={[0,1]} >
            <>Are you ready for your next mission?</>
          </Anime>)}</h3>
          <h3 style={{textAlign: "center", color: "#333D29"}}>{!this.props.username && ('LEARN TO CODE')}</h3>
          <h3 style={{textAlign: "center", color: "#333D29"}}>{!this.props.username && ('JOIN THE FIGHT')}</h3>
          <h3 style={{textAlign: "center", color: "#333D29"}}>{!this.props.username && ('DEFEAT THE EVIL DUCK ARMY!!')}</h3>
        </div>
        <Anime duration={5000} translateX={[700,50]} easing={'linear'}>
        {!this.props.username && <img src="../sargeantSarah.png" className="openingOfficer"></img>}
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
