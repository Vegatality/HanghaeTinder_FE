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
    /* 넓이 제한 */
    max-width: 800px;
    min-width: 700px;

    /* 높이 제한 */
    max-height: 920px;
    min-height: 920px;
    /*  == height: 920px; */
    /*  != height: 100%; */

    box-sizing: border-box;
    /* padding-block: 60px; */
    /* 상위 div 100vw에서 중앙정렬*/
    margin: auto;
`;
