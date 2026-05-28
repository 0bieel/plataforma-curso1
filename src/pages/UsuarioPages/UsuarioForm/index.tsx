import { Button } from "../../../components/Button";

export const UsuarioForm = () => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="usuarioNome" className="form-label">
          Nome
        </label>
        <input
          type="text"
          className="form-control"
          id="usuarioNome"
          placeholder="Digite o nome completo"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="usuarioEmail" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="usuarioEmail"
          placeholder="Digite o email"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="usuarioSenha" className="form-label">
          Senha
        </label>
        <input
          type="password"
          className="form-control"
          id="usuarioSenha"
          placeholder="Digite a senha"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="usuarioTipo" className="form-label">
          Tipo de Usuário
        </label>
        <select className="form-select" id="usuarioTipo">
          <option>Aluno</option>
          <option>Professor</option>
          <option>Administrador</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="usuarioStatus" className="form-label">
          Status
        </label>
        <select className="form-select" id="usuarioStatus">
          <option>Ativo</option>
          <option>Inativo</option>
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
