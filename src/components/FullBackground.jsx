import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

function FullBackground() {
    return (
        <FScreen>
            <Outlet />
        </FScreen>
    );
}
const FScreen = styled.div`
    width: 100vw;
    height: 100vh;

    /* display: flex;
    justify-content: center;
    align-items: center; */

    /* padding-block: 10%; */
    background: ${({ theme }) => theme["mainBgColor"]};
    box-sizing: border-box;
`;
export default FullBackground;
