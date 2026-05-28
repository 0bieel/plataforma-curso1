import { Button } from "../../../components/Button";

export const ProgressaoForm = () => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="progressaoAluno" className="form-label">
          Aluno
        </label>
        <select className="form-select" id="progressaoAluno">
          <option>Selecione um aluno</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="progressaoCurso" className="form-label">
          Curso
        </label>
        <select className="form-select" id="progressaoCurso">
          <option>Selecione um curso</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="progressaoPercentual" className="form-label">
          Percentual (%)
        </label>
        <input
          type="number"
          className="form-control"
          id="progressaoPercentual"
          placeholder="0-100"
          min="0"
          max="100"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="progressaoData" className="form-label">
          Data
        </label>
        <input type="date" className="form-control" id="progressaoData" />
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
