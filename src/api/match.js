import { cookie } from "../util/cookie";
import axios from "./axiosToken";
// import axios from "axios";

/* troubleshooting */
// axios 자체는 instance를 사용 가능.
// but react-query는 instance를 사용 불가능(왜인지는 모르겠지만 못 읽음. 혹은 비동기적으로 되는 듯. 그 해결방법을 아직 찾는 중).



//* 전체유저목록 조회(cookie 는 await 가 붙는다.)
const usersInfo = async () => {
    const getCookie = await cookie.get("auth");
    const headers = {
        authorization: `Bearer ${getCookie}`,
    };
    return await axios
        .get(`${process.env.REACT_APP_TEST_SERVER_URL}/api/users`, {
            headers
        })
        .then((response) => {
            // console.log(response.data)
            return response.data;
        })
        .catch((error) => {
            return error;
        });
};

//* 전체유저목록 조회 해결방법 2번째
// const usersInfo = async () => {
//   try{
//     const response = await axios.get(`/api/users`)
//     return response.data
//   }
//   catch(error) {
//     throw new error(error)
//   }
// }

//* 전체유저목록 조회 오류 덩어리
// const usersInfo = async () => {
//   await axios.get(`/api/users`)
//   .then((response) => {
//     console.log(response.data)
//     return response.data
//   })
//   .catch((error) => {
//     return error
//   })
// };

//* 하트를 눌렀을때 조회

const clickLike = async (id) => {
    try {
        const getCookie = await cookie.get("auth");
        const headers = {
            authorization: `Bearer ${getCookie}`,
        };
        const response = await axios.post(
            `${process.env.REACT_APP_TEST_SERVER_URL}/api/users/like/${id}`,
            {},
            {
                headers,
            }
        );
        return response.data;
    } catch (error) {
        throw new error(error);
    }
};

//* 싫어요를 눌렀을때 조회

const clickdisLike = async (id) => {
    try {
        const getCookie = await cookie.get("auth");
        const headers = {
            authorization: `Bearer ${getCookie}`,
        };
        const response = await axios.post(
            `${process.env.REACT_APP_TEST_SERVER_URL}/api/users/dislike/${id}`,
            {},
            {
                headers,
            }
        );
        return response.data;
    } catch (error) {
        throw new error(error);
    }
};

//* 좋아요유저목록  조회

const LikeUsers = async () => {
    try {
        const getCookie = await cookie.get("auth");
        const headers = {
            authorization: `Bearer ${getCookie}`,
        };
        const response = await axios.get(
            `${process.env.REACT_APP_TEST_SERVER_URL}/api/users/like`,
            {
                headers,
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        throw new error(error);
    }
};

export { usersInfo, clickLike, clickdisLike, LikeUsers };
