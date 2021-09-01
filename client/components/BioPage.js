import React from 'react'
import Anime from 'react-anime'
import BioCard from './BioCard'


export class BioPage extends React.Component {

  render() {

    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
        <Anime duration={2000} translateX={[-2000,0]} easing={'linear'}>
          <BioCard name={"Stephanie Durino"} picture={"../theEvilRubberDuck.png"}  bio={"Cookie Commander, Damsel in Distraction"}/>
        </Anime>
        <Anime duration={2100} translateX={[-2200,0]} easing={'linear'}>
          <BioCard name={"James Goering"} picture={"../theDocileRubberDuck.png"}  bio={"Monaco Master, Video Visionary"}/>
        </Anime>
        <Anime duration={2200} translateX={[-2400,0]} easing={'linear'}>
          <BioCard name={"Andrew Kerr"} picture={"../theDocileRubberDuck.png"}  bio={"Curriculum Controller, Game Genie"}/>
        </Anime>
        <Anime duration={2300} translateX={[-2600,0]} easing={'linear'}>
          <BioCard name={"Vaughn Pole"} picture={"../theDocileRubberDuck.png"}  bio={"Test Tactician, Friendly Factotum"}/>
        </Anime>
      </div>
    )
  }
}

export default BioPage;
