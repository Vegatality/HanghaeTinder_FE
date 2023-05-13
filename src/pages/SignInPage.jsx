import React from "react";
import { styled } from "styled-components";
import Logo from "../components/assets/Logo";
import Buttons from "../components/assets/Button";

function SignInPage() {
    return (
        <Canvas>
            <Wrapper>
                <div
                    style={{
                        display: "block",
                        height: "30px",
                        background: "green",
                    }}
                >
                    <Logo />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <StInput placeholder="Input Email" />
                    <StInput placeholder="Input Password" />
                    <div style={{ marginBottom: "20px" }}>
                        <Buttons size="medium" bgColor="itemColor">
                            LogIn
                        </Buttons>
                    </div>
                    <div>
                        <Buttons size="small" bgColor="itemColor">
                            SignUp
                        </Buttons>
                    </div>
                </div>
            </Wrapper>
        </Canvas>
    );
}

const Canvas = styled.div`
    width: 100%;
    height: 100%;
    background: white;
    margin: auto;
    border-radius: 10px;
`;

const Wrapper = styled.div`
    background: green;
    padding: 50px 90px 60px 90px;
`;

const StInput = styled.input`
    display: block;
    margin-block: 30px;
`;

export default SignInPage;
