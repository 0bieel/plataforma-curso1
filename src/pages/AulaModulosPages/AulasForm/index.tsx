import { Button } from "../../../components/Button";

export const AulasForm = () => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="aulasTitulo" className="form-label">
          Título
        </label>
        <input
          type="text"
          className="form-control"
          id="aulasTitulo"
          placeholder="Digite o título da aula"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="aulasDescricao" className="form-label">
          Descrição
        </label>
        <textarea
          className="form-control"
          id="aulasDescricao"
          rows={4}
          placeholder="Digite a descrição da aula"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="aulasModulo" className="form-label">
          Módulo
        </label>
        <select className="form-select" id="aulasModulo">
          <option>Selecione um módulo</option>
        </select>
      </div>

      <Button
        type="button"
        value="Salvar Aula"
        variant="primary"
        onClick={() => undefined}
      />
    </div>
  );
};
