import React, { useState } from "react";
import { styled } from "styled-components";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2"
import { FaHandshakeSlash } from "react-icons/fa"
import { TbHeartHandshake } from "react-icons/tb"
import Buttons from "../components/assets/Button";
function MatchingPage() {

    return <>
        <MatchContentWrap>
            <MatchContentBox>
                <MatchLogoImage src="../image/MainPageLogo.svg" alt="photoThumb" />
                <InFoContainer>
                    <Nickname>닉네임<span>(성별,나이)</span></Nickname>
                    <HiOutlineChatBubbleLeftRight
                        size={36}
                    />
                </InFoContainer>
                <MatchMainItemBox>
                    <MatchImg src="../image/backImage.webp" alt="photoThumb" />
                    <FavoriteBox>
                        <FavoriteTitle>관심사</FavoriteTitle>
                        <FavoriteList>
                            <li>운동</li>
                            <li>여행</li>
                            <li>음악감상</li>
                        </FavoriteList>
                    </FavoriteBox>

                    <MatchBtnBox>
                        <Buttons size="medium" bgColor="itemColor" fontColor='black'>
                            <FaHandshakeSlash color="white" size={36}/>
                        </Buttons>

                        <Buttons size="medium" bgColor="itemColor" fontColor='black'>
                            <TbHeartHandshake color="white" size={40}/>
                        </Buttons>
                    </MatchBtnBox>
                </MatchMainItemBox>
            </MatchContentBox>
        </MatchContentWrap>
    </>;
}

const MatchContentWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
`

const MatchContentBox = styled.div`
    padding: 20px;
    padding-inline: 15px;
`

const MatchLogoImage = styled.img`
    width: 250px;
    position: absolute;
    left: 50%;
    transform: translateX(-40%); 
`

const InFoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 80px;
`

const Nickname = styled.p`
    font-size: 24px;
    font-weight: 400;
    width: 300px;
    padding-block: 10px;
    text-align: center;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.1);
    span{
        font-size: 12px;
    }
`

const MatchMainItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

const MatchImg = styled.img`
    width: 100%;
    border-radius: 16px;
    box-shadow: 4px 4px 4px rgba(0, 0, 6, 0.3);
`

const FavoriteBox = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
    width: 100%;
    gap: 10px;
    margin-top: 20px;
    background-color: #eee;
    padding: 10px;
    box-sizing: border-box;
    padding-bottom: 15px;
    border-radius: 16px;
`

const FavoriteTitle = styled.h2`
    font-size: 20px;
    font-weight: 900;
`

const FavoriteList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    li {
        width: 200px;
        background-color: white;
        padding: 10px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 4px 4px 4px rgba(0, 0, 6, 0.2);
        letter-spacing: 2px;
        font-weight: 900;
    }
`

const MatchBtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 24px;
`
export default MatchingPage;
