import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

function MyChatListPage() {
    return <>
        <ChatListContentWrap>
            <ChatListContentBox>
                <Link to={'/'}>
                    <ChatListLogoImage src="../image/MainPageLogo.svg" alt="photoThumb" />
                </Link>
                <ChatListTitle>Chats</ChatListTitle>
                <ChatList>
                    <Chats>
                        <ChatImg></ChatImg>
                        <ChatInpo>최신 메세지 or 페이버릿</ChatInpo>
                    </Chats>

                    <Chats>
                        <ChatImg></ChatImg>
                        <ChatInpo>최신 메세지 or 페이버릿</ChatInpo>
                    </Chats>

                    <Chats>
                        <ChatImg></ChatImg>
                        <ChatInpo>최신 메세지 or 페이버릿</ChatInpo>
                    </Chats>
                </ChatList>
            </ChatListContentBox>
        </ChatListContentWrap>
    </>;
}

const ChatListContentWrap = styled.div`
    position: relative;
    height: 100%;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`

const ChatListContentBox = styled.div`
    padding: 20px;
    padding-inline: 15px;
`

const ChatListLogoImage = styled.img`
    width: 250px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%); 
`

const ChatListTitle = styled.h2`
    margin-top: 100px;
    font-size: 18px;
    font-weight: 900;
    color: ${({ theme }) => theme['borderColor']};
    
`

const ChatList = styled.ul`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
`

const Chats = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    box-sizing: border-box;
    &:hover{
        transform: scale(1.02);
        transition: all 0.3s;
    }
`

const ChatImg = styled.div`
    width: 80px;
    height: 80px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    border-radius: 50%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../image/MainPageLogo.svg');
    cursor: pointer;
`

const ChatInpo = styled.p`
    width: 80%;
    font-size: 24px;
    text-align: end;
`
export default MyChatListPage;
