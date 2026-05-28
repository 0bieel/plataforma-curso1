import { Button } from "../../../components/Button";

export const ModulosForm = () => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="modulosTitulo" className="form-label">
          Título
        </label>
        <input
          type="text"
          className="form-control"
          id="modulosTitulo"
          placeholder="Digite o título do módulo"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="modulosDescricao" className="form-label">
          Descrição
        </label>
        <textarea
          className="form-control"
          id="modulosDescricao"
          rows={4}
          placeholder="Digite a descrição do módulo"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="modulosOrdem" className="form-label">
          Ordem
        </label>
        <input
          type="number"
          className="form-control"
          id="modulosOrdem"
          placeholder="Digite a ordem do módulo"
        />
      </div>

      <Button
        type="button"
        value="Salvar Módulo"
        variant="primary"
        onClick={() => undefined}
      />
    </div>
  );
};
