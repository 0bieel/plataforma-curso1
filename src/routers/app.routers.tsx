import { Route, Routes } from "react-router-dom"
import { HomePages } from "../pages/HomePages"
import { CursosPages } from "../pages/CursosPages"
import { TrilhasPages } from "../pages/TrilhasPages"


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/cursos" element={<CursosPages />} />
            <Route path="/trilhas" element={<TrilhasPages />} />
        </Routes>
    </>
    )
}