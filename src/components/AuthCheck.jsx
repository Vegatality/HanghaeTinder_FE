import React from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { cookie } from "../util/cookie";
import jwtDecode from "jwt-decode";
import { DELETE_TOKEN, SET_TOKEN } from "../redux/modules/authSlice";

function AuthCheck() {
    const checkCookie = cookie.get("auth");
    if (checkCookie) {
        const decodedToken = jwtDecode(checkCookie);
        const { sub, exp } = decodedToken; // => {sub: 'asdf12@gmail.com', auth: 'USER', iat: 1684160574, exp: 1684161174}
        const expireDate = new Date(exp * 1000); // 날짜단위로 변환해서 넣기.
        SET_TOKEN({ userId: sub });
        return <Outlet context={sub} />;
    }
    if (!checkCookie) {
        DELETE_TOKEN();
        return <Navigate to={"/signin"} replace={true} state={"토큰 만료."} />;
    }

    // const message = checkCookie
    //     ? null
    //     : "토큰이 만료되었습니다. 다시 로그인 해주세요.";

    // /* 쿠키 만료 메시지 넘길 때 사용하세용 */
    // return (
    //     <>
    //         {checkCookie ? (
    //             <Outlet />
    //         ) : (
    //             <Navigate to={"/signin"} replace={true} state={message} />
    //         )}
    //     </>
    // );
}

export default AuthCheck;
