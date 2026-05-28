import { Button } from "../../../components/Button";

export const AvaliacoesForm = () => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="avaliacaoTitulo" className="form-label">
          Título
        </label>
        <input
          type="text"
          className="form-control"
          id="avaliacaoTitulo"
          placeholder="Digite o título da avaliação"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="avaliacaoDescricao" className="form-label">
          Descrição
        </label>
        <textarea
          className="form-control"
          id="avaliacaoDescricao"
          rows={3}
          placeholder="Digite a descrição"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="avaliacaoPeso" className="form-label">
          Peso (%)
        </label>
        <input
          type="number"
          className="form-control"
          id="avaliacaoPeso"
          placeholder="Digite o peso da avaliação"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="avaliacaoData" className="form-label">
          Data
        </label>
        <input type="date" className="form-control" id="avaliacaoData" />
      </div>

      <Button
        type="button"
        value="Salvar"
        variant="primary"
        onClick={() => undefined}
      />
    </div>
  );
};
