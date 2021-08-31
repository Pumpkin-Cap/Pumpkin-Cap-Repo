import socket from "../../socket";
import React from 'react';
import Peer from 'peerjs';
import { connect } from 'react-redux'

class Video extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            streamVideo: React.createRef()
        }
    }

    componentDidMount() {

        const roomName = this.props.roomName
        const peer = this.props.peer
        const streamVideo = this.state.streamVideo

        if (socket.id === this.props.thing) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
                this.state.streamVideo.current.srcObject = currentStream;

                peer.on('open', function (id) {
                    // socket.emit('joinHost', this.props.userId);
                    console.log("HELLO")

                    socket.on('call-socket', ( { peerId } ) => {
                        console.log('request received', peerId);
                        peer.call(peerId, currentStream);
                    });
                });

            });
        } else {

            peer.on('open', function (id) {
                // console.log(this.props.roomName)
                socket.emit('join-call', { roomName, peerId: id });
    
              peer.on('call', function (call) {
                console.log('received call');
                call.answer();
    
                call.on('stream', function (stream) {
                    console.log(stream)
                  streamVideo.current.srcObject = stream;
                });
              });
            });
          }

    }

    
    componentWillUnmount() {
        if (this.state.streamVideo.current.srcObject) {
            this.state.streamVideo.current.srcObject.getTracks().forEach(function (track) {
                track.stop();
            });
        }
    }

    render() {
        return (
            <video width="200" height="113"
            playsInline
            muted={socket.id === this.props.thing}
            ref={this.state.streamVideo}
            autoPlay
            style={{ objectFit: 'cover' }}
            />
        )
    }
}


const mapState = state => ({
    userId: state.auth.id
})


export default connect(mapState)(Video)

