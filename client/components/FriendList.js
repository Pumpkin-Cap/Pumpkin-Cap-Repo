import React from 'react';
import  { connect } from 'react-redux';

export class FriendList extends React.Component{
  componentDidMount() {
    this.props.getFriends()
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}
