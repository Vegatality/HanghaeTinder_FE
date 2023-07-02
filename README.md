# 항해99 클론 프로젝트 13조 
FE: 조형민, 신희제
BE: 조우필, 김지승, 김현준, 김근보

![image](https://github.com/hangheTinder/.github/assets/40461588/8cb4fedc-da86-4fda-b008-26d57bba5a22)

## ⌚프로젝트 기간
23.05.12 ~ 23.05.18

## 프로젝트 소개
Tinder 클론 프로젝트

## Project Architecture 🛠
<img width="80%" src="https://github.com/hangheTinder/HanghaeTinder_FE/assets/123563774/043c0873-f536-4ba4-aff7-64f40138b0c3)"/>


## 사용한 기술 스택
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?logo=react&logoColor=white)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-FF0000?logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/-React%20Router-CA4245?logo=react-router&logoColor=white)
![SockJS](https://img.shields.io/badge/-SockJS-808080?logo=sockjs&logoColor=white)
![STOMP](https://img.shields.io/badge/-STOMP-D61617?logo=stomp&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/-Redux%20Toolkit-764ABC?logo=redux&logoColor=white)
![styled-components](https://img.shields.io/badge/-styled--components-DB7093?logo=styled-components&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens&logoColor=white)

## 주요 기능 및 서비스 이미지
<details>
<summary>회원가입 + 로그인</summary>
<br/>
<div align=center>
<img src="https://github.com/hangheTinder/HanghaeTinder_FE/assets/123563774/06c10470-7248-4d5b-b0c5-a1052b6a293b" width='800px'/>
<img src="https://github.com/Vegatality/tailwindExample/assets/123563774/dad6277d-f9e1-493e-b3c8-4693e1ebf212" width="800px" />
</div>
</details>
<details>
<summary>매칭 페이지</summary>
<br/>
<div align=center>
<img src="https://github.com/Vegatality/tailwindExample/assets/123563774/32450cb9-64b9-481e-9d67-ec1c7ad51eb9" width="800px" />
</div>
</details>
<details>
<summary>채팅 페이지(채팅목록 + 채팅방)</summary>
<br/>
<div align=center>
<img src="https://github.com/hangheTinder/HanghaeTinder_FE/assets/123563774/4a972e2a-b8a5-4550-839a-537cbad355ec" width="800px" />
</div>
</details>

## Trouble Shooting
**FRONTEND**
|채팅방에 진입했을 때 포커스가 맨 밑부터 시작하지 않고 맨 위에서부터 시작하는 문제|
|------|------|
|원인|채팅방에서 위로 스크롤 했을 때 scrollTop의 높이가 0이 되면 이전의 채팅 기록을 한 페이지 불러오도록 설계하였음. 그러나 진입하자마자 맨 위로 포커스가 맞춰져 있어서 이전 채팅 목록을 여러 번 불러오는 현상이 있었음|
|시도|useEffect 문 안에 ScrollTo를 이용하여 진입 시 맨 바닥으로 옮기려는 시도를 했으나, 여전히 이전 채팅 목록을 불러와서 실패.|
|해결|CSS의 justify-reverse 라는 속성을 통해서 포커스를 맨 밑부터 줄 수 있었습니다.|
