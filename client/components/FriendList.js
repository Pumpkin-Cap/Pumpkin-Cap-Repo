import React from 'react';
import  { connect } from 'react-redux';

export class FriendList extends React.Component{
  componentDidMount() {
    this.props.getFriends()
  }
  render() {
    const { friends } = this.props
    return (
      <div>
        {friends.map(friend)}
      </div>
    )
  }
}
