import { async } from "q";
import axios from "./axiosToken";

//* 전체유저목록 조회
const usersInfo = async () => {
  return axios.get(`/api/users`)
    .then((response) => {
      // console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

//* 전체유저목록 조회 해결방법 2번째
// const usersInfo = async () => {
//   try{
//     const response = await axios.get(`/api/users`)
//     return response.data
//   }
//   catch(error) {
//     throw new error(error)
//   }
// }

//* 전체유저목록 조회 오류 덩어리
// const usersInfo = async () => {
//   await axios.get(`/api/users`)
//   .then((response) => {
//     console.log(response.data)
//     return response.data
//   })
//   .catch((error) => {
//     return error
//   })
// };


//* 하트를 눌렀을때 조회

const clickLike = async (id) => {
  try{
    const response = await axios.post(`/api/users/like/${id}`)
    return response.data
  }
  catch(error) {
    throw new error(error)
  }
}


//* 싫어요를 눌렀을때 조회

const clickdisLike = async (id) => {
  try{
    const response = await axios.post(`/api/users/dislike/${id}`)
    return response.data
  }
  catch(error) {
    throw new error(error)
  }
}



//* 좋아요유저목록  조회

const LikeUsers = async () => {
  try{
    const response = await axios.get(`api/users/like`)
    console.log(response)
    return response.data
  }
  catch(error) {
    throw new error(error)
  }
}

export { usersInfo, clickLike, clickdisLike, LikeUsers }