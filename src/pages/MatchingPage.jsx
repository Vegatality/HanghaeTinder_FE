import React, { useEffect, useState } from "react";
import { FaHandshakeSlash } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { TbHeartHandshake } from "react-icons/tb";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Buttons from "../components/assets/Button";
import { usersInfo, clickLike, clickdisLike, LikeUsers } from "../api/match";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { interestOptions } from "../util/Selector";
import Loading from "../components/Loading";

function MatchingPage() {
    const [filter, setFilter] = useState(false);
    const queryClient = useQueryClient();

    //* 전체유저목록 조회

    const {data: userInfo,isLoading: userIsLoading,isError: userIsError,} = useQuery("getUserInfo", usersInfo, {
        enabled: filter === false,
        // enabled: !!filter,
        refetchOnWindowFocus: false,
        retry: true,
        // retryDelay: 1000,
    });

    //* 좋아요유저목록 조회
    const { data: FilterUser, isLoading: FilterIsLoading, isError: FilterIsError, error,} = useQuery("getFilterUserInfo", LikeUsers, {
        enabled: filter === true,
        // enabled: !filter,
        refetchOnWindowFocus: false,
        retry: true,
        // retryDelay: 1000,
    });

    const userFilter = () => {
        /* 필터모드를 바꾸는거 (전체 <-> 나를 좋아요) */
        queryClient.removeQueries();
        setFilter(!filter);

        /* 조건문 달자 */
    };
    // //* 전체유저목록 조회 Mutation
    // const userInfoMutation = useMutation(usersInfo, {
    //     onSuccess: () => {
    //         QueryClient.invalidateQueries("getUserInfo");
    //     },
    // });

    //* 싫어요 눌렀을 때 Mutation
    const userDislikeMutation = useMutation(clickdisLike, {
        onSuccess: () => {
            /* 전체유저 보기 모드 */
            if (!filter) {
                queryClient.invalidateQueries("getUserInfo");
                // 내가 어떤 행동을 하던간에 그 틈에 나를 좋아요를 누른 사람이 있을 수 있음.
            } else {
                queryClient.invalidateQueries("getFilterUserInfo");
            }
        },
    });

    //* 싫어요 눌렀을 때 Function
    const userDislikeHandler = (id) => {
        // event.preventDefault();
        userDislikeMutation.mutate(id);
    };

    // //* 좋아요 눌렀을 때 Mutation
    const likeMutation = useMutation(clickLike, {
        onSuccess: () => {
            /* 전체유저 보기 모드 */
            if (!filter) {
                queryClient.invalidateQueries("getUserInfo");
                /* 필터 모드 */
            } else {
                queryClient.invalidateQueries("getFilterUserInfo");
            }
        },
    });

    //* 좋아요 눌렀을 때 Function
    const userLikeHandler = (id) => {
        // event.preventDefault();
        likeMutation.mutate(id);
    };

    if (userIsLoading || FilterIsLoading) {
        console.log("로딩중");
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (userIsError || FilterIsError) {
        console.log(error);
        return (
            <div>
                <p>Loading failed...</p>
            </div>
        );
    }

    return (
        <>
            <MatchContentWrap>
                <MatchContentBox>
                    {!filter &&
                        userInfo?.data &&
                        userInfo?.data
                            ?.filter((item, idx) => idx === 0)
                            .map((e, i) => {
                                return (
                                    <div key={i}>
                                        <Link to={"/"}>
                                            <MatchLogoImage
                                                src="../image/MainPageLogo.svg"
                                                alt="photoThumb"
                                            />
                                        </Link>
                                        <InFoContainer>
                                            <Nickname>
                                                {e.nickname}
                                                <span>
                                                    ( {e.gender}, {e.age} )
                                                </span>
                                            </Nickname>

                                            <Link to={"/chatlist"}>
                                                <ChatListLinkIcon />
                                            </Link>

                                            <FilterBtn
                                                onClick={() => {
                                                    userFilter();
                                                }}
                                            >
                                                {!filter ? (
                                                    <FilterIcon />
                                                ) : (
                                                    <OnFilterIcon />
                                                )}
                                            </FilterBtn>
                                        </InFoContainer>
                                        <MatchMainItemBox>
                                            <MatchImg
                                                src={e.img}
                                                alt="photoThumb"
                                            />
                                            <FavoriteBox>
                                                <FavoriteTitle>
                                                    Favorite
                                                </FavoriteTitle>
                                                <FavoriteList>
                                                    {interestOptions
                                                        .filter((_, idx) =>
                                                            e.favorites.includes(
                                                                idx + 1
                                                            )
                                                        )
                                                        .map((ele, idx) => {
                                                            return (
                                                                <li key={idx}>
                                                                    {ele.value}
                                                                </li>
                                                            );
                                                        })}
                                                </FavoriteList>
                                            </FavoriteBox>

                                            <MatchBtnBox>
                                                <Buttons
                                                    size="medium"
                                                    bgColor="itemColor"
                                                    fontColor="black"
                                                    outline
                                                    onClick={() => {
                                                        userDislikeHandler(
                                                            e.id
                                                        );
                                                    }}
                                                >
                                                    <FaHandshakeSlash
                                                        color="white"
                                                        size={36}
                                                    />
                                                </Buttons>

                                                <Buttons
                                                    size="medium"
                                                    bgColor="itemColor"
                                                    fontColor="black"
                                                    outline
                                                    onClick={() => {
                                                        userLikeHandler(e.id);
                                                    }}
                                                >
                                                    <TbHeartHandshake
                                                        color="white"
                                                        size={40}
                                                    />
                                                </Buttons>
                                            </MatchBtnBox>
                                        </MatchMainItemBox>
                                    </div>
                                );
                            })}

                    {filter &&
                        FilterUser?.data &&
                        FilterUser?.data
                            ?.filter((item, idx) => idx === 0)
                            .map((e, i) => {
                                return (
                                    <div key={i}>
                                        <Link to={"/"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <MatchLogoImage
                                                src="../image/MainPageLogo.svg"
                                                alt="photoThumb"
                                            />
                                        </Link>
                                        <InFoContainer>
                                            <Nickname>
                                                {e.nickname}
                                                <span>
                                                    ( {e.gender}, {e.age} )
                                                </span>
                                            </Nickname>

                                            <Link to={"/chatlist"}>
                                                <ChatListLinkIcon />
                                            </Link>

                                            <FilterBtn
                                                onClick={() => {
                                                    userFilter();
                                                }}
                                            >
                                                {!filter ? (
                                                    <FilterIcon />
                                                ) : (
                                                    <OnFilterIcon />
                                                )}
                                            </FilterBtn>
                                        </InFoContainer>
                                        <MatchMainItemBox>
                                            <MatchImg
                                                src={e.img}
                                                alt="photoThumb"
                                            />
                                            <FavoriteBox>
                                                <FavoriteTitle>
                                                    Favorite
                                                </FavoriteTitle>
                                                <FavoriteList>
                                                    {interestOptions
                                                        .filter((_, idx) =>
                                                            e.favorites.includes(
                                                                idx + 1
                                                            )
                                                        )
                                                        .map((ele, idx) => {
                                                            return (
                                                                <li key={idx}>
                                                                    {ele.value}
                                                                </li>
                                                            );
                                                        })}
                                                </FavoriteList>
                                            </FavoriteBox>

                                            <MatchBtnBox>
                                                <Buttons
                                                    size="medium"
                                                    bgColor="itemColor"
                                                    fontColor="black"
                                                    outline
                                                    onClick={() => {
                                                        userDislikeHandler(
                                                            e.id
                                                        );
                                                    }}
                                                >
                                                    <FaHandshakeSlash
                                                        color="white"
                                                        size={36}
                                                    />
                                                </Buttons>

                                                <Buttons
                                                    size="medium"
                                                    bgColor="itemColor"
                                                    fontColor="black"
                                                    outline
                                                    onClick={() => {
                                                        userLikeHandler(e.id);
                                                    }}
                                                >
                                                    <TbHeartHandshake
                                                        color="white"
                                                        size={40}
                                                    />
                                                </Buttons>
                                            </MatchBtnBox>
                                        </MatchMainItemBox>
                                    </div>
                                );
                            })}
                </MatchContentBox>
            </MatchContentWrap>
        </>
    );
}

const MatchContentWrap = styled.div`
    position: relative;
    width: 100%;
    /* height: 100%; */
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
        rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const MatchContentBox = styled.div`
    padding: 25px 20px 20px 20px;
    padding-inline: 15px;
`;

const MatchLogoImage = styled.img`
    width: 250px;
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
`;

const InFoContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 5px;
    margin-top: 30px;
`;
const FilterBtn = styled.button`
    background-color: white;
`;

const Nickname = styled.p`
    font-size: 56px;
    font-weight: 400;
    padding: 20px;
    position: absolute;
    left: 15px;
    bottom: 225px;
    padding-block: 10px;
    text-align: center;
    box-sizing: border-box;
    color: ${({ theme }) => theme["borderColor"]};
    font-weight: 900;
    border-radius: 8px;
    span {
        font-size: 12px;
    }
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
  100% { transform: translateX(0); }
`;

const FilterIcon = styled(BsBookmarkHeart)`
    font-size: 36px;
    color: ${({ theme }) => theme["borderColor"]};
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        animation: ${shakeAnimation} 0.6s;
    }
`;

const OnFilterIcon = styled(BsBookmarkHeartFill)`
    font-size: 36px;
    color: ${({ theme }) => theme["borderColor"]};
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        animation: ${shakeAnimation} 0.6s;
    }
`;

const ChatListLinkIcon = styled(HiOutlineChatBubbleLeftRight)`
    font-size: 36px;
    color: ${({ theme }) => theme["borderColor"]};
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        animation: ${shakeAnimation} 0.6s;
    }
`;

const MatchMainItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const MatchImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    height: 400px;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const FavoriteBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    gap: 10px;
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
    padding-bottom: 15px;
    border-radius: 16px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

const FavoriteTitle = styled.h2`
    font-size: 20px;
    font-weight: 900;
    color: ${({ theme }) => theme["borderColor"]};
`;

const FavoriteList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    li {
        width: 200px;
        background-color: white;
        padding: 10px;
        border-radius: 4px;
        text-align: center;
        border: 2px solid ${({ theme }) => theme["borderColor"]};
        color: ${({ theme }) => theme["borderColor"]};
        letter-spacing: 2px;
        font-weight: 900;
    }
`;

const MatchBtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 24px;
`;

export default MatchingPage;
