import { Button } from "../../components/Button";
import { useState } from "react";

export const CursosPages = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 mb-3">
            <div className="card-body p-4 text-start">
              <h1 className="h4 mb-3">Cursos</h1>
              <p className="mb-3">No momento, não há nenhum curso cadastrado ainda.</p>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => setMostrarFormulario(true)}
              >
                Adicionar curso
              </button>
            </div>
          </div>

          {mostrarFormulario && (
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="mb-3 text-start">
                  <label htmlFor="titulo" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    placeholder="Digite o título do curso"
                  />
                </div>

                <div className="mb-3 text-start">
                  <label htmlFor="descricao" className="form-label">
                    Descrição
                  </label>
                  <textarea
                    className="form-control"
                    id="descricao"
                    rows={4}
                    placeholder="Digite a descrição do curso"
                  ></textarea>
                </div>

                <div className="mb-3 text-start">
                  <label htmlFor="cargaHoraria" className="form-label">
                    Carga horária
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cargaHoraria"
                    placeholder="Ex.: 10h"
                  />
                </div>

                <Button
                  type="button"
                  value="Salvar"
                  variant="primary"
                  onClick={() => undefined}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
