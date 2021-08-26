import React, {Component} from 'react';
import Anime, { anime } from 'react-anime';

class Tutorial extends React.Component {
render() {
  let tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
  })

  tl.add({
    targets: 'section div',
    backgroundColor: 'green',
    delay: anime.stagger(100)
  })

  tl.add({
    targets: 'section div',
    width: '90%',
    backgroundColor: 'blue',
    delay: anime.stagger(100)
  })

  tl.add({
    targets: 'h1',
    top: '20%',
    opacity: 1,
    duration: 4000,

  }, '-=1600')
  return (
    <Anime>
      <h1 id='image'>The image would go here</h1>
      <section>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </section>
    </Anime>
  )
}
}

export default Tutorial
