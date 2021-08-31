import socket from "../../socket";
import React from 'react';
import Peer from 'peerjs';
import { connect } from 'react-redux'

class Video extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            streamVideo: React.createRef(),
            peers: [],
            peersRef: React.createRef()
        }
    }

    componentDidMount() {

        const roomName = this.props.roomName
        const peer = this.props.peer
        // const streamVideo = this.state.streamVideo
        this.state.peersRef.current = []
        const peersRef = this.state.peersRef
        console.log(peersRef)

        // if (socket.id === this.props.thing) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
                this.state.streamVideo.current.srcObject = currentStream;
                socket.emit("join-call", roomName)
                socket.on("all-users", users => {
                    const peersForPeers = []
                    users.forEach(userId => {
                        const newPeer = this.createPeer(userId, socket.id, currentStream)
                        peersRef.current.push({
                            peerId: userId,
                            peer
                        })

                    peersForPeers.push(newPeer)
                        
                    })

                    this.setState({
                        peers: peersForPeers
                    })

                })

                socket.on("user-joined", payload => {
                    const peer = this.addPeer(payload.signal, payload.callerId, currentStream)
                    peersRef.current.push({
                        peerId: payload.callerId,
                        peer,
                    })

                    this.setState({
                        peers: [...this.state.peers, peer]
                    })


                })

                socket.on('recieving-returned-signal', payload => {
                    const item = peersRef.current.find(p => p.peerId === payload.id)
                    item.peer.signal(payload.signal)
                })

                // peer.on('open', function (id) {
                //     // socket.emit('joinHost', this.props.userId);
                //     console.log("HELLO")

                //     socket.on('call-socket', ( { peerId } ) => {
                //         console.log('request received', peerId);
                //         peer.call(peerId, currentStream);
                //     });
                // });

            });
        // } else {

        //     peer.on('open', function (id) {
        //         // console.log(this.props.roomName)
        //         socket.emit('join-call', { roomName, peerId: id });
    
        //       peer.on('call', function (call) {
        //         console.log('received call');
        //         call.answer();
    
        //         call.on('stream', function (stream) {
        //             console.log(stream)
        //           streamVideo.current.srcObject = stream;
        //         });
        //       });
        //     });
        //   }

    }

    createPeer(userToSignal, callerId, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        })

        peer.on("signal", signal => {
            socket.emit("sending-signal", { userToSignal, callerId, stream})
        })
    }

    addPeer(incomingSignal, callerId, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        })

        peer.on('signal', signal => {
            socket.emit('returning-signal', {signal, callerId})
        })

        peer.signal(incomingSignal)
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

