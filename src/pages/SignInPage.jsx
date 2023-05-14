import React from "react";
import { styled } from "styled-components";
import Logo, { EditLogo } from "../components/assets/Logo";
import Buttons from "../components/assets/Button";
import { useNavigate } from "react-router-dom";
import { cookie } from "../util/cookie";

function SignInPage() {
    const navigate = useNavigate();

    const moveToSignup = () => {
        navigate("/signup");
    };

    /* Cookies().set 쿠키에 저장.
    path (string) : 쿠키 경로, / 모든 경로 페이지에서 쿠키에 액세스할 수 있도록 하려면 경로로 사용
    expires (Date) : 쿠키의 절대 만료 날짜
    maxAge (number) : 클라이언트가 쿠키를 수신한 시점부터 쿠키의 상대적인 최대 수명(초)
    secure (boolean) : HTTPS를 통해서만 액세스할 수 있습니까? */

    cookie.set("auth", "token", {
        path: "/",
        // secure: "/",
        // expires: expireDate,
        // expires: 3000,
        // maxAge: 500, // maxAge는 숫자 1이 1초
        // expires: new Date().getMinutes() + 1,
    });

    return (
        <Wrapper>
            <Canvas>
                <SignInLogo />
                <ContentArea>
                    <StInput placeholder="Input Email" />
                    <StInput placeholder="Input Password" />
                    <Buttons
                        size="medium"
                        bgColor="itemColor"
                        outline
                        onClick={() => navigate("/match")}
                    >
                        LogIn
                    </Buttons>
                    <div>
                        <EditButton
                            size="medium"
                            bgColor="white"
                            fontColor="borderColor"
                            outline
                            onClick={moveToSignup}
                        >
                            SignUp
                        </EditButton>
                    </div>
                </ContentArea>
            </Canvas>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background: white;
    /* margin: auto; */
    border-radius: 10px;
    /* height: 100%; */
`;

const Canvas = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background: green; */
    padding: 60px 90px 60px 90px;
    gap: 30px;
`;

// const LogoArea = styled.div`
//     box-sizing: border-box;
//     /* background-color: yellow; */
//     /* padding-left: 70px; */
// `;

const SignInLogo = styled(EditLogo)`
    width: 300px;
    height: 100px;
    transform: translateX(3%);
`;

const ContentArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

export const StInput = styled.input`
    display: block;

    width: 400px;
    height: 65px;

    /* text-align: center; */
    box-sizing: border-box;
    padding-inline: 10px;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme && theme["borderColor"]};

    text-align: center;
    font-size: x-large;
    color: ${({ theme }) => theme && theme["borderColor"]};

    /* margin-block: 20px; */
    &::placeholder {
        /* text-align: center; */
        font-size: x-large;
    }
`;

const EditButton = styled(Buttons)`
    border: 2px solid ${({ theme }) => theme && theme["borderColor"]};
`;

export default SignInPage;
