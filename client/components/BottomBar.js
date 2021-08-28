import React from 'react'
import socket from '../socket';


export default class BottomBar extends React.Component {

    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }



    handleMessageRoom(e, roomName = "megaman") {
        socket.emit('message-room', {roomName, userName: 'cody', message: "hello"});
    }

    handleStartRoom(e, roomName = "megaman") {
        console.log('I joined the room: ', roomName)
        socket.emit('join-room', {roomName, userName: 'cody'});
    }


    render() {
        return (
            <div id="bottomBar">

                {this.state.isOpen ? (
                    <div id="bottomBarInnerDiv">
                        <button onClick={(e) => this.handleMessageRoom(e)}>MESSAGE ROOM</button>
                        This is the bottom bar
                        <button onClick={(e) => this.handleStartRoom(e)}>START ROOM</button>
                        <button onClick={() => this.setState({isOpen: false})}>Close</button>
                    </div>
              ) : (
                  <button id="bottomBarOpenSymbol" onClick={() => this.setState({isOpen: true})}>Open Bar</button>
              )}
            </div>
        )
    }


}





