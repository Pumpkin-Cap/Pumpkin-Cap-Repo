import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedLevel = () => {
  return (
    <div id="error">
      <h2>You cannot handle these ducks!</h2>
      <h4>Not yet.</h4>
      <img src="https://c.tenor.com/5z0_uvbBqSIAAAAC/starship-troopers-traitor-of-mars.gif" />
      <div className="error button"><Link to="/level/list"><button type="button" id="level-error-return">Get out of here! Get out of here now!</button></Link></div>
    </div>
  )
}

export default UnauthorizedLevel;
