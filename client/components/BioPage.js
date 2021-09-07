import React from 'react'
import Anime from 'react-anime'
import BioCard from './BioCard'


export class BioPage extends React.Component {

  render() {

    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
        <Anime duration={2000} translateX={[-2000,0]} easing={'linear'}>
          <BioCard name={"Stephanie Durino"} picture={"../steph.jpg"}  bio1={"CSS Commander"} bio2={"Damsel in Distraction"}/>
        </Anime>
        <Anime duration={2100} translateX={[-2200,0]} easing={'linear'}>
          <BioCard name={"James Goering"} picture={"../james.jpg"}  bio1={"Monaco Master"} bio2={"Video Visionary"}/>
        </Anime>
        <Anime duration={2200} translateX={[-2400,0]} easing={'linear'}>
          <BioCard name={"Andrew Kerr"} picture={"../andrew.jpg"}  bio1={"Captain Curriculum"} bio2={"Game Genie"}/>
        </Anime>
        <Anime duration={2300} translateX={[-2600,0]} easing={'linear'}>
          <BioCard name={"Vaughn Pole"} picture={"../vaughn_pole.jpeg"}  bio1={"Test Tactician"} bio2={"Friendly Factotum"}/>
        </Anime>
      </div>
    )
  }
}

export default BioPage;
