import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import ListLevels from './components/ListLevels';
import Profile from './components/ProfilePage/Profile';
import SingleLevel from './components/SingleLevel';
import UnauthorizedLevel from './components/UnauthorizedLevel';
import PageNotFound from './components/PageNotFound';
import BioPage from './components/BioPage'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {/* {isLoggedIn ? ( */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Home} />
            <Route path="/level/list" component={ListLevels} />
            <Route path="/level/tutorial/:id" component={SingleLevel} />
            {/* With the way it's currently coded, all new '/level/...' routes must be above unauthorized. :id is ok because it bypasses unauthorized if authorized */}
            <Route path="/level/unauthorized" component={UnauthorizedLevel} />
            <Route path="/level/:id" component={SingleLevel} />
            <Route path="/user/:id" component={Profile} />
            <Route path="/aboutTheAuthor" component={BioPage} />
            <Route component={PageNotFound} />
            <Redirect to="/home" />
          </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
