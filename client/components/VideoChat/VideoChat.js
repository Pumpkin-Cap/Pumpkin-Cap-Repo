import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import socket from "../../socket";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 113;
    width: 200;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video width="200" height="113"
            playsInline
            muted={false}
            ref={ref}
            autoPlay
            style={{ objectFit: 'cover' }}
        />
        // <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const VideoChat = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.roomID;


    useEffect(() => {

        socketRef.current = io.connect('/')
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peersList = [];

                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peersList.push({
                        peerID: userID,
                        peer
                    });
                })
                setPeers(peersList);
            })

            socketRef.current.on("user joined", payload => {
                const refrence = peersRef.current.map(obj => obj.peerID)
                if (!refrence.includes(payload.callerID)) {
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    })

                    const peerObj = {
                        peer,
                        peerID: payload.callerID
                    }

                    setPeers(users => [...users, peerObj]);
                }
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });


            socketRef.current.on("user left", id => {
                const peerObj = peersRef.current.find(p => p.peerID === id)

                if (peerObj) {
                    peerObj.peer.destroy()
                }
                const peers = peersRef.current.filter(p => p.peerID !== id)
                peersRef.current = peers
                setPeers(peers)
            })


        })
    }, []);

    useEffect(() => {

        return () => {
            socketRef.current.destroy()
        }
    }, [])

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }


    function getUniquePeers() {

        const peerIds = []

        const uniquePeers = peers.filter(peer => {
            if (peerIds.includes(peer.peerID)) {
                return false
            } else {
                peerIds.push(peer.peerID)
                return true
            }
        })
        return uniquePeers
    }


    const uniquePeers = getUniquePeers()

    return (
        <div className='videoFrame'>
            <video width="200" height="113"
            playsInline
            muted={true}
            ref={userVideo}
            autoPlay
            style={{ objectFit: 'cover' }}
            />
            {uniquePeers.map(peer => {
                return (
                    <Video key={peer.peerID} peer={peer.peer} />
                );
            })}
        </div>
    );
};

export default VideoChat;