import { useState, type FormEvent } from "react";

export const AvaliacoesPages = () => {
  const [curso, setCurso] = useState("");
  const [nota, setNota] = useState("5");
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 mb-4">Avaliar o Curso</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="curso" className="form-label">
                    Curso
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="curso"
                    value={curso}
                    onChange={(event) => setCurso(event.target.value)}
                    placeholder="Digite o nome do curso"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="nota" className="form-label">
                    Nota do curso
                  </label>
                  <select
                    id="nota"
                    className="form-select"
                    value={nota}
                    onChange={(event) => setNota(event.target.value)}
                    required
                  >
                    <option value="5">5 - Excelente</option>
                    <option value="4">4 - Muito bom</option>
                    <option value="3">3 - Bom</option>
                    <option value="2">2 - Regular</option>
                    <option value="1">1 - Ruim</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="comentario" className="form-label">
                    Comentário
                  </label>
                  <textarea
                    id="comentario"
                    className="form-control"
                    rows={4}
                    value={comentario}
                    onChange={(event) => setComentario(event.target.value)}
                    placeholder="Escreva sua experiência com o curso"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Enviar avaliação
                </button>
              </form>

              {enviado && (
                <div className="alert alert-success mt-4" role="alert">
                  Avaliação enviada com sucesso! Obrigado por avaliar o curso.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
