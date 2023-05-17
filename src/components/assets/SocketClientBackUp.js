// const connect = () => {
//         // SockJS같은 별도의 솔루션을 이용하고자 하면 over 메소드를, 그렇지 않다면 Client 메소드를 사용해주면 되는 듯.
//         // const socket = new SockJS(
//         //     `${process.env.REACT_APP_TEST_SERVER_URL}/api/user/room/${outletContext}`
//         // );
//         // const stomp = Stomp.over(socket);
//         // stompClient.current = stomp;
//         stompClient.current = new Client({
//             // brokerURL: The URL of the STOMP broker to connect to.
//             // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
//             // connectHeaders: An object containing custom headers to send during the connection handshake.
//             connectHeaders: {
//                 Authorization: `Bearer ${checkCookie}`,
//             },
//             // debug: A callback function that receives debug messages from the library.
//             debug: (bug) => {
//                 console.log("bug >>> ", bug);
//             },
//             // reconnectDelay: The delay in milliseconds before attempting to reconnect after a disconnection.
//             reconnectDelay: 5000,
//             // heartbeatIncoming: The interval in milliseconds at which heartbeat messages are expected from the server.
//             heartbeatIncoming: 4000,
//             // heartbeatOutgoing: The interval in milliseconds at which heartbeat messages are sent to the server.
//             heartbeatOutgoing: 4000,
//             // This property is a callback function that will be invoked when the STOMP client successfully establishes a connection with the broker. You can define custom logic or actions to be performed when the connection is established. It typically takes a single argument, which is the STOMP frame received upon successful connection.
//             onConnect: () => {
//                 console.log("Connected to the broker");
//                 subscribe();
//             },
//             // webSocketFactory: This property allows you to provide a custom WebSocket factory function to create the underlying WebSocket connection. By default, the library uses the WebSocket constructor provided by the browser.
//             // However, if you want to use a different WebSocket implementation or configure it further, you can supply your own factory function here.
//             // webSocketFactory: () =>
//             //     new SockJS(
//             //         `${process.env.REACT_APP_TEST_SERVER_URL}/api/user/room`
//             //     ),

//             // This property is a callback function that will be invoked when an error occurs during the STOMP communication. It provides a way to handle and respond to STOMP-specific errors. The callback function typically takes a single argument, which is the STOMP frame representing the error.
//             onStompError: (frame) => {
//                 console.log(frame);
//             },
//         });
//         stompClient.current.activate();

//         // stompClient.current.connect({})
//     };

//     const disconnect = () => {
//         stompClient.current.deactivate();
//     };

//     const subscribe = () => {
//         stompClient.current.subscribe(
//             `${process.env.REACT_APP_TEST_SERVER_URL}api/user/chat`,
//             (data) => {
//                 console.log(" 구독이 잘 되었습니다. >>>", JSON.parse(data));
//             }
//         );
//     };

//     const publish = (message) => {
//         if (!stompClient.current.connected) {
//             return;
//         }

//         stompClient.current.publish({
//             destination: "",
//         });
//     };
