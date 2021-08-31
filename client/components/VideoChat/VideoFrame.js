import React from 'react'
import socket from '../../socket'
import { connect } from 'react-redux'
import Peer from 'peerjs'
import Video from './Video'


class VideoFrame extends React.Component {

    constructor() {
        super()
        this.state = {
            peer: new Peer()
        }
    }


    render() {
        console.log(this.props.room.roomName)
        return <div>
            {this.props.room.sockets.map((socket,index) => (
                <div key={index}>
                    <Video peer={this.state.peer} thing={socket} roomName={this.props.room.roomName} />
                    {/* <div>{socket}</div> */}
                </div>
            ))}
        </div>
    }


}

const mapState = state => ({
    room: state.room
})

export default connect(mapState)(VideoFrame)


