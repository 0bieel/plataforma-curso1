import { Route, Routes } from "react-router-dom";
import { AulasModulosPages } from "../pages/AulasModulosPages";
import { AvaliacoesPages } from "../pages/AvaliacoesPages";
import { CategoriasPages } from "../pages/CategoriasPages";
import { CursosPages } from "../pages/CursosPages";
import { FinanceiroPages } from "../pages/FinanceiroPages";
import { HomePages } from "../pages/HomePages";
import { MatriculasPages } from "../pages/MatriculasPages";
import { ProgressoPages } from "../pages/ProgressoPages";
import { TrilhasPages } from "../pages/TrilhasPages";
import { UsuariosPages } from "../pages/UsuariosPages";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePages />} />
    <Route path="/cursos" element={<CursosPages />} />
    <Route path="/categorias" element={<CategoriasPages />} />
    <Route path="/aulas-modulos" element={<AulasModulosPages />} />
    <Route path="/trilhas" element={<TrilhasPages />} />
    <Route path="/usuarios" element={<UsuariosPages />} />
    <Route path="/matriculas" element={<MatriculasPages />} />
    <Route path="/progresso" element={<ProgressoPages />} />
    <Route path="/avaliacoes" element={<AvaliacoesPages />} />
    <Route path="/financeiro" element={<FinanceiroPages />} />
  </Routes>
);
