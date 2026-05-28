export const ModulosTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Ordem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className="text-center text-muted">
              Nenhum módulo cadastrado
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
