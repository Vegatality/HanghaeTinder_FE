import React from "react";
import { styled } from "styled-components";
import { AiFillBackward } from "react-icons/ai"
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2"
function MatchingPage() {
    return <>
            <MatchContentWrap>
                <MatchContentBox>
                    <MatchLogoImage src="../image/MainPageLogo.svg" alt="photoThumb" />
                    <InFoContainer>
                        <Nickname>닉네임<span>(성별,나이)</span></Nickname>
                        <HiOutlineChatBubbleLeftRight size={36} />
                    </InFoContainer>
                    <MatchMainItemBox>
                        <MatchImg src="../image/backImage.webp" alt="photoThumb"/>
                        <FavoriteBox>
                            <FavoriteTitle>관심사</FavoriteTitle>
                            <ul>
                                <li>운동</li>
                                <li>여행</li>
                                <li>음악감상</li>
                            </ul>
                        </FavoriteBox>
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
    padding-inline: 95px;
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
    margin-top: 100px;
`

const Nickname = styled.p`
    font-size: 36px;
    font-weight: 400;
    span{
        font-size: 12px;
    }
`

const MatchMainItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
` 

const MatchImg = styled.img`
    width: 600px;
`

const FavoriteBox = styled.div`
    
`

const FavoriteTitle = styled.h2`
`
export default MatchingPage;
