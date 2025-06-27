import './Channel.css'
import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CometChat } from '@cometchat-pro/chat'



function Channel() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [channel, setChannel] = useState(null)
    const [messages, setMessages] = useState([])
    const [members, setMembers] = useState([])
    const [currentUser] = useState(() => JSON.parse(localStorage.getItem('user')))
    const [calling, setCalling] = useState(false)
    const [sessionID, setSessionID] = useState('')
    const [isIncomingCall, setIsIncomingCall] = useState(false)
    const [isOutgoingCall, setIsOutgoingCall] = useState(false)
    const [isLive, setIsLive] = useState(false)

    const channelRef = useRef(null)

    useEffect(() => {
        if (!id) return

        let isMounted = true

        async function init() {
            try {
                const group = await getChannel(id)
                if (!isMounted) return
                if (!group) {
                    navigate('/')
                    return
                }

                setChannel(group)
                channelRef.current = group

                const msgs = await getMessages(id)
                if (!isMounted) return
                setMessages(msgs)

                const memberList = await getMembers(id)
                if (!isMounted) return
                setMembers(memberList)

                listenForMessage(id, (msg) => {
                    setMessages((prev) => [...prev, msg])
                })

                listenForCall(id, {
                    onIncomingCallReceived: (call) => {
                        setSessionID(call.sessionId)
                        setIsIncomingCall(true)
                        setCalling(true)
                    },
                    onOutgoingCallAccepted: (call) => {
                        startCall(call, 'callScreen', () => {
                            resetCallState()
                            setIsLive(false)
                        })
                        setIsLive(true)
                    },
                    onOutgoingCallRejected: () => resetCallState(),
                    onIncomingCallCancelled: () => resetCallState(),
                })
            } catch {
                navigate('/')
            }
        }

        init()

        return () => {
            isMounted = false
        }
    }, [id, navigate])

    const handleInitiateCall = async () => {
        try {
            const outGoingCall = await initiateCall(id)
            setSessionID(outGoingCall.sessionId)
            setIsOutgoingCall(true)
            setCalling(true)
            setIsLive(true)
        } catch {
            // manejar error si querés
        }
    }

    const handleAcceptCall = async () => {
        try {
            const call = await acceptIncomingCall(sessionID)
            startCall(call, 'callScreen', () => {
                resetCallState()
                setIsLive(false)
            })
            setIsLive(true)
        } catch {
            // manejar error si querés
        }
    }

    const handleRejectCall = async () => {
        try {
            await rejectCall(sessionID)
            resetCallState()
        } catch {
            // manejar error si querés
        }
    }

    const handleEndCall = async () => {
        try {
            await endCall(sessionID)
            resetCallState()
        } catch {
            // manejar error si querés
        }
    }

    const resetCallState = () => {
        setCalling(false)
        setIsIncomingCall(false)
        setIsOutgoingCall(false)
        setIsLive(false)
        setSessionID('')
    }

    const handleDeleteChannel = async () => {
        if (window.confirm('Are you sure you want to delete this channel?')) {
            try {
                await CometChat.deleteGroup(id)
                window.location.href = '/'
            } catch {
                // manejar error si querés
            }
        }
    }

    return (
        <div className="channel">
            {!calling && (
                <div className="channel__actions">
                    <button onClick={handleInitiateCall}>Iniciar llamada</button>
                </div>
            )}

            {calling && (
                <div className="callScreen">
                    <div className="callScreen__container">
                        <div className="call-animation">
                            <img
                                className="img-circle"
                                src={channel?.avatar}
                                alt=""
                                width="135"
                            />
                        </div>
                        <h4>
                            {isOutgoingCall
                                ? `Calling ${channel?.name}`
                                : `${channel?.name} is calling you`}
                        </h4>

                        <div className="callScreen__actions">
                            {isOutgoingCall ? (
                                <button onClick={handleEndCall}>Cancel</button>
                            ) : (
                                <>
                                    <button onClick={handleAcceptCall}>Accept</button>
                                    <button onClick={handleRejectCall}>Reject</button>
                                </>
                            )}
                        </div>
                    </div>
                    <div id="callScreen"></div>
                </div>
            )}
        </div>
    )
}

export default Channel
