import { useEffect, useState } from "react";
import type { ITrilha } from "../../models/trilha.model";
import { getOptionLabel, getOptions, hydrateOptionCache } from "../../services/options.service";
import { trilhasService } from "../../services/trilha.service";

const trilhaInicial: ITrilha = { id: "", titulo: "", descricao: "", cursos: [] };

const normalize = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();

const getCursosDaTrilha = (trilha: ITrilha) => {
  const cursos = trilha.cursos ?? [];

  if (trilha.curso && !cursos.includes(trilha.curso)) {
    return [...cursos, trilha.curso];
  }

  return cursos;
};

const normalizarTrilhas = (trilhas: ITrilha[]) => {
  const trilhasPorNome = new Map<string, ITrilha>();

  trilhas.forEach((trilha) => {
    const chave = normalize(trilha.titulo);
    const cursos = getCursosDaTrilha(trilha);
    const trilhaExistente = trilhasPorNome.get(chave);

    if (!trilhaExistente) {
      trilhasPorNome.set(chave, { ...trilha, curso: "", cursos });
      return;
    }

    trilhasPorNome.set(chave, {
      ...trilhaExistente,
      descricao: trilhaExistente.descricao || trilha.descricao,
      cursos: Array.from(new Set([...getCursosDaTrilha(trilhaExistente), ...cursos])),
    });
  });

  return Array.from(trilhasPorNome.values());
};

export const TrilhasPages = () => {
  const [trilhas, setTrilhas] = useState<ITrilha[]>([]);
  const [formAberto, setFormAberto] = useState(false);
  const [novaTrilha, setNovaTrilha] = useState<ITrilha>(trilhaInicial);
  const [erroTitulo, setErroTitulo] = useState("");
  const [trilhaSelecionada, setTrilhaSelecionada] = useState<ITrilha | null>(null);
  const [cursoSelecionado, setCursoSelecionado] = useState("");

  const carregarTrilhas = async () => {
    await hydrateOptionCache();
    const trilhasSalvas = normalizarTrilhas(await trilhasService.findAll());
    setTrilhas(trilhasSalvas);
  };

  useEffect(() => {
    carregarTrilhas();
  }, []);

  const criarTrilha = async () => {
    const titulo = novaTrilha.titulo.trim();
    const trilhaDuplicada = trilhas.some((trilha) => normalize(trilha.titulo) === normalize(titulo));

    if (!titulo) {
      setErroTitulo("O titulo e obrigatorio");
      return;
    }

    if (trilhaDuplicada) {
      setErroTitulo("Ja existe uma trilha com este nome");
      return;
    }

    const trilhaCriada = await trilhasService.create({ ...novaTrilha, titulo, cursos: [] });
    setTrilhas([...trilhas, trilhaCriada]);
    setNovaTrilha(trilhaInicial);
    setErroTitulo("");
    setFormAberto(false);
  };

  const abrirModal = (trilha: ITrilha) => {
    setTrilhaSelecionada(trilha);
    setCursoSelecionado("");
  };

  const fecharModal = () => {
    setTrilhaSelecionada(null);
    setCursoSelecionado("");
  };

  const adicionarCurso = async () => {
    if (!trilhaSelecionada || !cursoSelecionado) {
      return;
    }

    const trilhasAtualizadas = trilhas.map((trilha) => {
      if (trilha.id !== trilhaSelecionada.id) {
        return trilha;
      }

      return {
        ...trilha,
        cursos: Array.from(new Set([...getCursosDaTrilha(trilha), cursoSelecionado])),
      };
    });
    const trilhaAtualizada = trilhasAtualizadas.find((trilha) => trilha.id === trilhaSelecionada.id) ?? null;

    if (trilhaAtualizada?.id) {
      await trilhasService.update(trilhaAtualizada.id, trilhaAtualizada);
    }

    setTrilhas(trilhasAtualizadas);
    setTrilhaSelecionada(trilhaAtualizada);
    setCursoSelecionado("");
  };

  const removerCurso = async (cursoId: string) => {
    if (!trilhaSelecionada) {
      return;
    }

    const trilhasAtualizadas = trilhas.map((trilha) => {
      if (trilha.id !== trilhaSelecionada.id) {
        return trilha;
      }

      return {
        ...trilha,
        curso: trilha.curso === cursoId ? "" : trilha.curso,
        cursos: getCursosDaTrilha(trilha).filter((curso) => curso !== cursoId),
      };
    });
    const trilhaAtualizada = trilhasAtualizadas.find((trilha) => trilha.id === trilhaSelecionada.id) ?? null;

    if (trilhaAtualizada?.id) {
      await trilhasService.update(trilhaAtualizada.id, trilhaAtualizada);
    }

    setTrilhas(trilhasAtualizadas);
    setTrilhaSelecionada(trilhaAtualizada);
  };

  const cursosOptions = getOptions("cursos", "titulo");
  const cursosDaTrilha = trilhaSelecionada ? getCursosDaTrilha(trilhaSelecionada) : [];
  const cursosDisponiveis = cursosOptions.filter((curso) => !cursosDaTrilha.includes(curso.value));

  return (
    <>
      <div className="row m-4 border-bottom">
        <div className="col-12 d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <h4 className="mb-2">Trilhas</h4>
          <button className="btn btn-primary mb-2" type="button" onClick={() => setFormAberto(true)}>
            Adicionar nova trilha
          </button>
        </div>
      </div>

      <div className="container m-4 text-start">
        {formAberto && (
          <div className="card shadow mb-4">
            <div className="card-body bg-light">
              <h5 className="card-title">Nova trilha</h5>
              <div className="mb-3">
                <label htmlFor="titulo-trilha" className="form-label">
                  Titulo
                </label>
                <input
                  id="titulo-trilha"
                  className={`form-control ${erroTitulo ? "is-invalid" : ""}`}
                  value={novaTrilha.titulo}
                  placeholder="Digite o titulo"
                  onChange={(event) => setNovaTrilha({ ...novaTrilha, titulo: event.target.value })}
                />
                {erroTitulo && <div className="invalid-feedback d-block">{erroTitulo}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="descricao-trilha" className="form-label">
                  Descricao
                </label>
                <textarea
                  id="descricao-trilha"
                  className="form-control"
                  rows={3}
                  value={novaTrilha.descricao}
                  onChange={(event) => setNovaTrilha({ ...novaTrilha, descricao: event.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" type="button" onClick={() => setFormAberto(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" type="button" onClick={criarTrilha}>
                Salvar
              </button>
            </div>
          </div>
        )}

        <div className="list-group">
          {trilhas.map((trilha) => (
            <button
              className="list-group-item list-group-item-action"
              type="button"
              key={trilha.id}
              onClick={() => abrirModal(trilha)}
            >
              <div className="d-flex justify-content-between gap-3">
                <strong>{trilha.titulo}</strong>
                <span>{getCursosDaTrilha(trilha).length} curso(s)</span>
              </div>
              {trilha.descricao && <small className="text-muted">{trilha.descricao}</small>}
            </button>
          ))}
        </div>
      </div>

      {trilhaSelecionada && (
        <>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{trilhaSelecionada.titulo}</h5>
                  <button className="btn-close" type="button" aria-label="Fechar" onClick={fecharModal}></button>
                </div>
                <div className="modal-body">
                  <h6>Cursos cadastrados</h6>
                  {cursosDaTrilha.length > 0 ? (
                    <ul className="list-group mb-4">
                      {cursosDaTrilha.map((cursoId) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center gap-3" key={cursoId}>
                          <span>{getOptionLabel("cursos", cursoId, "titulo")}</span>
                          <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => removerCurso(cursoId)}>
                            Excluir
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted mb-4">Nenhum curso cadastrado nesta trilha.</p>
                  )}

                  <div className="row g-2 align-items-end">
                    <div className="col-12 col-md-8">
                      <label htmlFor="curso-trilha" className="form-label">
                        Adicionar curso
                      </label>
                      <select
                        id="curso-trilha"
                        className="form-select"
                        value={cursoSelecionado}
                        onChange={(event) => setCursoSelecionado(event.target.value)}
                      >
                        <option value="">Selecione</option>
                        {cursosDisponiveis.map((curso) => (
                          <option value={curso.value} key={curso.value}>
                            {curso.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-4">
                      <button
                        className="btn btn-primary w-100"
                        type="button"
                        onClick={adicionarCurso}
                        disabled={!cursoSelecionado}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" onClick={fecharModal}>
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}
    </>
  );
};
