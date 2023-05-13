import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import SignInPage from "../pages/SignInPage"
import SignUpPage from "../pages/SignUpPage"
import MatchingPage from "../pages/MatchingPage"
import MyChatListPage from "../pages/MyChatListPage"
import ChattingPage from '../pages/ChattingPage'

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainPage />}/>
            <Route path='/signin' element={<SignInPage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
            <Route path='/match' element={<MatchingPage />}/>
            <Route path='/chatlist' element={<MyChatListPage />}/>
            <Route path='/chatpage' element={<ChattingPage />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router