import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

export const Layout = () => {
    return (
        <WidthLimitBox>
            <Outlet />
        </WidthLimitBox>
    );
};

const WidthLimitBox = styled.div`
    /* 크기제한 */
    max-width: 800px;
    min-width: 700px;

    /* 상위 div 100vw에서 중앙정렬*/
    margin-inline: auto;
`;
