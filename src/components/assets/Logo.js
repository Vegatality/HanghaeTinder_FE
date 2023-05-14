import React from "react";
// import { ReactComponent as OriginalLogo } from "../assets/MainPageLogo.svg";
// import { ReactComponent as InstaTinderLogo } from "../assets/InstaTinderLogo.svg";
import { styled } from "styled-components";

function Logo() {
    return (
        <EditLogo
        // src={`${process.env.PUBLIC_URL}/image/MainPageLogo.svg`}
        // src="/image/jpgLogo.jpg"
        // alt="photoThumb"
        />
    );
}

export const EditLogo = styled.div`
    width: 200px;
    height: 200px;
    transform: translate(-5%, 0);
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("/image/MainPageLogo.svg");
`;

// export const EditInstaTinderLogo = styled(InstaTinderLogo)`
//     position: absolute;
//     left: 50%;
//     transform: translate(-40%, 0);
//     fill: url();
// `;

export default Logo;
