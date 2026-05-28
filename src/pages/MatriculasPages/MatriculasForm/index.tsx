import { Button } from "../../../components/Button";

export const MatriculasForm = () => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="matriculaAluno" className="form-label">
          Aluno
        </label>
        <select className="form-select" id="matriculaAluno">
          <option>Selecione um aluno</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="matriculaCurso" className="form-label">
          Curso
        </label>
        <select className="form-select" id="matriculaCurso">
          <option>Selecione um curso</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="matriculaData" className="form-label">
          Data de Matrícula
        </label>
        <input type="date" className="form-control" id="matriculaData" />
      </div>

      <div className="mb-3">
        <label htmlFor="matriculaStatus" className="form-label">
          Status
        </label>
        <select className="form-select" id="matriculaStatus">
          <option>Ativa</option>
          <option>Cancelada</option>
          <option>Concluída</option>
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
