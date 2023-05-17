// brokerURL이 http 일경우 ws를 https일 경우 wss를 붙여서 사용하시면 됩니다!
// const socket = new SockJS(
//     `${process.env.REACT_APP_TEST_SERVER_URL}api/user/room/{id}`
// );
// stompClient.current = Stomp.over(socket);

/* checkPoint */
// const connect = () => {
//     // SockJS같은 별도의 솔루션을 이용하고자 하면 over 메소드를, 그렇지 않다면 Client 메소드를 사용해주면 되는 듯.
//     // const socket = new SockJS(
//     //     `${process.env.REACT_APP_WEB_SOCKET_SERVER}`
//     // );
//     // // const stomp = Stomp.over(socket);
//     // // stompClient.current = stomp;
//     // stompClient.current = Stomp.over(socket);

//     stompClient.current = new Client({
//         // brokerURL: The URL of the STOMP broker to connect to.
//         // brokerURL이 http 일경우 ws를 https일 경우 wss를 붙여서 사용하시면 됩니다!
//         // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
//         // brokerURL: `${process.env.REACT_APP_WEB_SOCKET_SERVER}/room`, // 웹소켓 서버로 직접 접속

//         /* ws://15.164.159.168:8080/ws-stomp */
//         // brokerURL: `${process.env.REACT_APP_WEB_SOCKET_SERVER}`, // 웹소켓 서버로 직접 접속
//         // connectHeaders: An object containing custom headers to send during the connection handshake.
//         connectHeaders: {
//             Authorization: `Bearer ${checkCookie}`,
//         },
//         // debug: A callback function that receives debug messages from the library.
//         debug: (debug) => {
//             console.log("debug >>> ", debug);
//         },
//         // reconnectDelay: The delay in milliseconds before attempting to reconnect after a disconnection.
//         // 재연결 딜레이 비활성화: 수치를 0으로 주면 됨.
//         // reconnectDelay: 5000,
//         reconnectDelay: 0,

//         // heartbeatIncoming: The interval in milliseconds at which heartbeat messages are expected from the server.
//         heartbeatIncoming: 4000,

//         // heartbeatOutgoing: The interval in milliseconds at which heartbeat messages are sent to the server.
//         heartbeatOutgoing: 4000,

//         // This property is a callback function that will be invoked when the STOMP client successfully establishes a connection with the broker. You can define custom logic or actions to be performed when the connection is established. It typically takes a single argument, which is the STOMP frame received upon successful connection.
//         // Do something, all subscribes must be done is this callback
//         // This is needed because this will be executed after a (re)connect
//         onConnect: () => {
//             console.log("Connected to the broker. Initiate subscribing.");
//             isConnected.current = true;
//             subscribe();
//             publish();

//             // publish()
//         },
//         // webSocketFactory: This property allows you to provide a custom WebSocket factory function to create the underlying WebSocket connection. By default, the library uses the WebSocket constructor provided by the browser.
//         // However, if you want to use a different WebSocket implementation or configure it further, you can supply your own factory function here.
//         // proxy를 통한 접속
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
//             return socket;
//         },
//         // webSocketFactory: () =>
//         //     new SockJS(
//         //         `/ws-stomp`
//         //     ),

//         // This property is a callback function that will be invoked when an error occurs during the STOMP communication. It provides a way to handle and respond to STOMP-specific errors. The callback function typically takes a single argument, which is the STOMP frame representing the error.
//         onStompError: (frame) => {
//             // Will be invoked in case of error encountered at Broker
//             // Bad login/passcode typically will cause an error
//             // Complaint brokers will set `message` header with a brief message. Body may contain details.
//             // Compliant brokers will terminate the connection after any error
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
//     stompClient.current.deactivate();
//     // stompClient.current.disconnect()
//     // stompClient.current.unsubscribe()
// };

// // 구독한 대상에 대해 메세지를 받기 위해 subscribe 메서드를 사용합니다!
// // const subscription = client.subscribe('/queue/test', callback);
// const subscribe = () => {
//     stompClient.current.subscribe(
//         `/sub/chat/rooms/${sub}`,
//         // `/sub/chat/room/63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2`,
//         // `${process.env.REACT_APP_WEB_SOCKET_SERVER}/room`,
//         // `${process.env.REACT_APP_WEB_SOCKET_SERVER}/chat/${roomId}`,

//         (data) => {
//             console.log(" 구독이 잘 되었습니다. >>>", JSON.parse(data));
//             console.log(
//                 " 구독이 잘 되었습니다. >>>",
//                 JSON.parse(data.body)
//             );
//             console.log(" 구독이 잘 되었습니다. >>>", data);
//         }
//         // ({ body }) => {
//         //     setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
//         //   });
//     );
// };

// /* sending message */
// // 클라이언트와 서버가 연결 되면 publish 메서드를 사용하여 메세지를 보낼 수 있습니다.
// // destination는 목적지라는 뜻입니다 어디로 메세지를 보낼지를 결정합니다.
// // body는 보낼 내용입니다.

// const publish = (message) => {
//     if (!stompClient.current.connected) {
//         return;
//     }

//     stompClient.current.publish({
//         // destination: "/pub/chat",
//         // destination: `${process.env.REACT_APP_WEB_SOCKET_SERVER}/room`,
//         destination: `/pub/chat/message/63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2`,
//         // body: "Hello world",
//         // roomId를 소켓 연결했을 때 받아야 함. 받은 id(===roomId)를 통해서  subscribe랑 publish(=== send)를 할 수 있음.
//         body: JSON.stringify({
//             roomSeq: "63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2",
//             message: "test message",
//         }),
//         // body: JSON.stringify({
//         //     roomSeq: "63b8fe74-6adf-4bb6-94f5-b7b612dcc8b2",
//         //     message,
//         // }),
//         // body: JSON.stringify({ roomSeq: ROOM_SEQ, message }),
//         headers: { authorization: `Bearer ${checkCookie}` },
//     });

//     /* my message initiate */
//     setMessage("");

//     // *v5부턴 바이너리 메세지 전송도 지원된다고 하네요!
//     // (header에 'content-type': 'application/octet-stream')로 contentType을 써줍니다.)
//     // const binaryData = generateBinaryData();
//     // client.publish({
//     // destination: '/topic/special',
//     // binaryBody: binaryData,
//     // headers: { 'content-type': 'application/octet-stream' },
//     // });
// };
