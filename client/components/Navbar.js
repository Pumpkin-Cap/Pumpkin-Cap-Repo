import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Login, Signup } from './AuthForm'
import Anime from 'react-anime'
import anime from 'animejs/lib/anime.es'

const Navbar = ({handleClick, isLoggedIn, userId}) => (

    <nav>
      <div className="nav">
    <Link to="/home"><h1 style={{display: 'flex'}}>
      <Anime delay={anime.stagger(300)} translateY={[-100,0]} >
      <>Call</><div className="hidden">.</div><>of</><div className="hidden">.</div><>Coding</>
      </Anime>
      <Anime delay={1900} duration={1300} opacity={[0,1]} >
        <>:</>
      </Anime>
      <div className="hidden">.</div>
      <Anime delay={2200} duration={500} translateX={[3000,0]} easing={'linear'} >
      <>Fullstack Warfare</>
      </Anime>
      </h1></Link>
      <Anime delay={3000} duration={1500} opacity={[0,1]}>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/level/list">Levels</Link>
          <Link to={`/user/${userId}`}>Profile</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navLinks">
          {/* The navbar will show these links before you log in */}
          <Login />
          <Signup />
          {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
        </div>
      )}
      </Anime>
      </div>
    </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
