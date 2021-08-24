import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div id="error">
      <h2>Where even are you?</h2>
      <h4>This page doesn't exist.</h4>
      <img src="https://theiapolis.com/d8/hRC/iKTW/k9/lMFP/w1GS/casper-van-dien-johnny-rico-and-denise-richards.jpg" />
      <div className="error button"><Link to="/home"><button type="button" id="home-error-return">Return to Home Territory</button></Link></div>
    </div>
  )
}

export default PageNotFound;
