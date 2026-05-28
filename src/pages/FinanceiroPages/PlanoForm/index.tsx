import { Button } from "../../../components/Button";

export const PlanoForm = () => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="planoNome" className="form-label">
          Nome
        </label>
        <input
          type="text"
          className="form-control"
          id="planoNome"
          placeholder="Digite o nome do plano"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="planoValor" className="form-label">
          Valor (R$)
        </label>
        <input
          type="number"
          className="form-control"
          id="planoValor"
          placeholder="0,00"
          step="0.01"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="planoDuracao" className="form-label">
          Duração (meses)
        </label>
        <input
          type="number"
          className="form-control"
          id="planoDuracao"
          placeholder="Digite a duração"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="planoDescricao" className="form-label">
          Descrição
        </label>
        <textarea
          className="form-control"
          id="planoDescricao"
          rows={3}
          placeholder="Descrição do plano"
        ></textarea>
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
