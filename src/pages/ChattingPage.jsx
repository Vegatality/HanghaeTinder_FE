import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { TiArrowBackOutline } from "react-icons/ti";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
function ChattingPage() {

    const [like, setLike] = useState(true)

    const unLike = () => {
        setLike(!like)
    }
    return <>
        <ChatRoomWrap>
            <ChatContentBox>
                <ChatLogoImage
                    src="../image/MainPageLogo.svg"
                    alt="photoThumb"
                />
                <ChatRoomBackIconwrap>
                    <ChatRoomBackIcon />
                </ChatRoomBackIconwrap>

                <ChatProfileWrap>
                    <ChatProfileImgWrap>
                        <ChatProfileImg />
                    </ChatProfileImgWrap>

                    <ChatProfiletitleWrap>
                        <ChatProfiletitle>상대방 프로필</ChatProfiletitle>
                        {like ? <ChatHeartIcon onClick={unLike}/> : <ChatUnHeartIcon onClick={unLike}/>}
                    </ChatProfiletitleWrap>
                </ChatProfileWrap>

                <ChatContentWrap>
                    <YourChatWrap>
                        <YourChat>상대방 채팅 내용</YourChat><WrittenTime>작성시간</WrittenTime>
                    </YourChatWrap>
                    <MyChatWrap>
                        <WrittenTime>작성시간</WrittenTime><MyChat>사용자 채팅 내용</MyChat>
                    </MyChatWrap>
                </ChatContentWrap>
                <ChatInput name="" id="" cols="30" rows="10" />
                <SendBtnWrap>
                    <SendBtn />
                </SendBtnWrap>
            </ChatContentBox>
        </ChatRoomWrap>
    </>;
}

const ChatRoomWrap = styled.div`
    position: relative;
    width: 100%;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
        rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;


const ChatContentBox = styled.div`
    padding: 25px 20px 20px 20px;
    padding-inline: 15px;
`;

const ChatLogoImage = styled.img`
    width: 250px;
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
`;

const ChatRoomBackIconwrap = styled.div`
    width: 50px;
    height: 50px;
    background-color: ${({ theme }) => theme["borderColor"]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        transition: all 0.3s;
        transform: scale(0.9);
    }
`

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
  100% { transform: translateX(0); }
`;

const ChatRoomBackIcon = styled(TiArrowBackOutline)`
    color: white;
    font-size: 36px;
    cursor: pointer;
`

const ChatProfileWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    gap: 20px;
    border-bottom: 2px solid ${({ theme }) => theme["borderColor"]};
    box-sizing: border-box;
    padding: 0px 25px 15px 25px;
`

const ChatProfileImgWrap = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`

const ChatProfileImg = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("../image/MainPageLogo.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`

const ChatProfiletitleWrap = styled.div`
    width: 88%;
    display: flex;
    justify-content: space-between;
`

const ChatProfiletitle = styled.h2`
    font-size: 26px;
    font-weight: 900;
`

const ChatHeartIcon = styled(BsSuitHeartFill)`
    color: ${({ theme }) => theme["borderColor"]};
    font-size: 36px;
    cursor: pointer;
    &:hover{
        transition: all 0.3s;
        animation: ${shakeAnimation} 0.6s;
    }
`

const ChatUnHeartIcon = styled(BsSuitHeart)`
    color: ${({ theme }) => theme["borderColor"]};
    font-size: 36px;
    cursor: pointer;
    &:hover{
        transition: all 0.3s;
        animation: ${shakeAnimation} 0.6s;
    }
`

const ChatContentWrap = styled.div`
    padding: 10px 25px;  
    height: 400px;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    margin-bottom: 10px;
`

const YourChatWrap = styled.div`
    display: flex;
    align-items: end;
    gap: 5px;
    margin-block: 15px;
`

const YourChat = styled.p`
    height: 40px;
    background-color: #dddddd;
    border-radius: 16px;
    text-align: center;
    line-height: 40px;
    font-weight: 900;
    font-size: 14px;
    padding-inline: 10px;
`

const MyChatWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: end;
    gap: 5px;
    margin-block: 15px;
`

const MyChat = styled.p`
    height: 40px;
    background-color: #00bffe;
    border-radius: 16px;
    text-align: center;
    line-height: 40px;
    font-weight: 900;
    font-size: 14px;
    padding-inline: 10px;
`

const WrittenTime = styled.span`
    font-size:12px;
    font-weight: 900;
    margin-bottom: 5px;
`

const ChatInput = styled.textarea`
    position: relative;
    width: 100%;
    height: 40px;
    background-color: #e49c9c;
    padding: 11px 35px 0 20px;
    letter-spacing: 2.5px;
    line-height: 20px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 900;
    resize: none;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    &::-webkit-scrollbar{
        display: none;
    }
`

const SendBtnWrap = styled.div`
    position: absolute;
    bottom: 22px;
    right: 25px;
    cursor: pointer;
    padding: 6px;
    box-sizing: border-box;
    border-radius: 50%;
    text-align: center;
    &:hover{
        transition: all 0.3s;
        animation: ${shakeAnimation} 0.6s;
    }
`

const SendBtn = styled(BiSend)`
    color: white;
    font-size: 24px;
`
export default ChattingPage;
