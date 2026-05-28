import { Button } from "../../../components/Button";

export const CategoriaForm = () => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="categoriaNome" className="form-label">
          Nome
        </label>
        <input
          type="text"
          className="form-control"
          id="categoriaNome"
          placeholder="Digite o nome da categoria"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="categoriaDescricao" className="form-label">
          Descrição
        </label>
        <textarea
          className="form-control"
          id="categoriaDescricao"
          rows={3}
          placeholder="Digite a descrição da categoria"
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
