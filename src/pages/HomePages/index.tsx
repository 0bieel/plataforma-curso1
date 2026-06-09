import { useEffect, useState } from "react";
import { aulasModulosService } from "../../services/aula-modulo.service";
import { avaliacoesService } from "../../services/avaliacao.service";
import { categoriasService } from "../../services/categoria.service";
import { cursosService } from "../../services/curso.service";
import { matriculasService } from "../../services/matricula.service";
import { planosService } from "../../services/plano.service";
import { progressosService } from "../../services/progresso.service";
import { trilhasService } from "../../services/trilha.service";
import { usuariosService } from "../../services/usuario.service";

export const HomePages = () => {
  const [counts, setCounts] = useState({
    cursos: 0,
    categorias: 0,
    aulasModulos: 0,
    usuarios: 0,
    matriculas: 0,
    progresso: 0,
    avaliacoes: 0,
    planos: 0,
    trilhas: 0,
  });

  useEffect(() => {
    const carregarIndicadores = async () => {
      setCounts({
        cursos: (await cursosService.findAll()).length,
        categorias: (await categoriasService.findAll()).length,
        aulasModulos: (await aulasModulosService.findAll()).length,
        usuarios: (await usuariosService.findAll()).length,
        matriculas: (await matriculasService.findAll()).length,
        progresso: (await progressosService.findAll()).length,
        avaliacoes: (await avaliacoesService.findAll()).length,
        planos: (await planosService.findAll()).length,
        trilhas: (await trilhasService.findAll()).length,
      });
    };

    carregarIndicadores();
  }, []);

  const indicadores = [
    { titulo: "Cursos", valor: counts.cursos },
    { titulo: "Categorias", valor: counts.categorias },
    { titulo: "Aulas e modulos", valor: counts.aulasModulos },
    { titulo: "Usuarios", valor: counts.usuarios },
    { titulo: "Matriculas", valor: counts.matriculas },
    { titulo: "Progresso", valor: counts.progresso },
    { titulo: "Avaliacoes", valor: counts.avaliacoes },
    { titulo: "Planos", valor: counts.planos },
    { titulo: "Trilhas", valor: counts.trilhas },
  ];

  return (
    <main className="container mt-4 mb-5">
      <div className="row m-4 border-bottom">
        <h4>Home</h4>
      </div>

      <div className="row g-3 m-4">
        {indicadores.map((item) => (
          <div key={item.titulo} className="col-12 col-md-4">
            <div className="card shadow h-100">
              <div className="card-body text-start">
                <p className="mb-1 fw-semibold">{item.titulo}</p>
                <h5 className="mb-0">{item.valor}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
