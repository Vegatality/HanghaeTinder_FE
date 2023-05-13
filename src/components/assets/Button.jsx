import { padStart } from "lodash";
import { darken, lighten } from "polished";
import React from "react";
import styled, { css } from "styled-components";

/* color */

const colorStyles = css`
    ${({ theme, bgColor, fontColor }) => {
        // const textColor = color ? theme[color] : "initial";
        // const bgColor = color ? theme[bgcolor] : "initial";
        return css`
            color: ${fontColor && theme[fontColor]};
            background: ${bgColor && theme[bgColor]};
        `;
    }}
`;

/* size */
// text-overflow: hidden; white-space:  글씨 넘어가면 ... 처리해줌.... ellipsis
// padding 으로 하는 이유: 글자 수가 늘어나도 틀어지지 않음!
// width로 하면 글씨가 틀어질 수 있음.

const sizes = {
    large: {
        fontSize: "40px",
        height: "95px",
        width: "500px",
    },
    medium: {
        fontSize: "25px",
        height: "65px",
        width: "400px",
    },
    small: {
        fontSize: "20px",
        height: "50px",
        width: "200px",
    },
};

const sizeStyles = css`
    ${({ size }) => {
        // console.log(size);
        return css`
            /* 이거 property 없는데 왜 오류 안뜨나 봤더니 기본값을 설정해놨었음. */
            /* font-weight: ${sizes[size].fontWeight || "initial"}; */
            font-size: ${sizes[size].fontSize};
            width: ${sizes[size].width};
            height: ${sizes[size].height};
            padding-block: ${sizes[size].paddingBlock};
            padding-inline: ${sizes[size].paddingInline};
        `;
    }}
`;

const StyledButton = styled.button`
    /* 공통 스타일 */
    /* display: inline-flex; */
    box-sizing: border-box;
    font-weight: bolder;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        filter: brightness(115%);
        transition: all 0.2s;
    }
    &:active {
        filter: brightness(80%);
        transition: all 0.2s;
    }

    /* border-radius: ${(props) => props.radius && `${props.radius}px`};
    margin-left: ${({ noMargin }) => (noMargin ? "0px" : "20px")};
    align-self: ${({ position }) => position && "flex-end"}; */

    /* 첫 번째를 기준으로 두 번째 요소의 CSS를 결정. 그래서 noMargin 속성 프로퍼티를 첫 번째한테 줘야 함 */

    /* 크기 */
    ${sizeStyles}

    /* 색상 */
    ${colorStyles} /* 위치 */
`;

/* 버튼 배경&글씨 색상 등록은 theme.js에서 하세요 */

function Buttons({
    children,
    size,
    fontColor = "white",
    bgColor = "itemColor",
    btPosition,
    ...rest
}) {
    return (
        <StyledButton
            size={size}
            fontColor={fontColor}
            bgColor={bgColor}
            btPosition={btPosition}
            {...rest}
        >
            {children}
        </StyledButton>
    );
}

// Buttons.defaultProps = {
//     // icon 기본값 false로 설정
//     iconOption: false,
// };

export default Buttons;
