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
    background: ${({ theme }) => theme["mainBgColor"]};
`;
export default FullBackground;
