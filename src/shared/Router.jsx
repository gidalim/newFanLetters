import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MyPage from "../pages/MyPage/MyPage";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Detail from "../pages/Detail/Detail";
import { useSelector } from "react-redux";


export const Router = () => {

  const isLoggedin = useSelector(state => state.authSlice.isLoggedin)

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to='/' />} />
          </>)}
      </Routes>
    </BrowserRouter>
  )
}