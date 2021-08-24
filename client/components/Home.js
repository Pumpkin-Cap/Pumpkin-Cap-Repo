import React from 'react'
import {connect} from 'react-redux'


export class Home extends React.Component {

  render() {
    return (
      <div>
        {this.props.username && ('Welcome, ' + this.props.username)}
      </div>
    )
  }
  
}

const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
