import { Cookies } from "react-cookie";

/* react-cookie 쿠키 사용법 */
/* cookie.set() 쿠키에 저장. */

// path (string) : 쿠키 경로, / 모든 경로 페이지에서 쿠키에 액세스할 수 있도록 하려면 경로로 사용
// expires (Date) : 쿠키의 절대 만료 날짜
// maxAge (number) : 클라이언트가 쿠키를 수신한 시점부터 쿠키의 상대적인 최대 수명(초)
// secure (boolean) : HTTPS를 통해서만 액세스할 수 있습니까?

// cookie.set("쿠키이름", "token", {
//     path: "/",
//     // secure: "/",
//     // expires: expireDate,
//     // expires: 3000,
//     // maxAge: 500, // maxAge는 숫자 1이 1초
//     // expires: new Date().getMinutes() + 1,
// })

/* 쿠키 get */
// const token = cookie.get("쿠키이름");

/* 쿠키 remove */
// cookie.remove("쿠키이름");

export const cookie = new Cookies();
