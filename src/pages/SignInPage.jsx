import React from "react";
import { styled } from "styled-components";
import Logo from "../components/assets/Logo";
import Buttons from "../components/assets/Button";
import { useNavigate } from "react-router-dom";

function SignInPage() {
    const navigate = useNavigate();

    const moveToSignup = () => {
        navigate("/signup");
    };

    return (
        <Canvas>
            <Wrapper>
                <Logo />
                <ContentArea>
                    <StInput placeholder="Input Email" />
                    <StInput placeholder="Input Password" />
                    <Buttons size="medium" bgColor="itemColor" outline>
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
            </Wrapper>
        </Canvas>
    );
}

const Canvas = styled.div`
    background: white;
    margin: auto;
    border-radius: 10px;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background: green; */
    padding: 40px 90px 60px 90px;
    gap: 80px;
`;

// const LogoArea = styled.div`
//     box-sizing: border-box;
//     /* background-color: yellow; */
//     /* padding-left: 70px; */
// `;

const ContentArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const StInput = styled.input`
    box-sizing: border-box;
    display: block;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme && theme["borderColor"]};

    font-size: x-large;
    color: ${({ theme }) => theme && theme["borderColor"]};

    /* text-align: center; */
    padding-inline: 10px;
    width: 400px;
    height: 65px;

    /* margin-block: 20px; */
`;

const EditButton = styled(Buttons)`
    border: 2px solid ${({ theme }) => theme && theme["borderColor"]};
`;

export default SignInPage;
