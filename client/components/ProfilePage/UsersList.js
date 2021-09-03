import React from 'react';
import  { connect } from 'react-redux';
import { Link } from 'react-router-dom'


class UsersList extends React.Component{

  constructor(props) {
      super(props)
  }

  render() {
    const { allUsers, search } = this.props;
console.log('the search function in child ', search)
    return (
      <div id="profile-all-users-list-container">

        {(Array.isArray(allUsers) && search(allUsers).length > 0)  ? ((
        <div>
          <div style={{display:"flex", justifyContent:"center"}} id="all-users-list-title">Users</div>
          <div id="all-users-list">{search(allUsers).map((element) => (
            <div key={element.id}>
              <Link to={`/user/${element.id}` }>{element.username}</Link>
              </div>))}
            </div>
          </div>)
          ) : (
          <div>
            <div style={{display:"flex", justifyContent:"center"}} id="all-users-list-title">Users</div>
            <div id="all-users-list" style={{fontSize:"small"}}>No users match your search</div>
          </div>)}
      </div>
    )
  }
}


const mapState = (state) => ({
  auth: state.auth,
  allUsers: state.allUsers
});


export default connect(mapState)(UsersList)
