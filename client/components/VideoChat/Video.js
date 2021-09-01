import socket from "../../socket";
import React, { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { connect } from 'react-redux'


const VideoPlayer = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video width="200" height="113"
        playsInline
        muted={true}
        ref={ref}
        autoPlay
        style={{ objectFit: 'cover' }}
        />
    )
}



class Video extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            streamVideo: React.createRef(),
            peers: [],
            peersRef: React.createRef(),
            roomName: this.props.roomName
        }
    }

    async componentDidMount() {

        const roomName = this.props.roomName
        const peer = this.props.peer
        // const streamVideo = this.state.streamVideo
        this.state.peersRef.current = []
        const peersRef = this.state.peersRef

        // if (socket.id === this.props.thing) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
                this.state.streamVideo.current.srcObject = currentStream;
                socket.emit("join-call", {roomName: this.props.stuff})
                socket.on("all-users", users => {
                    console.log("RECEIVING LIST OF ALL USERS", users)
                    const peersForPeers = []
                    users.forEach(userId => {
                        const newPeer = this.createPeer(userId, socket.id, currentStream)
                        peersRef.current.push({
                            peerId: userId,
                            peer
                        })

                    peersForPeers.push(newPeer)
                    })

                    console.log("LIST OF ALL THE PEERS: ", peersForPeers)

                    this.setState({
                        peers: peersForPeers
                    })

                })

                socket.on("user-joined", payload => {
                    console.log("USER JOINED THE CALL")
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
        return peer
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
        return peer
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
            <div>
            <video width="200" height="113"
            playsInline
            muted={true}
            ref={this.state.streamVideo}
            autoPlay
            style={{ objectFit: 'cover' }}
            />
            {this.state.peers.map( (peer,index) => {
                if (index !== 0) {
                    return (
                        <VideoPlayer key={index} peer={peer} />
                    )
                } else {
                    return null
                }
            })}
        </div>
        )
    }
}


const mapState = state => ({
    userId: state.auth.id,
    roomName: state.room.roomName
})


export default connect(mapState)(Video)

