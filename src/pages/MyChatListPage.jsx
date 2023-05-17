import React, { useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";
import { styled } from "styled-components";
import { cookie } from "../util/cookie";
import Buttons from "../components/assets/Button";
import jwtDecode from "jwt-decode";

function MyChatListPage() {
    const outletContext = useOutletContext();
    console.log("outletContext >>>", outletContext);
    const isConnected = useRef("");
    const stompClient = useRef(null);
    /* message from server */
    const [message, setMessage] = useState("");
    /* message to server(?) */
    const [chatMessages, setChatMessages] = useState([]);
    const checkCookie = cookie.get("auth");
    const decodedToken = jwtDecode(checkCookie);
    const { sub, exp } = decodedToken;

    /* checkPoint */
    const connect = () => {
        // SockJS같은 별도의 솔루션을 이용하고자 하면 over 메소드를, 그렇지 않다면 Client 메소드를 사용해주면 되는 듯.
        stompClient.current = new Client({
            // brokerURL이 http 일경우 ws를 https일 경우 wss를 붙여서 사용하시면 됩니다!
            // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
            // brokerURL: `${process.env.REACT_APP_WEB_SOCKET_SERVER}/room`, // 웹소켓 서버로 직접 접속

            /* ws://15.164.159.168:8080/ws-stomp */
            // brokerURL: `${process.env.REACT_APP_WEB_SOCKET_SERVER}`, // 웹소켓 서버로 직접 접속
            // connectHeaders: An object containing custom headers to send during the connection handshake.
            connectHeaders: {
                Authorization: `Bearer ${checkCookie}`,
            },
            debug: (debug) => {
                console.log("debug : ", debug);
            },
            reconnectDelay: 0,

            heartbeatIncoming: 4000,

            heartbeatOutgoing: 4000,

            onConnect: () => {
                console.log("Connected to the broker. Initiate subscribing.");
                isConnected.current = true;
                subscribe();
                publish();

                // publish()
            },
            webSocketFactory: () => {
                const socket = new SockJS(
                    "http://222.102.175.141:8080/ws-stomp"
                );
                socket.onopen = function () {
                    socket.send(
                        JSON.stringify({
                            Authorization: `Bearer ${checkCookie}`,
                        })
                    );
                };
                return socket;
            },
            onStompError: (frame) => {
                console.log(frame);
                console.log(
                    "Broker reported error: " + frame.headers["message"]
                );
                console.log("Additional details: " + frame.body);
            },
            onWebSocketError: (frame) => {
                console.log(frame);
            },
            onWebSocketClose: () => {
                console.log("web socket closed");
            },
        });
        stompClient.current.activate();
        // Respond to non-socket browsers with SocketJS (We recommend that you consult with the server as necessary and selectively use it)
        // if (typeof WebSocket !== "function") {
        //     stompClient.current.webSocketFactory = function () {
        //         return new SockJS(
        //             `${process.env.REACT_APP_WEB_SOCKET_SERVER}`
        //             // `${process.env.REACT_APP_WEB_SOCKET_SERVER}/room`
        //         );
        //     };
        // }

        // stompClient.current.connect({})
    };

    const disconnect = () => {
        stompClient.current.deactivate();
        // stompClient.current.disconnect()
        // stompClient.current.unsubscribe()
    };
    const subscribe = () => {
        stompClient.current.subscribe(
            `/sub/chat/rooms/${sub}`,

            (data) => {
                console.log(
                    " 구독이 잘 되었습니다. >>>",
                    JSON.parse(data.body)
                );
            }
            // ({ body }) => {
            //     setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
            //   });
        );
    };

    const publish = (message) => {
        if (!stompClient.current.connected) {
            return;
        }

        stompClient.current.publish({
            destination: "/pub/chat/message",
            // body: JSON.stringify({
            //     roomSeq: "63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2",
            //     message: "test message",
            // }),
            /* 메시지 부분 수정해야 함. */
            body: JSON.stringify({ type: "ROOM", roomId: sub }),
            headers: { authorization: `Bearer ${checkCookie}` },
        });

        /* my message initiate */
        setMessage("");
    };

    /* original */

    // console.log("쿠키에서 꺼낸 토큰 >>>", checkCookie);

    // const testConnection = async () => {
    //     // const SC = Stomp.over(() => socket);
    //     const socket = new SockJS("http://222.102.175.141:8080/ws-stomp");
    //     const stompClient = Stomp.over(() => socket);

    //     // STOMP 연결 설정
    //     console.log(sub);
    //     await stompClient.connect(
    //         {
    //             /* header */
    //             Authorization: `Bearer ${checkCookie}`,
    //             // headers: {
    //             //     Authorization: `Bearer ${checkCookie}`,
    //             // },
    //         },
    //         async (data) => {
    //             console.log("여기 왜 콘솔 안찍힘?");
    //             console.log("cennect 콜백부분");
    //             // console.log("cennect message >>>", JSON.parse(data));
    //             // console.log("cennect message >>>", JSON.parse(data.body));
    //             console.log("cennect message >>>", data);
    //             console.log("cennect message >>>", data.body);
    //             console.log("userID >>>", sub);
    //             await stompClient.subscribe(
    //                 `/sub/chat/rooms/${sub}`,
    //                 (message) => {
    //                     // const parsedMessage = JSON.parse(message.body);
    //                     // const normalMessage = JSON.parse(message);
    //                     // console.log("message >>> ", parsedMessage);
    //                     // console.log("message >>> ", normalMessage);
    //                     console.log("message >>> ", JSON.parse(message.body));
    //                     // console.log("message >>>", JSON.parse(message));
    //                     // console.log("message >>>", JSON.parse(message.body));
    //                 }
    //             );
    //             // 연결 성공 시 동작할 로직 작성
    //             // stompClient.current._checkConnection(); // _checkConnection 호출

    //             await stompClient.send(
    //                 "/pub/chat/message",
    //                 {},
    //                 JSON.stringify({ type: "ROOM", roomId: sub })
    //             );
    //         },
    //         (error) => {
    //             console.log("error >>>", error);
    //         }
    //     );

    //     // stompClient.current.onStompError((error) => console.log(error));
    // };

    // testConnection();

    // useEffect(() => {

    //     // 컴포넌트 언마운트 시 연결 해제
    //     // return () => {
    //     //     stompClient.disconnect();
    //     // };

    //     // return () => disconnect();
    // }, []);

    useEffect(() => {
        connect();

        return () => disconnect();
    }, []);

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
                        <Chats>
                            <ChatImg></ChatImg>
                            <ChatInpo>최신 메세지 or 페이버릿</ChatInpo>
                        </Chats>

                        <Chats>
                            <ChatImg></ChatImg>
                            <ChatInpo>최신 메세지 or 페이버릿</ChatInpo>
                        </Chats>

                        <Chats>
                            <ChatImg></ChatImg>
                            <ChatInpo>최신 메세지 or 페이버릿</ChatInpo>
                        </Chats>
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
    height: 100px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
`;

const Chats = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    box-sizing: border-box;
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
    background-image: url("../image/MainPageLogo.svg");
    cursor: pointer;
`;

const ChatInpo = styled.p`
    width: 80%;
    font-size: 24px;
    text-align: end;
`;
export default MyChatListPage;
