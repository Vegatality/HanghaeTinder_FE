import React, { useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";
import { styled } from "styled-components";
import { cookie } from "../util/cookie";
import Buttons from "../components/assets/Button";

function MyChatListPage() {
    const outletContext = useOutletContext();
    console.log("outletContext >>>", outletContext);
    const isConnected = useRef("");
    const stompClient = useRef({});
    /* message from server */
    const [message, setMessage] = useState("");
    /* message to server(?) */
    const [chatMessages, setChatMessages] = useState([]);
    const checkCookie = cookie.get("auth");

    // brokerURL이 http 일경우 ws를 https일 경우 wss를 붙여서 사용하시면 됩니다!
    // const socket = new SockJS(
    //     `${process.env.REACT_APP_TEST_SERVER_URL}api/user/room/{id}`
    // );
    // stompClient.current = Stomp.over(socket);

    const connect = () => {
        // SockJS같은 별도의 솔루션을 이용하고자 하면 over 메소드를, 그렇지 않다면 Client 메소드를 사용해주면 되는 듯.
        // const socket = new SockJS(
        //     `${process.env.REACT_APP_WEB_SOCKET_SERVER}`
        // );
        // // const stomp = Stomp.over(socket);
        // // stompClient.current = stomp;
        // stompClient.current = Stomp.over(socket);

        stompClient.current = new Client({
            // brokerURL: The URL of the STOMP broker to connect to.
            // brokerURL이 http 일경우 ws를 https일 경우 wss를 붙여서 사용하시면 됩니다!
            // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
            // brokerURL: `${process.env.REACT_APP_WEB_SOCKET_SERVER}/room`, // 웹소켓 서버로 직접 접속

            /* ws://15.164.159.168:8080/ws-stomp */
            // brokerURL: `${process.env.REACT_APP_WEB_SOCKET_SERVER}`, // 웹소켓 서버로 직접 접속
            // connectHeaders: An object containing custom headers to send during the connection handshake.
            connectHeaders: {
                Authorization: `Bearer ${checkCookie}`,
            },
            // debug: A callback function that receives debug messages from the library.
            debug: (bug) => {
                console.log("bug >>> ", bug);
            },
            // reconnectDelay: The delay in milliseconds before attempting to reconnect after a disconnection.
            // 재연결 딜레이 비활성화: 수치를 0으로 주면 됨.
            // reconnectDelay: 5000,
            reconnectDelay: 0,

            // heartbeatIncoming: The interval in milliseconds at which heartbeat messages are expected from the server.
            heartbeatIncoming: 4000,

            // heartbeatOutgoing: The interval in milliseconds at which heartbeat messages are sent to the server.
            heartbeatOutgoing: 4000,

            // This property is a callback function that will be invoked when the STOMP client successfully establishes a connection with the broker. You can define custom logic or actions to be performed when the connection is established. It typically takes a single argument, which is the STOMP frame received upon successful connection.
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
            onConnect: () => {
                console.log("Connected to the broker. Initiate subscribing.");
                subscribe();

                // publish()
            },
            // webSocketFactory: This property allows you to provide a custom WebSocket factory function to create the underlying WebSocket connection. By default, the library uses the WebSocket constructor provided by the browser.
            // However, if you want to use a different WebSocket implementation or configure it further, you can supply your own factory function here.
            // proxy를 통한 접속
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
            // webSocketFactory: () =>
            //     new SockJS(
            //         `/ws-stomp`
            //     ),

            // This property is a callback function that will be invoked when an error occurs during the STOMP communication. It provides a way to handle and respond to STOMP-specific errors. The callback function typically takes a single argument, which is the STOMP frame representing the error.
            onStompError: (frame) => {
                // Will be invoked in case of error encountered at Broker
                // Bad login/passcode typically will cause an error
                // Complaint brokers will set `message` header with a brief message. Body may contain details.
                // Compliant brokers will terminate the connection after any error
                console.log(frame);
                console.log(
                    "Broker reported error: " + frame.headers["message"]
                );
                console.log("Additional details: " + frame.body);
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

    // 구독한 대상에 대해 메세지를 받기 위해 subscribe 메서드를 사용합니다!
    // const subscription = client.subscribe('/queue/test', callback);
    const subscribe = () => {
        stompClient.current.subscribe(
            `/sub/chat/room/63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2`,
            // `${process.env.REACT_APP_WEB_SOCKET_SERVER}/room`,
            // `${process.env.REACT_APP_WEB_SOCKET_SERVER}/chat/${roomId}`,

            (data) => {
                console.log(" 구독이 잘 되었습니다. >>>", JSON.parse(data));
            }
            // ({ body }) => {
            //     setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
            //   });
        );
    };

    /* sending message */
    // 클라이언트와 서버가 연결 되면 publish 메서드를 사용하여 메세지를 보낼 수 있습니다.
    // destination는 목적지라는 뜻입니다 어디로 메세지를 보낼지를 결정합니다.
    // body는 보낼 내용입니다.

    const publish = (message) => {
        if (!stompClient.current.connected) {
            return;
        }

        stompClient.current.publish({
            // destination: "/pub/chat",
            // destination: `${process.env.REACT_APP_WEB_SOCKET_SERVER}/room`,
            destination: `/pub/chat/message/63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2`,
            // body: "Hello world",
            // roomId를 소켓 연결했을 때 받아야 함. 받은 id(===roomId)를 통해서  subscribe랑 publish(=== send)를 할 수 있음.
            body: JSON.stringify({
                roomSeq: "63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2",
                message: "test message",
            }),
            // body: JSON.stringify({
            //     roomSeq: "63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2",
            //     message,
            // }),
            // body: JSON.stringify({ roomSeq: ROOM_SEQ, message }),
            headers: { authorization: `Bearer ${checkCookie}` },
        });

        /* my message initiate */
        setMessage("");

        // *v5부턴 바이너리 메세지 전송도 지원된다고 하네요!
        // (header에 'content-type': 'application/octet-stream')로 contentType을 써줍니다.)
        // const binaryData = generateBinaryData();
        // client.publish({
        // destination: '/topic/special',
        // binaryBody: binaryData,
        // headers: { 'content-type': 'application/octet-stream' },
        // });
    };

    useEffect(() => {
        console.log("쿠키에서 꺼낸 토큰 >>>", checkCookie);
        const testConnection = () => {
            // const socket = new SockJS("http://222.102.175.141:8080/ws-stomp");
            // stompClient.current = Stomp.over(socket);
            stompClient.current = Stomp.over(() => {
                const socket = new SockJS(
                    "http://222.102.175.141:8080/ws-stomp"
                );
                return socket;
            });

            // STOMP 연결 설정
            stompClient.current.connect(
                {
                    Authorization: `Bearer ${checkCookie}`,
                },
                () => {
                    stompClient.current.subscribe(
                        `/sub/chat/room/63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2`,
                        (message) => {
                            setMessage(JSON.parse(message.body));
                            console.log(JSON.parse(message));
                        }
                        // {
                        //     headers: {
                        //         Authorization: `Bearer ${checkCookie}`,
                        //     },
                        // }
                    );
                    // 연결 성공 시 동작할 로직 작성
                }
            );
            // stompClient.current.onStompError((error) => console.log(error));
        };

        testConnection();

        // 컴포넌트 언마운트 시 연결 해제
        // return () => {
        //     stompClient.disconnect();
        // };

        // return () => disconnect();
    }, []);

    // useEffect(() => {
    //     connect();

    //     return () => disconnect();
    // }, []);

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
