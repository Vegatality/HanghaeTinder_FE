import React, { useState } from "react";
import { styled } from "styled-components";
import Buttons from "../components/assets/Button";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { StInput } from "./SignInPage";
import Selector from "../util/Selector";

function SignUpPage() {
    const [profile, setProfile] = useState(false);

    return (
        <Wrapper>
            <Canvas>
                <Section1>
                    <DescContainer>
                        <CustomLabel>Name</CustomLabel>
                        <div>
                            <EditInput placeholder="Name" />
                        </div>
                    </DescContainer>
                    <DescContainer>
                        <CustomLabel>Birth</CustomLabel>
                        <div
                            style={{
                                display: "flex",
                                // background: "yellow",
                                gap: "20px",
                            }}
                        >
                            <EditInput tiny placeholder="Year" />
                            <EditInput tiny placeholder="Month" />
                            <EditInput tiny placeholder="Date" />
                        </div>
                    </DescContainer>
                    <DescContainer>
                        <CustomLabel>Gender</CustomLabel>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <TinyButton
                                size="small"
                                bgColor="white"
                                fontColor="borderColor"
                                outline
                            >
                                Male
                            </TinyButton>
                            <TinyButton
                                size="small"
                                bgColor="white"
                                fontColor="borderColor"
                                outline
                            >
                                Female
                            </TinyButton>
                        </div>
                    </DescContainer>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                        }}
                    >
                        <InputContainer>
                            <CustomLabel>ID</CustomLabel>
                            <div>
                                <EditInput placeholder="Email" />
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <CustomLabel>PW</CustomLabel>
                            <div>
                                <EditInput placeholder="Password" />
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <CustomLabel>PW Check</CustomLabel>
                            <div>
                                <EditInput placeholder="Password check" />
                            </div>
                        </InputContainer>
                    </div>
                    <DescContainer>
                        <CustomLabel long>Select Your Interest</CustomLabel>
                        <Selector />
                    </DescContainer>
                </Section1>
                <Section2>
                    <div>
                        <CustomLabel>Your Profile Picture</CustomLabel>
                    </div>
                    <div
                        style={{
                            margin: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "400px",
                            widtth: "400px",
                            position: "relative",
                        }}
                    >
                        <Annotation
                            htmlFor="imageInput"
                            title="Upload Image"
                        ></Annotation>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                        <PhotoBox>
                            {profile ? (
                                <img
                                    alt="photoThumb"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    // src={`${process.env.PUBLIC_URL}/image/InstaTinderLogo.svg`}
                                />
                            ) : (
                                <PlusImage />
                            )}
                        </PhotoBox>
                    </div>
                    <div>
                        <Buttons
                            size="medium"
                            bgColor="itemColor"
                            fontColor="white"
                            outline
                        >
                            Next
                        </Buttons>
                    </div>
                </Section2>
            </Canvas>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: #e9911f; */
`;

const Canvas = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 1200px;
    margin: auto;
    padding: 30px;

    border-radius: 10px;
    background-color: white;
`;

const Section1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
    gap: 20px;
`;

const Section2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
    gap: 10px;
`;

const EditInput = styled(StInput)`
    width: ${({ tiny }) => (tiny ? "100px" : "200px")};
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    font-size: large;

    &::placeholder {
        text-align: center;
        font-size: x-large;
    }
`;

const CustomLabel = styled.label`
    width: ${({ long }) => (long ? "300px" : "200px")};
    height: 30px;

    font-size: x-large;
    color: ${({ theme }) => theme && theme["borderColor"]};
`;

const DescContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TinyButton = styled(Buttons)`
    border: 2px solid ${({ theme }) => theme && theme["borderColor"]};
`;

const PhotoBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    border: 2px solid ${({ theme }) => theme && theme["borderColor"]};
    width: 100%;
    height: 100%;

    background: #fff;
`;

const PlusImage = styled(AiOutlinePlusSquare)`
    width: 50px;
    height: 50px;
    color: ${({ theme }) => theme["borderColor"]};
    /* inset: 0; */
`;

const Annotation = styled.label`
    /* cursor-pointer absolute inset-0 w-full h-full flex items-center justify-center text-white bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-200 */
    cursor: pointer;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme["borderColor"]};

    /* bg-opacity-0 */
    background-color: #ffffff;
    background-color: rgba(255, 255, 255, 0);

    /* bg-opacity-50 */
    background-color: rgba(255, 255, 255, 0.5);

    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
`;

export default SignUpPage;
