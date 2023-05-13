import React from "react";
import { ReactComponent as OriginalLogo } from "../assets/MainPageLogo.svg";
import { ReactComponent as InstaTinderLogo } from "../assets/InstaTinderLogo.svg";
import { styled } from "styled-components";

function Logo() {
    return (
        <div style={{ position: "relative", display: "block" }}>
            <EditLogo />
        </div>
    );
}

export const EditLogo = styled(OriginalLogo)`
    width: 400px;
    position: absolute;
    left: 50%;
    transform: translate(-40%, 0);
    /* fill: url(); */
`;

export const EditInstaTinderLogo = styled(InstaTinderLogo)`
    position: absolute;
    left: 50%;
    transform: translate(-40%, 0);
    fill: url();
`;

export default Logo;
