import { Outlet, Route } from "react-router-dom";
import { styled } from "styled-components";

export const Layout = () => {
    return (
        <WidthLimitBox>
            <Outlet />
        </WidthLimitBox>
    );
};

const WidthLimitBox = styled.div`
    /* 넓이 제한 */
    max-width: 600px;
    min-width: 500px;

    /* 높이 제한 */

    /* max-height: 920px;
    min-height: 920px; */
    /* 100% === 100vh */
    height: 100%;

    /*  == height: 920px; */
    /*  != height: 100%; */

    /* padding-block: 60px; */
    /* 상위 div 100vw에서 중앙정렬*/
    margin: auto;

    display: flex;
    justify-content: center;
    align-items: center;
`;
