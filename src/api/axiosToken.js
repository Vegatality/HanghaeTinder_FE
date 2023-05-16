import axios from "axios";
import { cookie } from "../util/cookie";

const token = cookie.get("auth");

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_TEST_SERVER_URL}`,
    // headers: { Authorization: `Bearer ${token}` },
});
instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// Instance를 만들 때 설정의 default 값을 설정할 수 있다.
/* const instance = axios.create({
    baseURL: 'https://api.example.com'
  });

  // Instance를 만든 후  defalut 값을 수정할 수 있다.
  instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  instance.defaults.timeout = 2500; */

// axios 전역 설정
// axios.defaults.withCredentials = true;

export default instance;
