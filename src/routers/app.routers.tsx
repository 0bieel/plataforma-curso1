import { Route, Routes } from "react-router-dom"
import { HomePages } from "../pages/HomePages"
import { CursosPages } from "../pages/CursosPages"
import { TrilhasPages } from "../pages/TrilhasPages"
import { CategoriasPages } from "../pages/CategoriasPages"
import { AvaliacoesPages } from "../pages/AvaliacoesPages"
import { MatriculasPages } from "../pages/MatriculasPages"
import { FinanceiroPages } from "../pages/FinanceiroPages"
import { ProgressaoPages } from "../pages/ProgressaoPages"
import { AulaModulosPages } from "../pages/AulaModulosPages"
import { UsuarioPages } from "../pages/UsuarioPages"

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/cursos" element={<CursosPages />} />
            <Route path="/trilhas" element={<TrilhasPages />} />
            <Route path="/categorias" element={<CategoriasPages />} />
            <Route path="/avaliacoes" element={<AvaliacoesPages />} />
            <Route path="/matriculas" element={<MatriculasPages />} />
            <Route path="/financeiro" element={<FinanceiroPages />} />
            <Route path="/progressao" element={<ProgressaoPages />} />
            <Route path="/aula-modulos" element={<AulaModulosPages />} />
            <Route path="/usuario" element={<UsuarioPages />} />
        </Routes>
    </>
    )
}