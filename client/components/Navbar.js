import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Login, Signup } from './AuthForm'

const Navbar = ({handleClick, isLoggedIn, userId}) => (

    <nav>
    <Link to="/home"><h1>Call of Coding: Fullstack Warfare</h1></Link>
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
