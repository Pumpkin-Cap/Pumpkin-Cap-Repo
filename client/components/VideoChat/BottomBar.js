import React from 'react'
import socket from '../../socket';
import { connect } from 'react-redux'
import VideoChat from './VideoChat';


export class BottomBar extends React.Component {

    constructor() {
        super()
        this.state = {
            isOpen: false,
            roomOpen: false,
            inRoom: false,
            roomName: 'megaman',
            inCall: true,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleStartRoom = this.handleStartRoom.bind(this)
        this.handleLeaveRoom = this.handleLeaveRoom.bind(this)
    }



    handleMessageRoom(e, roomName = "megaman") {
        socket.emit('message-room', {roomName, userName: this.props.user.username, message: "hello"});
    }

    handleStartRoom() {
        const roomName = this.state.roomName
        socket.emit('join-room', {roomName, userName: this.props.user.username});
        this.setState({
            inRoom: true,
        })
    }

    handleChange(event) {
        this.setState({
            roomName: event.target.value
        })
    }

    handleLeaveRoom() {
        const roomName = this.state.roomName
        socket.emit('leave-room', {roomName, userName: this.props.user.username});
        this.setState({
            inRoom: false,
        })
    }


    render() {

        let roomUsers = 0
        if (this.props.room.users) {
            roomUsers = this.props.room.users.length
        }

        return (
            <div id="bottomBar">

                {this.state.isOpen ? (
                    <>
                    {/* <div>
                        {this.state.roomOpen && <div className="userList">
                            {this.props.room.users.map((userName,index) => (<div key={index}>{userName}</div>))}
                            </div>}
                        <button onClick={() => this.setState({roomOpen: !this.state.roomOpen})}>{roomUsers}</button>
                    </div> */}
                    <div>
                        {/* <button onClick={(e) => this.handleMessageRoom(e)}>MESSAGE ROOM</button> */}
                        {this.state.inRoom ? (
                            <>
                                {this.state.inCall && <VideoChat roomID={this.state.roomName}/> }
                                <div className="videoChatControls">
                                    <div>
                                        <div style={{backgroundColor: 'blanchedalmond'}}>{this.state.roomName}</div>
                                        <div>
                                            <button onClick={(e) => this.handleLeaveRoom(e)}>LEAVE ROOM</button>
                                            <button onClick={() => this.setState({isOpen: false})}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                            ) : (
                            <>
                                <input name="roomName" type="text" value={this.state.roomName} onChange={this.handleChange} required></input>
                                <button onClick={this.handleStartRoom}>START ROOM</button>
                                <button onClick={() => this.setState({isOpen: false})}>Close</button>
                            </>
                            )
                            }
                    </div>
                    </>
              ) : (
                  <button id="bottomBarOpenSymbol" onClick={() => this.setState({isOpen: true})}>Open Bar</button>
              )}
            </div>
        )
    }


}


const mapState = state => ({
    user: state.auth,
    room: state.room
})

export default connect(mapState)(BottomBar)




