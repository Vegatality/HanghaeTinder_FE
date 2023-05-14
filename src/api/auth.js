// import axios from "axios";
import axios from "./axiosToken";

// set PORT=4000 && react-scripts start

/* 토큰확인 */
// 매 페이지마다 확인

// const checkAuth = async () => {
//     // Cookies.remove("쿠키이름")
//     const authToken = Cookies.get("access");

//     console.log(authToken);

//     const config = {
//         headers: {
//             authorization: `Bearer ${authToken}`,
//         },
//     };

//     const response = await axios.get(
//         `${process.env.REACT_APP_TEST_SERVER_URL}/user`,
//         config
//     );
//     return response;
// };

/* 회원가입 */
// axios 옵션 객체로 넣기
const signUpDb = async (inputs) => {
    await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/user/signup`,
        inputs
        // {
        //     headers: {
        //         withCredentials: true, // 쿠키 cors 통신 설정
        //     },
        // }
    );
};

/* 로그인 */
const signInDb = async (inputs) => {
    const response = await axios.post(
        `${process.env.REACT_APP_TEST_SERVER_URL}/user/login`,
        inputs
        // {
        //     headers: {
        //         withCredentials: true, // 쿠키 cors 통신 설정
        //     },
        // }
    );
    // console.log(response);
    return response;
};

export { signUpDb, signInDb };
