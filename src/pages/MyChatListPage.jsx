import React, { useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp, { Client } from '@stomp/stompjs'
import { styled } from "styled-components";

function MyChatListPage() {
    const outletContext = useOutletContext();
    console.log("outletContext >>>", outletContext);
    const stompClient = useRef({});
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("")
    

    const connect = () => {
        // const socket = new SockJS(
        //     `${process.env.REACT_APP_TEST_SERVER_URL}/api/user/room/${outletContext}`
        // );
        // const stomp = Stomp.over(socket);
        // stompClient.current = stomp;
        stompClient.current = new Stomp.Client({
            // brokerURL: The URL of the STOMP broker to connect to.
            brokerURL: `${process.env.REACT_APP_TEST_SERVER_URL}/api/user/room/${outletContext}`,
            // connectHeaders: An object containing custom headers to send during the connection handshake.
            connectHeaders: {},
            // debug: A callback function that receives debug messages from the library.
            debug: (bug) => {
                console.log(bug)
            },
            // reconnectDelay: The delay in milliseconds before attempting to reconnect after a disconnection.
            reconnectDelay: 5000,
            // heartbeatIncoming: The interval in milliseconds at which heartbeat messages are expected from the server.
            heartbeatIncoming: 4000,
            // heartbeatOutgoing: The interval in milliseconds at which heartbeat messages are sent to the server.
            heartbeatOutgoing: 4000,
            // This property is a callback function that will be invoked when the STOMP client successfully establishes a connection with the broker. You can define custom logic or actions to be performed when the connection is established. It typically takes a single argument, which is the STOMP frame received upon successful connection.
            onConnect: () => {
                console.log("Connected to the broker")
                subscribe()
            },
            // webSocketFactory: This property allows you to provide a custom WebSocket factory function to create the underlying WebSocket connection. By default, the library uses the WebSocket constructor provided by the browser.
            // However, if you want to use a different WebSocket implementation or configure it further, you can supply your own factory function here.
            // webSocketFactory: () => new SockJS(`${process.env.REACT_APP_TEST_SERVER_URL}/api/user/room/${outletContext}`)

            


        });
        // stompClient.current.connect({})
    }

    const disconnect = () => {
        stompClient.current.deactivate();
    }

    const subscribe = () => {
        stompClient.current.subscribe(`${process.env.REACT_APP_TEST_SERVER_URL}api/user/chat/${outletContext}`)
    }




    useEffect(()=>{
        connect();
        return () => disconnect()
    }, [])


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
