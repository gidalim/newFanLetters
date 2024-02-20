import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../page/Detail";
import Home from "../page/Home";


export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}