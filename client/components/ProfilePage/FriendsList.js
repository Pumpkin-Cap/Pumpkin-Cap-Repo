import React from 'react';
import  { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class FriendsList extends React.Component{

  constructor(props) {
      super(props)
      this.state = {
          friendList: 'hidden',
      }

      this.toggleFriends = this.toggleFriends.bind(this);
      this.hideFriends = this.hideFriends.bind(this);
  }

  toggleFriends(){
    if (this.state.friendList === 'active') { this.setState({friendList: 'hidden'}); }
    else { this.setState({friendList: 'active'});}
  }

  hideFriends() {
    this.setState({displayName: ''});
    setTimeout(() => { this.setState({friendList: 'hidden'}) }, 500);
  }



  render() {
    const friends = this.props.user.friends
    return (
      <div id="top-profileContainer-rightSection">
        {this.state.friendList === 'active' ? (
          Array.isArray(friends) && friends.length > 0  ? ((
          <div>
            <div style={{display:"flex", justifyContent:"center"}} id="friend-list-title">Friends</div>
            <div id="friend-list">{friends.map((element) => (
              <div key={element.id}onClick={this.hideFriends}>
                <Link to={`/user/${element.id}` }>{element.username}</Link>
                </div>))}
              </div>
            </div>)
            ) : (
            <div>
              <div style={{display:"flex", justifyContent:"center"}} id="friend-list-title">Friends</div>
              <div id="friend-list" style={{fontSize:"small"}}>You have no friends! How sad. But you can add some by searching for users and visiting their profiles.</div>
            </div>)
            ) : (
              (<div>
                <div style={{display:"flex", justifyContent:"center"}} id="ghost-friend-list-title">Friends</div>
                <div id="ghost-friend-list"></div>
              </div>)
            )}
        <div style={{display:"flex", justifyContent:"center"}}>
            <div className="ghost-friends-button"></div>
            <button className="friends-button" onClick={this.toggleFriends}>{this.state.friendList === "active" ? 'Hide Friends' : 'Show Friends'}</button>
            <div className="ghost-friends-button"></div>
        </div>
      </div>
    )
  }
}


const mapState = (state) => ({
  auth: state.auth,
  user: state.user
});


export default connect(mapState)(FriendsList)
