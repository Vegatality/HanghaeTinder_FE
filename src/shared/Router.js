import React, { useEffect } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import MainPage from "../pages/MainPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import MatchingPage from "../pages/MatchingPage";
import MyChatListPage from "../pages/MyChatListPage";
import ChattingPage from "../pages/ChattingPage";
import { Layout } from "./Layout";
import FullBackground from "../components/FullBackground";
import { useDispatch, useSelector } from "react-redux";
import { cookie } from "../util/cookie";
import { DELETE_TOKEN, SET_TOKEN } from "../redux/modules/authSlice";
import jwtDecode from "jwt-decode";
import AuthCheck from "../components/AuthCheck";
function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route element={<FullBackground />}>
                <Route path="/signup" element={<SignUpPage />} />
                <Route element={<Layout />}>
                    <Route path="/signin" element={<SignInPage />} />
                    <Route element={<AuthCheck />}>
                        <Route path="/match" element={<MatchingPage />} />
                        <Route path="/chatlist" element={<MyChatListPage />} />
                    </Route>
                </Route>
                <Route path="/chatpage" element={<ChattingPage />} />
            </Route>
        </Routes>
    );
}
export default Router;
