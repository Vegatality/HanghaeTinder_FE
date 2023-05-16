import React, { useState } from "react";
import { styled } from "styled-components";
import Logo, { EditLogo } from "../components/assets/Logo";
import Buttons from "../components/assets/Button";
import { useNavigate } from "react-router-dom";
import { cookie } from "../util/cookie";
import { useInput } from "../hooks/useInput";
import jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { signInDb } from "../api/auth";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "../redux/modules/authSlice";
import { ToastContainer, toast } from "react-toastify";

function SignInPage() {
    const [inputs, setInputs, deleteInputs, validateInputs] = useInput({
        userId: "",
        password: "",
    });
    const [isMessage, setIsMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const moveToSignup = () => {
        navigate("/signup");
    };
    const moveToMatch = () => {
        navigate("/match");
    };

    const onLoginHandler = () => {
        if (validateInputs("email") && validateInputs("password")) {
            mutation.mutate(inputs);
        } else {
            console.log("Incorrect password or ID type");
        }
    };

    // -------------------------------------------SignIn---------------------------

    const mutation = useMutation(signInDb, {
        // onMutate: () => {
        //     //mutationFunction인 signIndb가 실행되기 전에 실행. mutationFunc가 받을 동일한 변수가 전달됨.
        //     // console.log("useMutation의 onMutate, 서버에 요청 시작합니다!");
        // },
        onSuccess: (data) => {
            /* 입력 초기화 */
            // /* 토큰 해체 및 쿠키에 저장. */
            const token = data.headers.authorization.split(" ")[1];

            const decodedToken = jwtDecode(token);
            console.log("디코드 정보:", decodedToken);
            const { sub, exp } = decodedToken; // => {sub: 'asdf12@gmail.com', auth: 'USER', iat: 1684160574, exp: 1684161174}
            const expireDate = new Date(exp * 1000); // 날짜단위로 변환해서 넣기.
            cookie.set("auth", token, {
                expires: expireDate,
                userId: sub,
            });

            /*  Reducer 에서 토큰 관리할 것임. useName도 Page 넘어갈 때마다 useSelector로 받을 수 있게 넘기는 거
            페이지 넘어갈 때 Reducer에서 토큰 꺼내와서 살아있는지 확인할 거임. */
            dispatch(
                SET_TOKEN({
                    userId: sub,
                })
            );
            setIsMessage(true);
            toast.success(`로그인 성공! 환영합니다 ${sub}님`, {
                position: toast.POSITION.TOP_CENTER,
                toastId: "empty-comment-toast",
            });
            // alert(`로그인 성공! 환영합니다 ${name}님`);
            // setIsError({ error: false, message: "" });
            deleteInputs();

            // 페이지 이동
            moveToMatch();
        },
        onError: (error) => {
            console.log(error);
            setIsMessage(true);
            toast.error(`등록되지 않은 유저입니다.`, {
                position: toast.POSITION.TOP_CENTER,
                toastId: "empty-comment-toast",
            });
        },
    });

    return (
        <Wrapper>
            <Canvas>
                {isMessage && <ToastContainer />}
                <SignInLogo />
                <ContentArea>
                    <StInput
                        autoFocus={true}
                        name="userId"
                        value={inputs.userId}
                        onChange={setInputs}
                        placeholder="Input Email"
                    />
                    <StInput
                        name="password"
                        value={inputs.password}
                        onChange={setInputs}
                        placeholder="Input Password"
                    />
                    <Buttons
                        size="medium"
                        bgColor="itemColor"
                        outline
                        onClick={onLoginHandler}
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
    padding-inline: 14px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme && theme["borderColor"]};

    text-align: left;
    font-size: x-large;
    color: ${({ theme }) => theme && theme["borderColor"]};

    /* margin-block: 20px; */
    &::placeholder {
        text-align: left;
        font-size: x-large;
    }

    &:focus {
        border: 2px solid ${({ theme }) => theme["borderColor"]};
    }
`;

const EditButton = styled(Buttons)`
    border: 2px solid ${({ theme }) => theme && theme["borderColor"]};
`;

export default SignInPage;
