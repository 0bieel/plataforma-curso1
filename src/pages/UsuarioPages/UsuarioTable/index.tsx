export const UsuarioTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6} className="text-center text-muted">
              Nenhum usuário cadastrado
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
