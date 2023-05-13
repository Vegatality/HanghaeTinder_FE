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
    height: 100%;

    /* border-box:  padding으로 인해서 더 커지는 것을 막아줌.
        테두리를 기준으로 크기를 정한다.
    */
    box-sizing: border-box;
    padding-block: 60px;

    /* 상위 div 100vw에서 중앙정렬*/
    margin: auto;
`;
