import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import Buttons from "../components/assets/Button";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { StInput } from "./SignInPage";
import Selector from "../util/Selector";
import Logo, { EditLogo } from "../components/assets/Logo";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { signUpDb } from "../api/auth";
import { useMutation } from "react-query";

function SignUpPage({ theme }) {
    /* input */
    const [input, setInput, deleteInput] = useInput({
        userId: "",
        password: "",
        nickname: "",
        // birth: "",
        gender: "",
        // favorites: [],
    });
    const [pwCheck, setPwCheck] = useState("");

    /* bornIn */
    const [bornIn, setBornIn] = useState({
        year: "",
        month: "",
        date: "",
    });

    /* favorites */
    const [selectedOptions, setSelectedOptions] = useState([]);

    /* image */
    const [profile, setProfile] = useState("");
    const [image, setImage] = useState("");

    /* gender */
    const [checkOut, setCheckOut] = useState("");
    const genderChangeHandler = (e) => {
        setCheckOut(e.target.value);
        setInput(e);
    };
    /* date picker: 나중에 시간 남으면 selector로 달력으로 제한하자. */
    const yearRef = useRef();
    const monthRef = useRef();
    const dateRef = useRef();

    const dateChangeHandler = (e) => {
        const { name } = e.target;
        const yearRegex = /^(19[0-9][0-9]|20\d{2})$/;
        const monthRegex = /^(0[0-9]|1[0-2])$/;
        const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])$/;
        const value = e.target.value.replace(/\D/g, "");
        if (name === "year") {
            if (value.length <= 4) {
                if (value.length === 4 && yearRegex.test(value)) {
                    monthRef.current.focus();
                }
                setBornIn({ ...bornIn, [name]: value });
            }
        } else if (name === "month") {
            if (value.length <= 2) {
                if (value.length === 2 && monthRegex.test(value)) {
                    dateRef.current.focus();
                }
                setBornIn({ ...bornIn, [name]: value });
            }
        } else if (name === "date") {
            if (value.length <= 2) {
                /* infinite render 문제 예상 지점 */
                if (value.length === 2 && dateRegex.test(value)) {
                    // 마지막 input 요소에서 포커스 이동을 멈춤
                    dateRef.current.blur();
                }
                setBornIn({ ...bornIn, [name]: value });
            }
            // if(value.length <=2 && value >=1 && value <=31){
            //     setBornIn({...bornIn, [name]: value})
            //     if(value.length === 2){
            //         // 마지막 input 요소에서 포커스 이동을 멈춤
            //         dateRef.current.blur();
            //     }
            // }
        }
    };
    /* selector - favorites */

    const navigation = useNavigate();
    const moveToBack = () => {
        navigation(-1);
    };

    const validation = (target) => {
        const emailRegex = /^[a-z0-9_+.-]+@[a-z0-9-]+\.[a-z0-9]{2,4}$/;
        const passwordRegex =
            /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
        if (target === "email") {
            return emailRegex.test(input.userId);
        } else {
            return passwordRegex.test(input.password);
        }
    };

    // const emailValidation = (target) => {
    //     const emailRegex = /^[a-z0-9_+.-]+@[a-z0-9-]+\.[a-z0-9]{2,4}$/;
    //     return emailRegex.test(target);
    // };
    // const isEmailValid = emailValidation(input.userId);

    // const pwValidation = (target) => {
    //     const passwordRegex =
    //         /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    //     return passwordRegex.test(target);
    // };
    // const isPasswordValid = pwValidation(input.password);

    const imageChangeHandler = (event) => {
        console.log(event.target.files[0]);
        const file = event.target.files[0];
        if (!file) return;

        // Check file type
        const fileType = file.type.split("/")[0];
        if (fileType !== "image") {
            alert("The selected file is not an image.");
            return;
        }

        // Check file size
        const maxSize = 3 * 1024 * 1024; // 3 MB
        if (file.size > maxSize) {
            alert("File size is too large. Please select a file under 3 MB.");
            return;
        }

        // 서버로 보낼 이미지
        setImage(file);

        // 화면에 표시할 프로필 이미지
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setProfile(reader.result);
        };
    };

    const mutation = useMutation(signUpDb, {
        onSuccess: (data) => {
            console.log("data >>>", data);
            navigation("/signin");
        },
        onError: (error) => {
            console.log("error >>>", error);
        },
    });

    const saveClickHandler = () => {
        const yearRegex = /^(19[0-9][0-9]|20\d{2})$/;
        const monthRegex = /^(0[0-9]|1[0-2])$/;
        const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])$/;

        if (pwCheck !== input.password) {
            console.log("비밀번호 확인 불일치");
        }

        if (!yearRegex.test(bornIn.year)) {
            console.log(
                "year 형식이 맞지 않습니다. 1900년 이후를 입력해주세요."
            );
            yearRef.current.focus();
            return;
        }
        if (!monthRegex.test(bornIn.month)) {
            console.log("month 형식이 맞지 않습니다.");
            monthRef.current.focus();
            return;
        }
        if (!dateRegex.test(bornIn.date)) {
            console.log("date 형식이 맞지 않습니다.");
            dateRef.current.focus();
            return;
        }

        if (selectedOptions.length !== 3) {
            console.log("interest 옵션을 3개 선택해 주세요.");
            return;
        }

        if (
            !input.userId ||
            !input.password ||
            !input.nickname ||
            !input.gender
        ) {
            console.log(input);
            console.log("공백은 불가능합니다.");
            return;
        }

        if (!image) {
            console.log("이미지를 반드시 첨부해주세요.");
            return;
        }

        /* 방법 1 */
        console.log("input >>>", input);
        const date = [bornIn.year, bornIn.month, bornIn.date].join("-");
        console.log("date >>>", date);
        const test = {
            ...input,
            birth: date,
            favorites: [...selectedOptions.map((ele) => ele.value)],
        };
        console.log("test >>>", test);
        console.log("image >>>", image);
        // const text = JSON.stringify({
        //     ...input,
        //     birth: date,
        //     favorites: [...selectedOptions.map((ele) => ele.value)],
        // });
        // const imageBlob = new Blob([image], { type: "image/jpeg" });
        // const textBlob = new Blob([text], { type: "application/json" });

        const formData = new FormData();
        // formData.append("image", image, "image.jpg");
        formData.append("userId", input.userId);
        formData.append("password", input.password);
        formData.append("nickname", input.nickname);
        formData.append("birth", date);
        formData.append("gender", input.gender);
        formData.append(
            "favorites",
            selectedOptions.map((ele) => ele.value)
        );
        // selectedOptions.map((ele) => {
        //     return formData.append("favorites[]", ele.value);
        // });

        // formData.append("favorites", [
        //     ...selectedOptions.map((ele) => ele.value),
        // ]);
        formData.append("image", image, "image.jpg");
        console.log(...formData);
        // formData.append("imageFile", imageBlob, "image.jpg");
        // formData.append("text", textBlob);

        /* 방법 2 */

        // return formData
        // console.log(formData);
        // console.log(...formData);
        // for (let a of formData) {
        //     console.log(a);
        // }
        // mutation.mutate(formData);

        /* body에 실어서 보냄 */
        // const response = await signUpDb(formData);
        // // const imageBlob = new Blob([image], {type: "image/jpeg"});
        // // const textBlob = new Blob([text], { type: "application/json"})
        // console.log(response);
        mutation.mutate(formData);
    };

    return (
        <Wrapper>
            <Canvas>
                <Section1>
                    <AbsoluteLogo onClick={moveToBack} />
                    <DescContainer>
                        <CustomLabel>Name</CustomLabel>
                        <div>
                            <EditInput
                                autoFocus
                                placeholder="Name"
                                name="nickname"
                                value={input.nickname}
                                onChange={setInput}
                            />
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
                            <EditInput
                                tiny
                                placeholder="Year"
                                name="year"
                                value={bornIn.year}
                                ref={yearRef}
                                onChange={dateChangeHandler}
                            />
                            <EditInput
                                tiny
                                placeholder="Month"
                                name="month"
                                value={bornIn.month}
                                ref={monthRef}
                                onChange={dateChangeHandler}
                            />
                            <EditInput
                                tiny
                                placeholder="Date"
                                name="date"
                                value={bornIn.date}
                                ref={dateRef}
                                onChange={dateChangeHandler}
                            />
                        </div>
                    </DescContainer>
                    <DescContainer>
                        <CustomLabel>Gender</CustomLabel>
                        <div style={{ display: "flex", gap: "20px" }}>
                            {/* const [checkOut, setCheckOut] = useState("")
                        const genderChangeHandler = (e) =>{
                            setCheckOut(e.target.value);
                            setInput(e)
                        } */}
                            <TinyButton
                                size="small"
                                // bgColor="white"
                                bgColor={
                                    checkOut === "MALE" ? "itemColor" : "white"
                                }
                                fontColor="borderColor"
                                outline
                                name="gender"
                                value="MALE"
                                onClick={genderChangeHandler}
                            >
                                Male
                            </TinyButton>
                            <TinyButton
                                size="small"
                                bgColor={
                                    checkOut === "FEMALE"
                                        ? "itemColor"
                                        : "white"
                                }
                                fontColor="borderColor"
                                outline
                                name="gender"
                                value="FEMALE"
                                onClick={genderChangeHandler}
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
                                <EditInput
                                    placeholder="Email"
                                    name="email"
                                    value={input.userId}
                                    onChange={setInput}
                                />
                            </div>
                            {
                                !validation("email") && (
                                    <>
                                        <p
                                            style={{
                                                display:
                                                    input.userId.length > 0
                                                        ? "block"
                                                        : "none",
                                                color: "red",
                                                height: "20px",
                                            }}
                                        >
                                            * 이메일 양식을 맞춰주세요!
                                        </p>
                                    </>
                                )

                                // input.userId && validation("email") && (
                                //     <p></p>
                                // )
                            }
                        </InputContainer>
                        <InputContainer>
                            <CustomLabel>PW</CustomLabel>
                            <div>
                                <EditInput
                                    placeholder="Password"
                                    name="password"
                                    value={input.password}
                                    onChange={setInput}
                                />
                            </div>
                            {!validation("password") && (
                                <p
                                    style={{
                                        display:
                                            input.password.length > 0
                                                ? "block"
                                                : "none",
                                        color: "red",
                                        height: "20px",
                                    }}
                                >
                                    * 대소문자,숫자,특수문자 포함 8자리 이상
                                    15자 이하
                                </p>
                            )}
                        </InputContainer>
                        <InputContainer>
                            <CustomLabel>PW Check</CustomLabel>
                            <div>
                                <EditInput
                                    placeholder="Password check"
                                    value={pwCheck}
                                    onChange={(e) => setPwCheck(e.target.value)}
                                />
                            </div>
                            {pwCheck !== input.password ? (
                                <p
                                    style={{
                                        display:
                                            pwCheck.length > 0
                                                ? "block"
                                                : "none",
                                        color: "red",
                                        height: "20px",
                                    }}
                                >
                                    * 비밀번호 불일치
                                </p>
                            ) : null}
                        </InputContainer>
                    </div>
                    <DescContainer>
                        <CustomLabel>Select Your Interest</CustomLabel>
                        <Selector
                            theme={theme}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                        />
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
                        <PhotoBox>
                            <Annotation
                                htmlFor="imageInput"
                                title="Upload Image"
                            ></Annotation>
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                style={{
                                    position: "absolute",
                                    display: "none",
                                    zIndex: "11",
                                }}
                                onChange={imageChangeHandler}
                            />
                            {profile ? (
                                <img
                                    alt="photoThumb"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        position: "absolute",
                                        zIndex: "10",
                                    }}
                                    src={profile}

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
                            onClick={saveClickHandler}
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
    /* box-sizing: border-box; */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* background-color: #e9911f; */
`;

const Canvas = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: fit-content;
    margin: auto;
    padding: 30px;
    border-radius: 10px;
    background-color: white;
`;

const AbsoluteLogo = styled(EditLogo)`
    /* position: absolute; */
    width: 130px;
    height: 50px;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 3;
    cursor: pointer;
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
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */

    font-size: large;

    &::placeholder {
        text-align: left;
        font-size: large;
        opacity: 0.7;
    }

    &:focus {
    }
`;

const CustomLabel = styled.label`
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
