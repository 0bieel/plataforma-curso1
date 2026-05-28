import { Button } from "../../../components/Button";

export const PagamentoForm = () => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="pagamentoReferencia" className="form-label">
          Referência
        </label>
        <input
          type="text"
          className="form-control"
          id="pagamentoReferencia"
          placeholder="Ex: Janeiro/2024"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="pagamentoValor" className="form-label">
          Valor
        </label>
        <input
          type="number"
          className="form-control"
          id="pagamentoValor"
          placeholder="0,00"
          step="0.01"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="pagamentoData" className="form-label">
          Data de Vencimento
        </label>
        <input type="date" className="form-control" id="pagamentoData" />
      </div>

      <div className="mb-3">
        <label htmlFor="pagamentoStatus" className="form-label">
          Status
        </label>
        <select className="form-select" id="pagamentoStatus">
          <option>Pendente</option>
          <option>Pago</option>
          <option>Cancelado</option>
        </select>
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
