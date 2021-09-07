import React from 'react';
import { Link } from 'react-router-dom';

const WinPage = () => {
  return (
    <div id="error">
      <h2>Thanks for playing!</h2>
      <h4>But our princess is in another castle</h4>
      <img src="https://www.zeldadungeon.net/wp-content/uploads/2013/04/Navi-leaves-Link1-e1365597582359.png" />
      <div className="win button"><Link to="/home"><button type="button" id="home-win-return">Another quest will start from here</button></Link></div>
    </div>
  )
}

export default WinPage;
