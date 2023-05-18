import React, { useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";
import { styled } from "styled-components";
import { cookie } from "../util/cookie";
import Buttons from "../components/assets/Button";
import jwtDecode from "jwt-decode";
import Loading from "../components/Loading"
import { getTimeDifference } from "../util/getTimeDifference"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_SOCKET } from "../redux/modules/socketSlice"


function MyChatListPage() {
    const [isLoading, setIsLoading] = useState(true)
    const outletContext = useOutletContext();
    console.log("outletContext >>>", outletContext);
    const isConnected = useRef("");
    // const stompClient = useRef(null);
    const socketRef = useRef(null);
    /* message from server */
    const [message, setMessage] = useState("");
    /* message to server(?) */
    const [chatMessages, setChatMessages] = useState([]);
    const checkCookie = cookie.get("auth");
    const decodedToken = jwtDecode(checkCookie);
    const { sub, exp } = decodedToken;
    const dispatch = useDispatch()


    /* checkPoint */
    // const connect = () => {
    //     // SockJS같은 별도의 솔루션을 이용하고자 하면 over 메소드를, 그렇지 않다면 Client 메소드를 사용해주면 되는 듯.
    //     stompClient.current = new Client({
    //         // brokerURL이 http 일경우 ws를 https일 경우 wss를 붙여서 사용하시면 됩니다!
    //         // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
    //         // brokerURL: `${process.env.REACT_APP_WEB_SOCKET_SERVER}/room`, // 웹소켓 서버로 직접 접속

    //         /* ws://15.164.159.168:8080/ws-stomp */
    //         // brokerURL: `${process.env.REACT_APP_WEB_SOCKET_SERVER}`, // 웹소켓 서버로 직접 접속
    //         // connectHeaders: An object containing custom headers to send during the connection handshake.
    //         connectHeaders: {
    //             Authorization: `Bearer ${checkCookie}`,
    //         },
    //         debug: (debug) => {
    //             console.log("debug : ", debug);
    //         },
    //         reconnectDelay: 0,

    //         heartbeatIncoming: 4000,

    //         heartbeatOutgoing: 4000,

    //         // 검증 부분
    //         webSocketFactory: () => {
    //             const socket = new SockJS(
    //                 "http://222.102.175.141:8080/ws-stomp"
    //             );
    //             socket.onopen = function () {

    //                 socket.send(
    //                     JSON.stringify({
    //                         Authorization: `Bearer ${checkCookie}`,
    //                     })
    //                 );
    //             };
    //             socketRef.current = socket
    //             return socket;
    //         },


    //         // 검증이 돼서 Room을 열어주는 서버랑 연결이 되면
    //         onConnect: () => {
    //             console.log("Connected to the broker. Initiate subscribing.");
    //             // dispatch(SET_SOCKET(stompClient.current))
    //             isConnected.current = true;
    //             subscribe();
    //             publish(sub);

    //         },
    //         onDisconnect: () => {
    //             console.log("socket disconnected")
    //         },

    //         onStompError: (frame) => {
    //             console.log(frame);
    //             console.log(
    //                 "Broker reported error: " + frame.headers["message"]
    //             );
    //             console.log("Additional details: " + frame.body);
    //         },
    //         onWebSocketError: (frame) => {
    //             console.log(frame);
    //         },
    //         onWebSocketClose: () => {
    //             console.log("web socket closed");
    //         },
    //     });

    //     stompClient.current.activate();
    //     // Respond to non-socket browsers with SocketJS (We recommend that you consult with the server as necessary and selectively use it)
    //     // if (typeof WebSocket !== "function") {
    //     //     stompClient.current.webSocketFactory = function () {
    //     //         return new SockJS(
    //     //             `${process.env.REACT_APP_WEB_SOCKET_SERVER}`
    //     //             // `${process.env.REACT_APP_WEB_SOCKET_SERVER}/room`
    //     //         );
    //     //     };
    //     // }

    //     // stompClient.current.connect({})
    // };

    // const disconnect = () => {
    //     console.log(stompClient.current)
    //     // stompClient.current.disconnect()
    //     stompClient.current.disconnect()
    //     // stompClient.current.deactivate();
    //     isConnected.current = false
    //     // stompClient.current.disconnect()
    //     // stompClient.current.unsubscribe()
    // };
    // const subscribe = () => {
    //     stompClient.current.subscribe(
    //         `/sub/chat/rooms/${sub}`,

    //         (data) => {
    //             // console.log(
    //             //     " 구독이 잘 되었습니다. >>>",
    //             //     JSON.parse(data.body)
    //             // );
    //             const response = JSON.parse(data.body)
    //             // console.log(response.data.chatRooms);
    //             setChatMessages(response.data.chatRooms)
    //         }
    //         // ({ body }) => {
    //         //     setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    //         //   });
    //     );
    // };

    // const publish = async(userId) => {
    //     if (!stompClient.current.connected) {
    //         return;
    //     }

    //     await stompClient.current.publish({
    //         destination: "/pub/chat/message",
    //         // body: JSON.stringify({
    //         //     roomSeq: "63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2",
    //         //     message: "test message",
    //         // }),
    //         /* 메시지 부분 수정해야 함. */
    //         body: JSON.stringify({ type: "ROOM", roomId: userId }),
    //         headers: { authorization: `Bearer ${checkCookie}` },
    //         //
    //     });

    //     setIsLoading(false)

    //     /* my message initiate */
    //     setMessage("");
    // };
    // const publish = (message) => {
    //     if (!stompClient.current.connected) {
    //         return;
    //     }

    //     stompClient.current.publish({
    //         destination: "/pub/chat/message",
    //         // body: JSON.stringify({
    //         //     roomSeq: "63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2",
    //         //     message: "test message",
    //         // }),
    //         /* 메시지 부분 수정해야 함. */
    //         body: JSON.stringify({ type: "ROOM", roomId: sub }),
    //         headers: { authorization: `Bearer ${checkCookie}` },
    //         //
    //     });

    //     /* my message initiate */
    //     setMessage("");
    // };

    /* original */

    // console.log("쿠키에서 꺼낸 토큰 >>>", checkCookie);

    const socket = new SockJS("http://222.102.175.141:8080/ws-stomp");
    const stompClient = Stomp.over(() => socket);
    const testConnection = async () => {
        // const SC = Stomp.over(() => socket);

        // STOMP 연결 설정
        console.log(sub);
        await stompClient.connect(
            {
                /* header */
                Authorization: `Bearer ${checkCookie}`,
                // headers: {
                //     Authorization: `Bearer ${checkCookie}`,
                // },
            },
            (data) => {
                // console.log("여기 왜 콘솔 안찍힘?");
                // console.log("cennect 콜백부분");
                // console.log("cennect message >>>", JSON.parse(data));
                // console.log("cennect message >>>", JSON.parse(data.body));
                // console.log("cennect message >>>", data);
                // console.log("cennect message >>>", data.body);
                // console.log("userID >>>", sub);
                stompClient.subscribe(
                    `/sub/chat/rooms/${sub}`,
                    // MESSAGE 라는 것은 subscribe 부분에서 주는 것.
                    (message) => {
                        setIsLoading(false)
                        console.log("message >>> ", JSON.parse(message.body));
                        const response = JSON.parse(message.body)
                        setChatMessages(response.data.chatRooms)
                    }
                );
                // 연결 성공 시 동작할 로직 작성
                // stompClient.current._checkConnection(); // _checkConnection 호출

                stompClient.send(
                    "/pub/chat/message", // endPoint
                    {}, // headers
                    JSON.stringify({ type: "ROOM", roomId: sub }) // body를 실어서 보내야됨
                );
            },
            (error) => {
                console.log("error >>>", error);
            }
        );

        // stompClient.current.onStompError((error) => console.log(error));
    };


    useEffect(() => {
        testConnection();


        // return () => {
        //     stompClient.disconnect();
        // };

        return () => stompClient?.disconnect()
    }, []);

    const navigate = useNavigate();
    const moveToChat = (roomId, roomName) => {
        navigate("/chatpage", {
            state : {
                roomId,
                roomName
            }
        })
    }

    // useEffect(() => {
    //     connect();
    //     // dispatch(SET_SOCKET(connect()))
    //     // 컴포넌트 언마운트 시 연결 해제 => 굳이 채팅방 넘어갈 때 구독 해제해야 하는지 생각해보자.
    //     // 페이지 넘어가도 소켓을 disconnect를 안했으니까 유지되고 있는 상태!

    //     // return () => {
    //     //     if(stompClient.current){
    //     //         console.log("StompClient >>>" ,stompClient.current)
    //     //         stompClient.current.deactivate()
    //     //     }
    //     // }
    // }, []);

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }


    return (
        <>
            <ChatListContentWrap>
                <ChatListContentBox>
                    <Link to={"/"}>
                        <ChatListLogoImage
                            src="../image/MainPageLogo.svg"
                            alt="photoThumb"
                        />
                    </Link>
                    <ChatListTitle>Chats</ChatListTitle>
                    <ChatList>
                        {
                            chatMessages.map((ele) => {
                                console.log(ele)
                                return (
                                    <Chats key={ele.id} onClick={() => moveToChat(ele.roomId, ele.name)}>
                                        <ChatImg></ChatImg>
                                        <ChatInpoWrap>
                                            <div>
                                                <ChatInpoRoomName>{ele.name}</ChatInpoRoomName>
                                                <ChatInpoRoomLastMsg>{ele.lastMsg}</ChatInpoRoomLastMsg>
                                            </div>
                                            <ChatInpoLastDate>{getTimeDifference(ele.lastMsgDate)}</ChatInpoLastDate>
                                        </ChatInpoWrap>
                                    </Chats>
                                )
                            })
                        }
                        {/* <input
                            type="text"
                            placeholder="message test"
                            name="test"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={() => publish(message)}>
                            소켓 테스트 버튼
                        </button> */}
                    </ChatList>
                </ChatListContentBox>
            </ChatListContentWrap>
        </>
    );
}

const ChatListContentWrap = styled.div`
    position: relative;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
        rgba(0, 0, 0, 0.22) 0px 10px 10px;
    /* width: 100%; */
    width: 100%;
    min-height: 900px;
`;

const ChatListContentBox = styled.div`
    padding: 20px;
    padding-inline: 15px;
`;

const ChatListLogoImage = styled.img`
    width: 250px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const ChatListTitle = styled.h2`
    margin-top: 100px;
    font-size: 18px;
    font-weight: 900;
    color: ${({ theme }) => theme["borderColor"]};
`;

const ChatList = styled.ul`
    width: 100%;
    height: 730px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
`;

const Chats = styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px;
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    box-sizing: border-box;
    cursor: pointer;
    gap: 15px;
    &:hover {
        transform: scale(1.02);
        transition: all 0.3s;
    }
`;



const ChatImg = styled.div`
    width: 80px;
    height: 80px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
        rgba(17, 17, 26, 0.1) 0px 0px 8px;
    border-radius: 50%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("../image/InstaTinder.png");
    background-color: rgba(254, 86, 101, 0.2);
    cursor: pointer;
`;

const ChatInpoWrap = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`

const ChatInpoRoomName = styled.p`
    font-size: 16px;
    font-weight: 900;
    margin-bottom: 10px;
`;

const ChatInpoRoomLastMsg = styled.p`
    font-size: 12px;
    font-weight: 400;
`;

const ChatInpoLastDate = styled.p`
    font-size: 12px;
    font-weight: 900;
`
export default MyChatListPage;
